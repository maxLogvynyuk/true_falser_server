import { Router } from 'express';

import QuestionController from '../controllers/QuestionController';

const questionsRouter = Router();

questionsRouter.route('/:id')
  .get(QuestionController.getLanguageQuestions);

export default questionsRouter;
