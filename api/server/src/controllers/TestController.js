import isEmpty from 'lodash/isEmpty';
import sequelize from 'sequelize';

import Util from '../utils/Utils';
import TestService from '../services/TestService';

const util = new Util();

class TestController {

  static async createTest(request, response) {
    if (
      !request.body.UserId &&
      !request.body.LanguageId
    ) {
      util.setError(400, 'Please provide complete details');
      return util.send(response);
    }

    const newTest = {
      UserId: request.body.UserId,
      LanguageId: request.body.LanguageId,
      startTime: sequelize.literal('CURRENT_TIMESTAMP'),
    };

    try {
      const createdTest = await TestService.createTest(newTest);
      util.setSuccess(201, 'Test created!', createdTest);

      return util.send(response);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(response);
    }
  };

  static async updateTest(request, response) {
    const { id } = request.params;
    const alteredTest = request.body;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(response);
    }

    try {
      const updatedTest = await TestService.updateTest(id, alteredTest);
      console.info('updatedTest!!!', updatedTest);
      if (!isEmpty(updatedTest)) {
        util.setSuccess(200, 'Test updated!', updatedTest);
      } else {
        util.setError(404, `Test with ${id} cannot be found`);
      }
      return util.send(response);
    }
    catch (error) {
      util.setError(500, error);
      return util.send(response);
    }
  }

  static async getTestById(request, response) {
    const { id } = request.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(response);
    }

    try {
      const theTest = await TestService.getATest(id);
      if (!theTest) {
        util.setError(404, `Cannot find user with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Test', theTest);
      }
      return util.send(response);
    } catch (error) {
      util.setError(500, error);
      return util.send(response);
    }
  };

  static async getTestWithAnswersResult(request, response) {
    const { id } = request.params;
    try {
      const testWithAnswersResult = await TestService.getTestWithAnswersResult(id);
      if (testWithAnswersResult) {
        util.setSuccess(200, 'Test result', testWithAnswersResult);
      } else {
        util.setError(404, `Test result with id ${id} not found`);
      }
      return util.send(response);
    } catch (error) {
      console.info('getTestWithAnswersResult!!!', error);
      util.setError(500, error);
      return util.send(response);
    }
  }

}

export default TestController;
