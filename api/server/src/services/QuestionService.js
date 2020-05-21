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

