import { Router } from 'express';

import StatisticController from '../controllers/StatisticController';

const statisticRouter = Router();

statisticRouter.route('/language/:id')
  .get(StatisticController.getLanguageCorrectAnswersStatistic);


export default statisticRouter;
