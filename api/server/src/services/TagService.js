import { QueryTypes } from 'sequelize';
import get from 'lodash/get';
import map from 'lodash/map';
// import _reduce from 'lodash/replace';
import isEmpty from 'lodash/isEmpty';

import database from '../models';

const reducer = (accumulator, currentValue) => accumulator + currentValue;

class TagService {
  static async getAllTagsId() {
    const allTagsId = database.Tag.findAll({
      attributes: {
        exclude: ["name", "createdAt", "updatedAt"]
      }
    });
    if (allTagsId) {
      return allTagsId
    }
    return null;
  }

  static async getRatioOfCorrectAnswerForTag(id) {
    const totalAnswers = await database.sequelize.query(
      `select count(*)  from public."Answers" as a left join public."Questions" as q on q.id = a."QuestionId"
       left join public."QuestionTags" as qt on qt."QuestionId" = q.id where qt."TagId" = ${id} and a."answer" = a."userAnswer"`,
      {
        type: QueryTypes.SELECT
      }
    );
    const correctAnswers = await database.sequelize.query(
      `select count(*)  from public."Answers" as a left join public."Questions" as q on q.id = a."QuestionId"
       left join public."QuestionTags" as qt on qt."QuestionId" = q.id where qt."TagId" = ${id} and a."answer" != a."userAnswer"`,
      {
        type: QueryTypes.SELECT
      }
    );
    return {
      totalAnswers: get(totalAnswers, '[0].count'),
      correctAnswers: get(correctAnswers, '[0].count'),
    };
  }

  static async getAllTagsCorrectAnswersStatistic() {
    const tagsId = await TagService.getAllTagsId();
    async function getTagsStatistic(tag) {
      const correctAnswerStatistic = await TagService.getRatioOfCorrectAnswerForTag(tag.id);
      return correctAnswerStatistic;
    }
    const allTagsStatistic = map(
      tagsId, async (tag) => getTagsStatistic(tag));
    return  Promise.all(allTagsStatistic);
  }

  static async getAverageTimeOfCorrectAnswerForTag(id) {
    const correctAnswers = await database.sequelize.query(
      `select a."answerTime" as "answerTime"  from public."Answers" as a left join public."Questions" as q on q.id = a."QuestionId"
       left join public."QuestionTags" as qt on qt."QuestionId" = q.id where qt."TagId" = ${id} and a."answer" = a."userAnswer"`,
      {
        type: QueryTypes.SELECT
      }
    );
    const averageTimeOfCorrectAnswersArray = map(correctAnswers, answer => {
      return Number(get(answer, 'answerTime'))
    });
    if (!isEmpty(averageTimeOfCorrectAnswersArray)) {
      const averageTimeOfCorrectAnswers = Math.round(
        // eslint-disable-next-line lodash/prefer-lodash-method
        averageTimeOfCorrectAnswersArray.reduce(reducer)
        / averageTimeOfCorrectAnswersArray.length
      );
      const tag = await database.Tag.findOne({
        where: {id: Number(id)}
      });
      return {
        TagId: id,
        name: get(tag, 'name'),
        averageTimeOfCorrectAnswers,
      };
    }
    return null;
  }

  static async getAllTagsAverageTimeOfCorrectAnswer() {
    const tagsId = await TagService.getAllTagsId();
    async function getTagAverageTimeStatistic(tag) {
      const correctAnswersAverageTime = await TagService.getAverageTimeOfCorrectAnswerForTag(tag.id);
      return correctAnswersAverageTime;
    }
    const allTagsStatisticCorrectAnswersAverageTime = map(
      tagsId, async (tag) => getTagAverageTimeStatistic(tag));
    return  Promise.all(allTagsStatisticCorrectAnswersAverageTime);
  }

  static async getNumberOfCorrectAnswersAverageTimesPercentilesForTag(id) {
    const tag = await database.Tag.findOne({
      where: {id: Number(id)}
    });
    const correctAnswerStatistic = await TagService.getRatioOfCorrectAnswerForTag(id);
    const percentile95OfCorrect = await database.sequelize.query(
      `select percentile_cont(0.95) within group (order by "answerTime" asc) as percentile_95
    from public."Answers" as a left join public."Questions" as q on q.id = a."QuestionId"
    left join public."QuestionTags" as qt on qt."QuestionId" = q.id where qt."TagId" = ${id} and a."answer" = a."userAnswer"`
    );
    const percentile95OfIncorrect = await database.sequelize.query(
      `select percentile_cont(0.95) within group (order by "answerTime" asc) as percentile_95
    from public."Answers" as a left join public."Questions" as q on q.id = a."QuestionId"
    left join public."QuestionTags" as qt on qt."QuestionId" = q.id where qt."TagId" = ${id} and a."answer" != a."userAnswer"`
    );
    const correctAnswers = await database.sequelize.query(
      `select a."answerTime" as "answerTime"  from public."Answers" as a left join public."Questions" as q on q.id = a."QuestionId"
       left join public."QuestionTags" as qt on qt."QuestionId" = q.id where qt."TagId" = ${id} and a."answer" = a."userAnswer"`,
      {
        type: QueryTypes.SELECT
      }
    );
    const averageTimeOfCorrectAnswersArray = map(correctAnswers, answer => {
      return Number(get(answer, 'answerTime'))
    });

    const incorrectAnswers = await database.sequelize.query(
      `select a."answerTime" as "answerTime"  from public."Answers" as a left join public."Questions" as q on q.id = a."QuestionId"
       left join public."QuestionTags" as qt on qt."QuestionId" = q.id where qt."TagId" = ${id} and a."answer" != a."userAnswer"`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const averageTimeOfIncorrectAnswersArray = map(incorrectAnswers, answer => {
      return Number(get(answer, 'answerTime'))
    });
    if(
      !isEmpty(averageTimeOfIncorrectAnswersArray)
      && !isEmpty(averageTimeOfCorrectAnswersArray)
    ) {
      const averageTimeOfCorrectAnswers =
        // eslint-disable-next-line lodash/prefer-lodash-method
        averageTimeOfCorrectAnswersArray.reduce(reducer)
        / averageTimeOfCorrectAnswersArray.length;
      const averageTimeOfIncorrectAnswers =
        // eslint-disable-next-line lodash/prefer-lodash-method
        averageTimeOfIncorrectAnswersArray.reduce(reducer)
        / averageTimeOfIncorrectAnswersArray.length;
      return {
        TagId: id,
        name: get(tag, 'name'),
        totalAnswers: Number(get(correctAnswerStatistic, 'totalAnswers')),
        correctAnswers: Number(get(correctAnswerStatistic, 'correctAnswers')),
        averageTimeOfCorrectAnswers,
        averageTimeOfIncorrectAnswers,
        percentile95OfCorrect: get(percentile95OfCorrect, '[0].[0].percentile_95'),
        percentile95OfIncorrect: get(percentile95OfIncorrect, '[0].[0].percentile_95'),
      };
    }
    return {
      TagId: id,
      name: get(tag, 'name'),
    };
  }

  static async getAllTagsNumberOfCorrectAnswersAverageTimesPercentilesStatistic() {
    const tagsId = await TagService.getAllTagsId();
    async function getTagAverageTimeStatistic(tag) {
      const numberOfCorrectAnswersAverageTimesPercentilesStatistic =
        await TagService.getNumberOfCorrectAnswersAverageTimesPercentilesForTag(tag.id);
      return numberOfCorrectAnswersAverageTimesPercentilesStatistic;
    }
    const allTagsStatistic = map(
      tagsId, async (tag) => getTagAverageTimeStatistic(tag));
    return  Promise.all(allTagsStatistic);
  }
}

export default TagService;
