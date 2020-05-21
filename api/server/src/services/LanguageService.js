import sequelize, { Op } from 'sequelize';
import get from 'lodash/get';

import database from '../models';

class LanguageService {

  static async getAllLanguages() {
    return database.Language.findAll();
  }

  static async createLanguage(newLanguage) {
    return database.Language.create(newLanguage);
  }

  static async getALanguage(id) {
    const theLanguage = await database.Language.findOne({
      where: { id: Number(id) }
    });

    if (theLanguage) {
      return theLanguage;
    }
    return null;
  }

  static async getRatioOfCorrectAnswerForLanguage(id) {
    const totalAnswers = await database.Answer.count({
      where: { LanguageId: Number(id) }
    });
    const correctAnswers = await database.Answer.count({
      where: {
        LanguageId: Number(id),
        [Op.and]: {answer: sequelize.col('userAnswer')}
      }
    });
    const language = await database.Language.findOne({
      where: {id: Number(id)}
    });
    console.info(
      'getRatioOfCorrectAnswer!!',
      totalAnswers,
      correctAnswers
    );
    return {
      id,
      name: get(language, 'name'),
      totalAnswers,
      correctAnswers,
    };
  }
}

export default LanguageService;

