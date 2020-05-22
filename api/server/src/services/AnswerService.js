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
    console.info('Create answer spendTime and startTime!!!',
      new Date(),
      answerTest.startTime,
      (Date.parse(`${new Date()}`)),
      (Date.parse(get(answerTest, 'startTime'))),
      Number(process.env.TEST_TIME)
    );
    const spendTime = `${new Date()}`;
    if (
      (Date.parse(spendTime) >=
      Date.parse(get(answerTest, 'startTime')) + Number(process.env.TEST_TIME))
      // || Date.parse(newAnswer.timeSpend) < Date.parse(get(answerTest, 'startTime'))
    ) {
      return null
    }
    return database.Answer.create(newAnswer);
  }

}

export default AnswerService;

