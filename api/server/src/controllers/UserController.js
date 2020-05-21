import isEmpty from 'lodash/isEmpty';

import UserService from '../services/UserService';
import Util from '../utils/Utils';
import generatePasswordHash from '../utils/generetePasswordHash';
import decryptPasswordHash from '../utils/decryptPasswordHash';
import TestService from '../services/TestService';

const util = new Util();

class UserController {

  static async createUser(request, response) {
    console.info('Registration data', request.body, request.headers);
    if (
      !request.body.name ||
      !request.body.login ||
      !request.body.password
    ) {
      util.setError(400, 'Please provide complete details');
      return util.send(response);
    }

    const newUser = {
      login: request.body.login,
      name: request.body.name,
      password: await generatePasswordHash(request.body.password),
    };

    try {
      const createdUser = await UserService.createUser(newUser);
      util.setSuccess(201, 'User Added!', createdUser);

      return util.send(response);
    } catch (error) {
      util.setError(500, error.message);
      return util.send(response);
    }
  };

  static async login(request, response) {

    const postData = {
      login: request.body.login,
      password: request.body.password
    };

    try {
      const user = await UserService.getUserByLogin(postData.login);
      // console.info('Login user', user);
      if (!user) {
        return response.status(404).json({
          message: 'User not found'
        });
      }
      if (postData.password === decryptPasswordHash(user.password)) {
        // console.info('Compere password!!!', postData.password, decryptPasswordHash(user.password));
        util.setSuccess(200, 'Login success!', user);
        console.info('Login res on server success' );
        return  util.send(response);
      }
      util.setError(404, 'Incorrect password or email');
      return util.send(response);
    }
    catch (error) {
      util.setError(500, error);
      return util.send(response);
    }
  }

  static async getUserById(request, response) {
    const { id } = request.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(response);
    }

    try {
      const theUser = await UserService.getAUser(id);
      if (!theUser) {
        util.setError(404, `Cannot find user with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found User', theUser);
      }
      return util.send(response);
    } catch (error) {
      util.setError(500, error);
      return util.send(response);
    }
  };

  static async getUserTests(request, response) {
    const { id } = request.params;
    try {
      const userTests = await TestService.getAllTests(id);
      if (!isEmpty(userTests)) {
        util.setSuccess(200, 'User tests found!', userTests);
      } else {
        util.setError(404, `Tests of user with ${id} cannot be found`);
      }
      return util.send(response);
    }
    catch (error) {
      util.setError(500, error);
      return util.send(response);
    }
  }
}

export default UserController;
