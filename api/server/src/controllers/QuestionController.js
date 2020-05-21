import parseInt from 'lodash/parseInt';
import map from 'lodash/map';
import split from 'lodash/split';
import isBoolean from 'lodash/isBoolean';
import isEmpty from 'lodash/isEmpty';

import Util from '../utils/Utils';
import QuestionService from '../services/QuestionService';

const util = new Util();

class QuestionController {

  static async getLanguageQuestions(request, response) {
    const { id } = request.query;
    // const { excludedquestions } = request.query;
    const limit = process.env.QUESTIONS_LIMIT;
    const excludedQuestionsSplit = split(request.query.excludedquestions, ',');
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
    console.info('createQuestion!!!', request.body);
    if (
      !request.body.text ||
      !request.body.highlightedText ||
      !request.body.LanguageId ||
      !isBoolean(request.body.result)
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

  static async updateQuestion(request, response) {
    console.info('updateQuestion!!!', request.body);
    const { id } = request.params;
    if (
      !request.body.text ||
      !request.body.highlightedText ||
      !request.body.LanguageId ||
      !isBoolean(request.body.result)
    ) {
      util.setError(400, 'Please provide complete details');
      return util.send(response);
    }

    const updatedQuestion = request.body;

    try {
      const updatedQuestionData = await QuestionService.updateQuestion(updatedQuestion, id);
      if (!isEmpty(updatedQuestionData)) {
        util.setSuccess(201, 'Question updated!', updatedQuestionData)
      } else {
        util.setError(400, `Question with id ${id} not found!`);
      }
      return util.send(response);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(response);
    }
  };

}

export default QuestionController;
