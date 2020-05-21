import { Router } from 'express';

import UserController from '../controllers/UserController';

const userRouter = Router();

userRouter.route('/signup')
  .post(UserController.createUser);

userRouter.route('/signin')
  .post(UserController.login);

userRouter.route('/tests/:id')
  .get(UserController.getUserTests);

export default userRouter;
