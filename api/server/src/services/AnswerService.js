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

  static async getAnswerTime(id) {
    const previousAnswerInTest = await database.Answer.findAll({
      where: {TestId: Number(id)},
      order: [
        ['timeSpend', 'DESC'],
      ],
      limit: 1
    });
    console.info('currentAnswerTimeValue000!!!', previousAnswerInTest);
    if (isEmpty(previousAnswerInTest)) {
      const answerTest = await TestService.getATest(id);
      const currentAnswerTime = Number(
        Date.parse(`${new Date}`) - Date.parse(get(answerTest, 'startTime'))
      ) / 1000;
      console.info('currentAnswerTimeValue111', Date.parse(get(answerTest, 'startTime')));
      return currentAnswerTime;
    }
    const previousAnswerTimeInSecond = Date.parse(
      get(previousAnswerInTest, '[0].timeSpend')
    );
    const currentAnswerTimeValue = Number(
      Date.parse(`${new Date}`) - previousAnswerTimeInSecond
    ) / 1000;
    console.info(
      'currentAnswerTimeValue2222!!!',
      currentAnswerTimeValue,
      previousAnswerTimeInSecond,
      Date.parse(
        get(previousAnswerInTest, '[0].timeSpend')
      ),
      );
    return currentAnswerTimeValue;
  }

}

export default AnswerService;

