module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    UserId: DataTypes.INTEGER,
    startTime: DataTypes.STRING,
    LanguageId: DataTypes.INTEGER,
    averageTime: DataTypes.NUMBER
  }, {});
  Test.associate = function createTestAssociation(models) {
    Test.belongsTo(models.User, {foreignKey: 'UserId', as: 'userTests'} )
  };
  return Test;
};
