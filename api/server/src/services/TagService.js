import { QueryTypes } from 'sequelize';
import get from 'lodash/get';
import map from 'lodash/map';

import database from '../models';

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
      `SELECT COUNT(*) FROM public."Answers" WHERE '${id}' = ANY (tags)`,
      {
        type: QueryTypes.SELECT
      }
    );
    const correctAnswers = await database.sequelize.query(
      `SELECT COUNT(*) FROM public."Answers" WHERE '${id}' = ANY (tags) AND public."Answers"."answer" = public."Answers"."userAnswer"`,
      {
        type: QueryTypes.SELECT
      }
    );
    const tag = await database.Tag.findOne({
      where: {id: Number(id)}
    });
    console.info(
      'getRatioOfCorrectAnswer Tags!!',
      totalAnswers,
      correctAnswers
    );
    return {
      TagId: id,
      name: get(tag, 'name'),
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

}

export default TagService;
