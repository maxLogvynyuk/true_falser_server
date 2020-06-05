// import forEach from 'lodash/forEach';
import map from 'lodash/map';
import get from 'lodash/get';

import database from '../models';

class UserLanguageService {
  static async createUserLanguage(data) {
    return database.UserLanguage.create(data);
  }

  static async setUserLanguages(userId, userLanguagesArray) {
    console.info('setUserLanguages!!!!', userId, userLanguagesArray);
    // forEach(userLanguagesArray, async languageId => {
    //   const userLanguage = {
    //     UserId: Number(userId),
    //     LanguageId: Number(languageId)
    //   };
    //   await UserLanguageService.createUserLanguage(userLanguage);
    //   // console.info('newUserLanguage!!!', newUserLanguage);
    // });
    const userLanguages = map(userLanguagesArray, async language => {
      const userLanguage = {
        UserId: Number(userId),
        LanguageId: Number(get(language, 'LanguageId')),
        myAssessment: Number(get(language, 'myAssessment', 'null')),
      };
      const newUserLanguage = await UserLanguageService.createUserLanguage(userLanguage);
      console.info('newUserLanguage!!!', newUserLanguage);
      return newUserLanguage;
    });
    return Promise.all(userLanguages);
  }

  static async getUserLanguages(id) {
    const userLanguages = await database.UserLanguage.findAll({
      where: {UserId: Number(id)}
    });
    return userLanguages;
  }
}

export default UserLanguageService;
