import { Router } from 'express';

import StatisticController from '../controllers/StatisticController';

const statisticRouter = Router();

statisticRouter.route('/language/generate/:id')
  .get(StatisticController.generateLanguageCorrectAnswersStatistic);

statisticRouter.route('/languages/generate')
  .get(StatisticController.generateAllLanguageCorrectAnswersStatistic);

statisticRouter.route('/languages')
  .get(StatisticController.getAllLanguagesCorrectAnswersStatistic);

export default statisticRouter;
