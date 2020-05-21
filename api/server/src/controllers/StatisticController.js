import Util from '../utils/Utils';
import LanguageService from '../services/LanguageService';

const util = new Util();

class StatisticController {

  static async getLanguageCorrectAnswersStatistic(request, response) {
    const { id } = request.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(response);
    }

    try {
      const correctAnswerStatistic = await LanguageService.getRatioOfCorrectAnswerForLanguage(id);
      if (!correctAnswerStatistic) {
        util.setError(404, `Cannot find answers with correctAnswer id ${id}`);
      } else {
        util.setSuccess(200, 'Found Statistics', correctAnswerStatistic);
      }
      return util.send(response);
    } catch (error) {
      util.setError(500, error);
      return util.send(response);
    }
  };

  static async getAllLanguageCorrectAnswersStatistic(request, response) {

    try {
      const allLanguagesStatistic = await LanguageService.getAllLanguagesCorrectAnswersStatistic();
      console.info('allLanguagesStatistic!!!', allLanguagesStatistic);
      if (!allLanguagesStatistic) {
        util.setError(404, `Cannot generate list of correct answer statistic`);
      } else {
        util.setSuccess(200, 'All languages statistics', allLanguagesStatistic);
      }
      return util.send(response);
    } catch (error) {
      util.setError(500, error);
      return util.send(response);
    }
  }

}

export default StatisticController;
