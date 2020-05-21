import parseInt from 'lodash/parseInt';
import map from 'lodash/map';
import split from 'lodash/split';

import Util from '../utils/Utils';
import QuestionService from '../services/QuestionService';

const util = new Util();

class QuestionController {

  static async getLanguageQuestions(request, response) {
    const { id } = request.params;
    const limit = process.env.QUESTIONS_LIMIT;
    const excludedQuestionsSplit = split(request.headers.excludedquestions, ',');
    const excludedQuestions = map(excludedQuestionsSplit, parseInt);

    console.info('excludedQuestions!!', excludedQuestions);

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(response);
    }

    try {
      const languageQuestions = await QuestionService.getLanguageQuestions(id, excludedQuestions, limit);
      if (!languageQuestions) {
        util.setError(404, `Cannot find questions of language with id ${id}`);
      } else {
        util.setSuccess(200, 'Found Questions', languageQuestions);
      }
      return util.send(response);
    } catch (error) {
      console.info('error!!!', error);
      util.setError(500, error);
      return util.send(response);
    }
  };

  static async createQuestion(request, response) {
    if (
      !request.body.text ||
      !request.body.highlightedText ||
      !request.body.LanguageId ||
      !request.body.result
    ) {
      util.setError(400, 'Please provide complete details');
      return util.send(response);
    }

    const newQuestion = request.body;

    try {
      const createdQuestion = await QuestionService.createQuestion(newQuestion);
      util.setSuccess(201, 'Question created!', createdQuestion);

      return util.send(response);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(response);
    }
  };

}

export default QuestionController;
