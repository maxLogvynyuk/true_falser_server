import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

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
    const spendTime = `${new Date()}`;
    if (
      (Date.parse(spendTime) >=
      Date.parse(get(answerTest, 'startTime')) + Number(process.env.TEST_TIME))
    ) {
      return null
    }
    return database.Answer.create(newAnswer);
  }

  static async getAnswerTime(id) {
    const previousAnswerInTest = await database.Answer.findAll({
      where: {TestId: Number(id)},
      order: [
        ['createdAt', 'DESC'],
      ],
      limit: 1
    });
    if (isEmpty(previousAnswerInTest)) {
      const answerTest = await TestService.getATest(id);
      const currentAnswerTime = Number(
        Date.now() - Date.parse(get(answerTest, 'startTime'))
      ) / 1000;
      return currentAnswerTime;
    }
    const previousAnswerTimeInSecond = Date.parse(
      get(previousAnswerInTest, '[0].createdAt')
    );
    const currentAnswerTimeValue = Number(
      Date.now() - previousAnswerTimeInSecond
    ) / 1000;
    return currentAnswerTimeValue;
  }

}

export default AnswerService;

