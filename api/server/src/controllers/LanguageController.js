import Util from '../utils/Utils';
import LanguageService from '../services/LanguageService';

const util = new Util();

class LanguageController {

  static async getAllLanguages(request, response) {
    try {
      const allLanguages = await LanguageService.getAllLanguages();
      if (allLanguages) {
        util.setSuccess(200, 'Languages list', allLanguages);
      } else {
        util.setError(404, 'Languages not found')
      }
      return util.send(response);
    } catch (error) {
      util.setError(500, error);
      return util.send(response);
    }
  }

  static async createLanguage(request, response) {
    if (!request.body.name) {
      util.setError(400, 'Please provide complete details');
      return util.send(response);
    }

    const newLanguage = request.body;

    try {
      const createdLanguage = await LanguageService.createLanguage(newLanguage);
      util.setSuccess(201, 'Language created!', createdLanguage);

      return util.send(response);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(response);
    }
  };

  static async getLanguageById(request, response) {
    const { id } = request.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(response);
    }

    try {
      const theLanguage = await LanguageService.getALanguage(id);
      if (!theLanguage) {
        util.setError(404, `Cannot find user with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Language', theLanguage);
      }
      return util.send(response);
    } catch (error) {
      util.setError(500, error);
      return util.send(response);
    }
  };

}

export default LanguageController;
