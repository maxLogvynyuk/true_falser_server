import { Router } from 'express';

import TestController from '../controllers/TestController';

const testRouter = Router();

testRouter.route('/')
  .post(TestController.createTest);

testRouter.route('/:id')
  .get(TestController.getTestById)
  .patch(TestController.updateTest);

testRouter.route('/result/:id')
  .get(TestController.getTestWithAnswersResult);

export default testRouter;
