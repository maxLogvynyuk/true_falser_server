module.exports = (sequelize, DataTypes) => {
  const QuestionTag = sequelize.define('QuestionTag', {
    QuestionId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {});
  QuestionTag.associate = function createQuetionTagAssociation(models) {
    QuestionTag.belongsTo(models.Question, {foreignKey: 'QuestionId'});
    QuestionTag.belongsTo(models.Tag, {foreignKey: 'TagId'})
  };
  return QuestionTag;
};
