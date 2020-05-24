import database from '../models';
// import TestService from './TestService';

class UserService {

  static async createUser(newUser) {
    return database.User.create(newUser);
  }

  static async getAUser(id) {
    const theUser = await database.User.findOne({
      where: { id: Number(id) }
    });

    return theUser;
  }

  static async getUserByLogin(login) {
    const theUser = await database.User.findOne({
      where: { login }
    });
    if (theUser) {
      return theUser
    }
    return null;
  }


  // static async getUserTests(id) {
  //   const userTests = await TestService.getAllTests(id);
  //   console.info('userTests!!!!', userTests);
  //   if (userTests) {
  //     return userTests;
  //   }
  //   return null;
  // }


}

export default UserService;

