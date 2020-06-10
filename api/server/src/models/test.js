module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    UserId: DataTypes.INTEGER,
    startTime: DataTypes.STRING,
    LanguageId: DataTypes.INTEGER,
  }, {});
  Test.associate = function createTestAssociation(models) {
    Test.belongsTo(models.User, {foreignKey: 'UserId', as: 'userTests'} );
    Test.hasMany(models.Answer, { as: 'testAnswers' })
  };
  return Test;
};
