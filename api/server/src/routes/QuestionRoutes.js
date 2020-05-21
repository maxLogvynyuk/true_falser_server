import { Router } from 'express';

import QuestionController from '../controllers/QuestionController';

const questionRouter = Router();

questionRouter.route('/')
  .post(QuestionController.createQuestion);

questionRouter.route('/:id')
  .patch(QuestionController.updateQuestion);

export default questionRouter;
