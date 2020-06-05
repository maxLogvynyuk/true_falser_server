module.exports = (sequelize, DataTypes) => {
  const UserLanguage = sequelize.define('UserLanguage', {
    UserId: DataTypes.INTEGER,
    LanguageId: DataTypes.INTEGER,
    myAssessment:DataTypes.FLOAT,
  }, {});
  UserLanguage.associate = function createUserLanguageAssociation(models) {
    UserLanguage.belongsTo(models.User, {foreignKey: 'UserId'});
    UserLanguage.belongsTo(models.Language, {foreignKey: 'LanguageId'})
  };
  return UserLanguage;
};
