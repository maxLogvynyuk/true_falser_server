import { Router } from 'express';

import LanguageController from '../controllers/LanguageController';

const languageRouter = Router();

languageRouter.route('/')
  .post(LanguageController.createLanguage);

languageRouter.route('/list')
  .get(LanguageController.getAllLanguages);


export default languageRouter;
