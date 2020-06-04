import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';

import Util from '../utils/Utils';
import LanguageService from '../services/LanguageService';
import StatisticService from '../services/StatisticService';
import TagService from '../services/TagService';
import TagStatisticService from '../services/TagStatisticService';

const util = new Util();

class StatisticController {

  static async getAllLanguagesCorrectAnswersStatistic(request, response) {
    try {
      const allLanguagesStatistic = await StatisticService.getLanguagesAnswersStatistic();
      if (!isEmpty(allLanguagesStatistic)) {
        util.setSuccess(200, 'All languages statistic', allLanguagesStatistic)
      } else {
        util.setError(404, 'All languages statistic not found')
      }

      return util.send(response);
    } catch (error) {
      util.setError(500, error);
      return util.send(response);
    }
  }

  static async generateLanguageCorrectAnswersStatistic(request, response) {
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

  static async generateAllLanguageCorrectAnswersStatistic(request, response) {

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

  static async getAllTagsCorrectAnswersStatistic(request, response) {
    try {
      const allTagsStatistic = await TagService.getAllTagsCorrectAnswersStatistic();
      if (!isEmpty(allTagsStatistic)) {
        util.setSuccess(200, 'All tags statistic', allTagsStatistic)
      } else {
        util.setError(404, 'All tags statistic not found')
      }

      return util.send(response);
    } catch (error) {
      console.info('Error in getAllTagsCorrectAnswersStatistic!!', error);
      util.setError(500, error);
      return util.send(response);
    }
  }

  static async getAllTagsAverageTimeOfCorrectAnswersStatistic(request, response) {
    try {
      const allTagsAverageTime = await TagService.getAllTagsAverageTimeOfCorrectAnswer();
      if (!allTagsAverageTime) {
        util.setError(
          404,
          `Tags statistic not found!`,
          );
      } else {
        util.setSuccess(
          200,
          "Average time of correct answers statistic of tag found!",
           allTagsAverageTime,
          );
      }
      return util.send(response);
    } catch (error) {
      console.info('getAllTagsAverageTimeOfCorrectAnswersStatistic!!!', error);
      util.setError(500, error);
      return util.send(response);
    }
  }

  static async generateAllTagsStatistic(request, response) {
    try {
      const allTagsStatistic =
        await TagService.getAllTagsNumberOfCorrectAnswersAverageTimesPercentilesStatistic();
      if (!allTagsStatistic) {
        util.setError(
          404,
          'Tags statistic not generated!',
        );
      } else {
        await TagStatisticService.clearTagsStatistic();
        forEach(allTagsStatistic, (item) => {
          TagStatisticService.writeDownTagStatistic(item)
        });
        util.setSuccess(
          200,
          "Tags statistic generated!",
          allTagsStatistic,
        );
      }
      return util.send(response);
    } catch (error) {
      util.setError(500, error);
      return util.send(response);
    }
  }

  static async getAllTagsStatistic(request, response) {
    try {
      const allTagsStatistic = await TagStatisticService.getAllTagsStatistic();
      if (!allTagsStatistic) {
        util.setError(
          404,
          `Tags statistic not found!`,
        );
      } else {
        util.setSuccess(
          200,
          "Tags statistic found!",
          allTagsStatistic,
        );
      }
      return util.send(response);
    } catch (error) {
      util.setError(500, error);
      return util.send(response);
    }
  }

}

export default StatisticController;
