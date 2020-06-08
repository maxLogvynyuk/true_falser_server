import isNumber from 'lodash/isNumber';
import isEmpty from 'lodash/isEmpty';

import Utils from '../utils/Utils';
import UserLanguageService from '../services/UserLanguegesService';

const util = new Utils();

class UserLanguageController {
  static async addUserLanguages(request, response) {
    if (
      !isNumber(request.body.UserId)
      && isEmpty(request.body.userLanguages)
    ) {
      util.setError(400, 'Please provide complete details');
      util.send(response);
    }

    const userId = request.body.UserId;
    const userLanguagesArray = request.body.userLanguages;

    try {
      const userLanguages = await UserLanguageService.setUserLanguages(userId, userLanguagesArray);
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

  static async updateUserLanguages(request, response) {
    if (isEmpty(request.body.userLanguages)) {
      util.setError(404, 'Please provide complete details');
      return util.send(response);
    }

    const userLanguages = request.body.userLanguages;

    try {
      const updatedUserLanguagesData = await UserLanguageService.updateAllUserLanguages(userLanguages);
      if (updatedUserLanguagesData) {
        util.setSuccess(200, 'User languages updated successfully!', updatedUserLanguagesData);
      } else {
        util.setError(404, 'User languages not updated!');
      }

      return util.send(response);
    } catch (error) {
      util.setError(500, error);
      return util.send(response);
    }
  }

  static async getUserLanguagesByUserId(request, response) {
    const {id} = request.params;

    if (!id) {
      util.setError(400, 'Please put id to get user languages');
      return util.send(response);
    }

    try {
      const userLanguages = await UserLanguageService.getUserLanguages(id);
      if (!isEmpty(userLanguages)) {
        util.setSuccess(200, 'User languages found!', userLanguages);
      } else {
        util.setError(404, `User languages with id ${id} not found`)
      }

      return util.send(response);
    } catch (error) {
      util.setError(500, error);
      return util.send(response);
    }
  }
}

export default UserLanguageController;
