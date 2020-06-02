module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {});
  Tag.associate = function createTagAssociation(models) {
    Tag.hasMany(models.QuestionTag, {as: 'Tag'})
  };
  return Tag;
};
