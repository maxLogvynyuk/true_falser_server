import { Router } from 'express';

import UserController from '../controllers/UserController';
import UserLanguageController from '../controllers/UserLanguageController';

const userRouter = Router();

userRouter.route('/signup')
  .post(UserController.createUser);

userRouter.route('/google')
  .get(UserController.sendAuthorizationGoogleUrl);

userRouter.route('/google/code')
  .get(UserController.authorizationWithGoogleCode);

userRouter.route('/facebook')
  .get(UserController.sendAuthorizationFacebookUrl);

userRouter.route('/facebook/code')
  .get(UserController.authorizationWithFacebookCode);

userRouter.route('/signin')
  .post(UserController.login);

userRouter.route('/tests/:id')
  .get(UserController.getUserTests);

userRouter.route('/languages')
  .post(UserLanguageController.addUserLanguages);

userRouter.route('/languages/:id')
  .get(UserLanguageController.getUserLanguagesByUserId);

userRouter.route('/languages-update')
  .patch(UserLanguageController.updateUserLanguages);

export default userRouter;
