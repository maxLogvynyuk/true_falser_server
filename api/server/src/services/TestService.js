import sequelize, {Op} from 'sequelize';

import database from '../models';

class TestService {

  static async getAllTests(id) {
    return database.Test.findAll({
      where: {UserId: Number(id)}
    });
  }

  static async createTest(newTest) {
    return database.Test.create(newTest);
  }

  static async updateTest(id, updatedTest) {
    const testToUpdate = await database.Test.findOne({
      where: {id: Number(id)}
    });
    if (testToUpdate) {
      await database.Test.update(updatedTest, {where: {id: Number(id)}});
      return testToUpdate;
    }
    return null;
  }

  static async getATest(id) {
    const theTest = await database.Test.findOne({
      where: { id: Number(id) }
    });
    if (theTest) {
      return theTest;
    }
    return null;
  }

  static async getTestWithAnswersResult(id) {
    const testWithAnswers = await database.Test.findOne({
      where: { id: Number(id) },
      include: {
        model: database.Answer,
        as: 'testAnswers'
      }
    });
    const totalAnswersInTest = await database.Answer.count({
      where: { TestId: Number(id) }
    });
    const correctAnswersInTest = await database.Answer.count({
      where: {
        TestId: Number(id),
        userAnswer : {
          [Op.eq]: sequelize.col('answer')
        }
      }
    });

    return {
      totalAnswersInTest,
      correctAnswersInTest,
      testWithAnswers,
    };
  }

}

export default TestService;

