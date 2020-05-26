module.exports = (sequelize, DataTypes) => {
  const LanguagesAnswersStatistic = sequelize.define('LanguagesAnswersStatistic', {
    LanguageId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    totalAnswers: DataTypes.INTEGER,
    correctAnswers: DataTypes.INTEGER,
  }, {});
  // LanguagesAnswersStatistic.associate = function createLanguagesAnswersStatistic(models) {
  //   // associations can be defined here
  // };
  return LanguagesAnswersStatistic;
};
