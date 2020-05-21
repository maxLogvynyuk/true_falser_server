module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    name: DataTypes.STRING
  }, {});
  Language.associate = function createLanguageAccociation(models) {
    Language.hasMany(models.Question, {as: 'languageQuestions'});
    Language.hasMany(models.Answer, {as: 'languageAnswer'});
  };
  return Language;
};
