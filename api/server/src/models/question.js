module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    text: DataTypes.STRING,
    highlightedText: DataTypes.STRING,
    LanguageId: DataTypes.NUMBER,
    result: DataTypes.BOOLEAN
  }, {});
  Question.associate = function createQuestionAssociation(models) {
    Question.belongsTo(models.Language, {foreignKey: 'LanguageId'})
  };
  return Question;
};
