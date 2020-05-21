import sequelize, { Op } from 'sequelize';
import get from 'lodash/get';
import map from 'lodash/map';

import database from '../models';

;

class LanguageService {

  static async getAllLanguages() {
    return database.Language.findAll();
  }

  static async getAllLanguagesId() {
    return database.Language.findAll({
      attributes: {
        exclude: ['name', 'createdAt', 'updatedAt']
      }
    });
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
      test: null,
      totalAnswers,
      correctAnswers,
    };
  }

  static async getAllLanguagesCorrectAnswersStatistic() {
    const languages = await LanguageService.getAllLanguagesId();
    async function getLanguageStatistic(language) {
      console.info('language!!!!!', language.id);
      const correctAnswerStatistic = await LanguageService.getRatioOfCorrectAnswerForLanguage(language.id);
      console.info('correctAnswerStatistic!!', correctAnswerStatistic);
      return correctAnswerStatistic;
    }
    const allLanguagesStatistic = map(
      languages, async (language) => getLanguageStatistic(language)
    );
    return  Promise.all(allLanguagesStatistic);
  }
}

export default LanguageService;

