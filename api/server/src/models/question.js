module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    text: DataTypes.STRING,
    // highlightedText: DataTypes.STRING,
    LanguageId: DataTypes.NUMBER,
    result: DataTypes.BOOLEAN,
    tags: DataTypes.ARRAY(DataTypes.INTEGER),
  }, {});
  Question.associate = function createQuestionAssociation(models) {
    Question.belongsTo(models.Language, {foreignKey: 'LanguageId'});
    Question.hasMany(models.QuestionTag)
  };
  return Question;
};
