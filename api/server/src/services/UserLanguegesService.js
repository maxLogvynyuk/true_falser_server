import map from 'lodash/map';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import database from '../models';

class UserLanguageService {
  static async createUserLanguage(data) {
    const newUserLanguage = await database.UserLanguage.create(data);
    if (!isEmpty(newUserLanguage)) {
      return database.UserLanguage.findOne({
        where: {id: Number(get(newUserLanguage, 'id'))},
        include: [
          {
            model: database.Language,
          }
        ],
      })
    }
    return null;
  }

  static async setUserLanguages(userId, userLanguagesArray) {
    const userLanguages = map(userLanguagesArray, async language => {
      const userLanguage = {
        UserId: Number(userId),
        LanguageId: Number(get(language, 'LanguageId')),
        myAssessment: Number(get(language, 'myAssessment', 'null')),
      };
      const newUserLanguage = await UserLanguageService.createUserLanguage(userLanguage);
      return newUserLanguage;
    });
    return Promise.all(userLanguages);
  }

  static async getUserLanguages(id) {
    const userLanguages = await database.UserLanguage.findAll({
      where: {UserId: Number(id)},
      include: [
        {
          model: database.Language,
        }
      ],
    });
    return userLanguages;
  }

  static async updateUserLanguage(updatedData, id) {
    return database.UserLanguage.update(updatedData, {where: {id: Number(id)}});
  }

  static async updateAllUserLanguages(userLanguagesArray) {
    const updatedUserLanguages = map(userLanguagesArray, async language => {
      const id = get(language, 'id');
      const userLanguageToUpdate = await database.UserLanguage.findOne({ where: { id: Number(id) } });
      if (!isEmpty(userLanguageToUpdate)) {
        const newDataFolLanguage = {
          myAssessment: get(language, 'myAssessment'),
        };
        const updatedUserLanguage = await UserLanguageService.updateUserLanguage(newDataFolLanguage, id);
        console.info('updatedUserLanguage', updatedUserLanguage);
        return language;
      }
      return null;
    });
    return Promise.all(updatedUserLanguages);
  }
}

export default UserLanguageService;
