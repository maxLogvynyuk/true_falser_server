import isNumber from 'lodash/isNumber';
import isEmpty from 'lodash/isEmpty';

import Utils from '../utils/Utils';
import UserLanguageService from '../services/UserLanguegesService';

const util = new Utils();

class UserLanguageController {
  static async addUserLanguages(request, response) {
    if (
      !isNumber(request.body.UserId)
      && isEmpty(request.body.UserLanguages)
    ) {
      util.setError(400, 'Please provide complete details');
      util.send(response);
    }

    const userId = request.body.UserId;
    const userLanguagesArray = request.body.userLanguages;

    try {
      const userLanguages = await UserLanguageService.setUserLanguages(userId, userLanguagesArray);
      // const userLanguages = await UserLanguageService.getUserLanguages(userId);
      console.info('userLanguages after adding', userLanguages);
      if (userLanguages) {
        util.setSuccess(200, 'User languages wrote down successfully!', userLanguages)
      } else {
        util.setError(404, 'User languages not wrote down!')
      }

      return util.send(response);
    } catch (error) {
      console.info('addUserLanguages!!!', error);
      util.setError(500, error);
      return util.send(response);
    }
  }
}

export default UserLanguageController;
