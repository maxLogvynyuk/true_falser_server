import { Router } from 'express';

import StatisticController from '../controllers/StatisticController';

const statisticRouter = Router();

statisticRouter.route('/language/:id')
  .get(StatisticController.getLanguageCorrectAnswersStatistic);

statisticRouter.route('/languages')
  .get(StatisticController.getAllLanguageCorrectAnswersStatistic);

export default statisticRouter;
