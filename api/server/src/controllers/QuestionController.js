import parseInt from 'lodash/parseInt';
import map from 'lodash/map';
import split from 'lodash/split';
import isBoolean from 'lodash/isBoolean';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import queryString from 'query-string';

import Util from '../utils/Utils';
import QuestionService from '../services/QuestionService';
import QuestionTagService from '../services/QuestionsTagService';

const util = new Util();

class QuestionController {

  static async getLanguageQuestions(request, response) {
    const { id } = request.query;
    const { excludedquestions } = request.query || 0;
    const { userlanguages } = request.query;
    const limit = process.env.QUESTIONS_LIMIT;
    const excludedQuestionsSplit = !excludedquestions
      ? null
      :split(excludedquestions, ',');
    const excludedQuestions = isEmpty(excludedQuestionsSplit)
      ? null
      : map(excludedQuestionsSplit, parseInt);
    const userLanguagesId = !userlanguages
        ? null
        : map(
           get(
             queryString.parse(
               `userLanguages=${userlanguages}`,
                {arrayFormat: 'comma'}
                ),
        'userLanguages',
           ),
        parseInt);

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(response);
    }

    try {
      const languageQuestions =
        await QuestionService.getLanguageQuestions(
          id,
          excludedQuestions,
          limit,
          userLanguagesId,
          );
      if (!languageQuestions) {
        util.setError(404, `Cannot find questions of language with id ${id}`);
      } else {
        util.setSuccess(200, 'Found Questions', languageQuestions);
      }
      return util.send(response);
    } catch (error) {
      util.setError(500, error);
      return util.send(response);
    }
  };

  static async createQuestion(request, response) {
    if (
      !request.body.text ||
      !request.body.LanguageId ||
      !isBoolean(request.body.result)
    ) {
      util.setError(400, 'Please provide complete details');
      return util.send(response);
    }

    const newQuestion = request.body;
    const newQuestionTags = request.body.tags;
    try {
      const createdQuestion = await QuestionService.createQuestion(newQuestion);
      if (newQuestion) {
        const newQuestionId = get(createdQuestion, 'id');
        const newQuestionTagsData = await QuestionTagService.createQuestionTags(
          newQuestionId,
          newQuestionTags,
        );
        if (newQuestionTagsData) {
          util.setSuccess(
            201,
            'Question created!',
            {
              createdQuestion,
              newQuestionTagsData,
            });

          return util.send(response);
        }
      }
      util.setError(404, 'Question not created!');
      return util.send(response);

    } catch (error) {
      util.setError(500, error.message);
      return util.send(response);
    }
  };

  static async updateQuestion(request, response) {
    const { id } = request.params;
    if (
      !request.body.text &&
      !request.body.highlightedText &&
      !request.body.LanguageId &&
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
