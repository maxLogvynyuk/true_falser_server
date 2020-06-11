import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import get from 'lodash/get';
import sequelize, { Op } from 'sequelize';

import database from '../models';

class QuestionService {

  static async getLanguageQuestions(id, excludedQuestion, limit, userLanguagesId) {
    if (Number(id) === Number(process.env.ALL_LANGUAGES_ID)) {
      const allLanguagesIdArray = await database.Language.findAll({
        attributes: {
          exclude: ["name", "createdAt", "updatedAt"]
        }
      });
      const allLanguagesId = map(allLanguagesIdArray, language => {
        return get(language, 'id');
      });
      const languagesIdArray = isEmpty(userLanguagesId) ? allLanguagesId : userLanguagesId;
      if (isEmpty(excludedQuestion)) {
        const languageQuestions = database.Question.findAll({
          where: {
            LanguageId: languagesIdArray,
          },
          order: sequelize.literal('random()'),
          include: [
            {
              model: database.Language,
            },
            {
              model: database.QuestionTag,
              include: {
                model: database.Tag,
              }
            }
          ],
          limit
        });
        return languageQuestions;
      }

      const languageQuestions = database.Question.findAll({
        where: {
          LanguageId: languagesIdArray,
          [ Op.not ]:[
            {
              id: excludedQuestion
            }
          ]
        },
        include: {
          model: database.Language,
        },
        order: sequelize.literal('random()'),
        limit
      });
      return languageQuestions;
    }
    if (isEmpty(excludedQuestion)) {
      const languageQuestions = database.Question.findAll({
        where: {
          LanguageId: Number(id),
        },
        include: {
          model: database.Language,
        },
        order: sequelize.literal('random()'),
        limit
      });
      return languageQuestions;
    }

    const languageQuestions = database.Question.findAll({
      where: {
        LanguageId: Number(id),
        [ Op.not ]:[
          {
            id: excludedQuestion
          }
        ]
      },
      include: {
        model: database.Language,
      },
      order: sequelize.literal('random()'),
      limit
    });
    return languageQuestions;
  }

  static async createQuestion(newQuestion) {
    const createdQuestion = await database.Question.create(newQuestion);
    return createdQuestion;
  }

  static async updateQuestion(updatedQuestion, id) {
    const questionToUpdate = await database.Question.findOne({
      where: {id: Number(id)}
    });
    if (questionToUpdate) {
      await database.Question.update(updatedQuestion, {
        where: {id: Number(id)}
      });
      return updatedQuestion;
    }
    return null;
  }

}

export default QuestionService;

