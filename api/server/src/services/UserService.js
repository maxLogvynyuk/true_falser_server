import database from '../models';

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
      where: { login },
      include: [
        {
          model: database.UserLanguage,
          as: 'userLanguages',
          include: [
            {model: database.Language}
          ]
        }
      ],
    });
    if (theUser) {
      return theUser
    }
    return null;
  }

}

export default UserService;

