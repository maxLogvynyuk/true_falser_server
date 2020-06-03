import { QueryTypes } from 'sequelize';
import get from 'lodash/get';
import map from 'lodash/map';
// import _reduce from 'lodash/replace';
import isEmpty from 'lodash/isEmpty';

import database from '../models';

const reducer = (accumulator, currentValue) => accumulator + currentValue;

class TagService {
  static async getAllTagsId() {
    console.info('getAllTagsId!!!!');
    const allTagsId = database.Tag.findAll({
      attributes: {
        exclude: ["name", "createdAt", "updatedAt"]
      }
    });
    console.info('getAllTagsId222!!!!', allTagsId);
    if (allTagsId) {
      return allTagsId
    }
    return null;
  }

  static async getRatioOfCorrectAnswerForTag(id) {
    // const totalAnswers = await database.Answer.count({
    //   attributes: [
    //     sequelize.literal(
    //       `SELECT COUNT(*) FROM public."Answers" WHERE '${id}' = ANY (tags)`
    //     ),
    //   ]
    // });
    // const correctAnswers = await database.Answer.count({
    //   attributes: [
    //     sequelize.literal(
    //       `SELECT COUNT(*) FROM public."Answers" WHERE '${id}' = ANY (tags) AND public."Answers"."answer" = public."Answers"."userAnswer" `
    //     ),
    //   ]
    // });
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
    // const tag = await database.Tag.findOne({
    //   where: {id: Number(id)}
    // });
    console.info(
      'getRatioOfCorrectAnswer Tags!!',
      totalAnswers,
      correctAnswers
    );
    return {
      // TagId: id,
      // name: get(tag, 'name'),
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
    // const correctAnswers = await database.sequelize.query(
    //   `SELECT "answerTime" FROM public."Answers" WHERE '${id}' = ANY (tags) AND public."Answers"."answer" = public."Answers"."userAnswer"`,
    //   {
    //     type: QueryTypes.SELECT
    //   }
    // );
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
    // const averageTimeOfCorrectAnswers = _reduce(averageTimeOfCorrectAnswersArray, function(sum, n) {
    //   console.info('In reduce!!!S', sum, n);
    //   return Number(sum) + Number(n);
    //   }, 0);
    if (!isEmpty(averageTimeOfCorrectAnswersArray)) {
      const averageTimeOfCorrectAnswers = Math.round(
        // eslint-disable-next-line lodash/prefer-lodash-method
        averageTimeOfCorrectAnswersArray.reduce(reducer)
        / averageTimeOfCorrectAnswersArray.length
      );
      const tag = await database.Tag.findOne({
        where: {id: Number(id)}
      });
      console.info(
        'getAverageTimeOfCorrectAnswer Tags!!',
        // correctAnswers,
        averageTimeOfCorrectAnswersArray,
        averageTimeOfCorrectAnswers,
      );
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

  static async getAverageTimeOfCorrectAndIncorrectAnswerForTag(id) {
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
    // const averageTimeOfCurrentAnswers = _reduce(averageTimeOfCurrentAnswersArray, function(sum, n) {
    //   console.info('In reduce!!!S', sum, n);
    //   return Number(sum) + Number(n);
    //   }, 0);
    if(
      !isEmpty(averageTimeOfIncorrectAnswersArray)
      && !isEmpty(averageTimeOfCorrectAnswersArray)
    ) {
      const averageTimeOfCorrectAnswers = Math.round(
        // eslint-disable-next-line lodash/prefer-lodash-method
        averageTimeOfCorrectAnswersArray.reduce(reducer)
        / averageTimeOfCorrectAnswersArray.length
      );
      const averageTimeOfIncorrectAnswers = Math.round(
        // eslint-disable-next-line lodash/prefer-lodash-method
        averageTimeOfIncorrectAnswersArray.reduce(reducer)
        / averageTimeOfIncorrectAnswersArray.length
      );
      console.info(
        'getAverageTimeOfCorrectAnswer Tags!!',
        // correctAnswers,
        averageTimeOfIncorrectAnswersArray,
        averageTimeOfIncorrectAnswers,
        percentile95OfCorrect,
        percentile95OfIncorrect,
      );
      return {
        TagId: id,
        name: get(tag, 'name'),
        totalAnswers: get(correctAnswerStatistic, 'totalAnswers'),
        correctAnswers: get(correctAnswerStatistic, 'correctAnswers'),
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

  static async getAllTagsAverageTimeOfCorrectAndIncorrectAnswer() {
    const tagsId = await TagService.getAllTagsId();
    async function getTagAverageTimeStatistic(tag) {
      const correctAndIncorrectAnswersAverageTime = await TagService.getAverageTimeOfCorrectAndIncorrectAnswerForTag(tag.id);
      return correctAndIncorrectAnswersAverageTime;
    }
    const allTagsStatisticCorrectIncorrectAnswersAverageTime = map(
      tagsId, async (tag) => getTagAverageTimeStatistic(tag));
    return  Promise.all(allTagsStatisticCorrectIncorrectAnswersAverageTime);
  }
}

export default TagService;
