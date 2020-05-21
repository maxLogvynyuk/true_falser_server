import { Router } from 'express';

import QuestionController from '../controllers/QuestionController';

const questionRouter = Router();

questionRouter.route('/')
  .post(QuestionController.createQuestion);

export default questionRouter;
