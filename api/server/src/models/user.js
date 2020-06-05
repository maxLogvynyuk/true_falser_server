module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});

  User.associate = function createUserAssociation(models) {
    User.hasMany(models.Test, {as: 'userTests'});
    User.hasMany(models.Answer, {as: 'userAnswer'});
    User.hasMany(models.UserLanguage, {as: 'userLanguages'});
  };
  return User;
};
