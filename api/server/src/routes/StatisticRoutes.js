import { Router } from 'express';

import StatisticController from '../controllers/StatisticController';

const statisticRouter = Router();

statisticRouter.route('/language/generate/:id')
  .get(StatisticController.generateLanguageCorrectAnswersStatistic);

statisticRouter.route('/languages/generate')
  .get(StatisticController.generateAllLanguageCorrectAnswersStatistic);

statisticRouter.route('/languages')
  .get(StatisticController.getAllLanguagesCorrectAnswersStatistic);

statisticRouter.route('/tags')
  .get(StatisticController.getAllTagsCorrectAnswersStatistic);

statisticRouter.route('/tags/generate/average-true')
  .get(StatisticController.getAllTagsAverageTimeOfCorrectAnswersStatistic);

statisticRouter.route('/tags/generate/all')
  .get(StatisticController.getAllTagsAverageTimeOfCorrectIncorrectAnswersStatistic);

statisticRouter.route('/tags/all')
  .get(StatisticController.getAllTagsStatistic);

export default statisticRouter;
