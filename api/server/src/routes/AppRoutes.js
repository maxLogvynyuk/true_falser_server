import { Router } from 'express';

import userRouter from './UserRoutes';
import testRouter from './TestRoutes';
import languageRouter from './LanguageRoutes';
import questionRouter from './QuestionRoutes';
import questionsRouter from './QuestionsRoutes';
import answerRouter from './AnswerRoutes';
import statisticRouter from './StatisticRoutes';

const router = Router();

router.use('/user', userRouter);
router.use('/test', testRouter);
router.use('/language', languageRouter);
router.use('/question', questionRouter);
router.use('/questions', questionsRouter);
router.use('/answer', answerRouter);
router.use('/statistic', statisticRouter);

export default router;
