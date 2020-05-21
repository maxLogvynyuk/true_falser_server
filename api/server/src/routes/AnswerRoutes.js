import { Router } from 'express';

import AnswerController from '../controllers/AnswerController';

const answerRouter = Router();

answerRouter.route('/')
  .post(AnswerController.createAnswer);

answerRouter.route('/intest/:id')
  .get(AnswerController.getTestAnswers);


export default answerRouter;
