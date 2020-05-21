import get from 'lodash/get';

import database from '../models';
import TestService from './TestService';

class AnswerService {

  static async getTestAnswers(id) {
    return database.Answer.findAll({
      where: {TestId: Number(id)}
    });
  }

  static async createAnswer(newAnswer) {
    const answerTest = await TestService.getATest(get(newAnswer, 'TestId'));
    console.info('Create answer!!!',
      (Date.parse(newAnswer.timeSpend) + Number(process.env.TEST_TIME)),
    (Date.parse(get(answerTest, 'startTime'))));
    if (
      (Date.parse(newAnswer.timeSpend) + Number(process.env.TEST_TIME)) >=
      Date.parse(get(answerTest, 'startTime'))
      // || Date.parse(newAnswer.timeSpend) < Date.parse(get(answerTest, 'startTime'))
    ) {
      return null
    }
    return database.Answer.create(newAnswer);
  }

}

export default AnswerService;

