module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    UserId: DataTypes.NUMBER,
    TestId: DataTypes.NUMBER,
    LanguageId: DataTypes.NUMBER,
    QuestionId: DataTypes.NUMBER,
    answer: DataTypes.BOOLEAN,
    userAnswer: DataTypes.BOOLEAN,
    timeSpend: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.INTEGER),
  }, {});
  Answer.associate = function createAnswerAssociation(models) {
    Answer.belongsTo(models.Test, {foreignKey: 'TestId'});
    Answer.belongsTo(models.User, {foreignKey: 'UserId'});
    Answer.belongsTo(models.Language, {foreignKey: 'LanguageId'});
    Answer.belongsTo(models.Question, {foreignKey: 'QuestionId'});
  };
  return Answer;
};
