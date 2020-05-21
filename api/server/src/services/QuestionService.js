import sequelize, { Op } from 'sequelize';

import database from '../models';

class QuestionService {

  static async getLanguageQuestions(id, excludedQuestion, limit) {
    const languageQuestions = database.Question.findAll({
      where: {
        LanguageId: Number(id),
        [ Op.not ]:[
          {
            id: excludedQuestion
          }
        ]
      },
      order: sequelize.literal('random()'),
      limit
    });
    console.info('languageQuestions!!!', languageQuestions);
    return languageQuestions;
  }

  static async createQuestion(newQuestion) {
    return database.Question.create(newQuestion);
  }

}

export default QuestionService;

