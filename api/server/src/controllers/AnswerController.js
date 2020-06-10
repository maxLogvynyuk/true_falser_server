import isBoolean from 'lodash/isBoolean'

import Util from '../utils/Utils';
import AnswerService from '../services/AnswerService';

const util = new Util();

class AnswerController {

  static async createAnswer(request, response) {
    console.info('createAnswer1!!!!', request.body);
    if (
      !request.body.UserId ||
      !request.body.TestId ||
      !request.body.LanguageId ||
      !request.body.QuestionId ||
      !isBoolean(request.body.answer) ||
      !isBoolean(request.body.userAnswer)
    ) {
      util.setError(400, 'Please provide complete details');
      return util.send(response);
    }

    const answerTime = await AnswerService.getAnswerTime(request.body.TestId);

    const newAnswer = {
      UserId: request.body.UserId,
      TestId: request.body.TestId,
      LanguageId: request.body.LanguageId,
      QuestionId: request.body.QuestionId,
      answer: request.body.answer,
      userAnswer: request.body.userAnswer,
      // timeSpend: `${new Date()}`,
      // timeSpend:  sequelize.literal('CURRENT_TIMESTAMP'),
      answerTime: Number(answerTime),
      // timeSpend: "2020-05-19T16:11:22.858Z"
    };

    console.info('newAnswer!!!', newAnswer);

    try {
      const createdAnswer = await AnswerService.createAnswer(newAnswer);
      if (createdAnswer) {
        util.setSuccess(201, 'Answer created!', createdAnswer);
      } else {
        util.setError(404, 'Time is out!', createdAnswer);
      }

      return util.send(response);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(response);
    }
  };

  static async getTestAnswers(request, response) {
    const { id } = request.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(response);
    }

    try {
      const testAnswer = await AnswerService.getTestAnswers(id);
      if (!testAnswer) {
        util.setError(404, `Cannot find answers with test id ${id}`);
      } else {
        util.setSuccess(200, 'Found Answers', testAnswer);
      }
      return util.send(response);
    } catch (error) {
      util.setError(500, error);
      return util.send(response);
    }
  };

}

export default AnswerController;
