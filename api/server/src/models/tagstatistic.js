module.exports = (sequelize, DataTypes) => {
  const TagStatistic = sequelize.define('TagStatistic', {
    TagId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    totalAnswers: DataTypes.INTEGER,
    correctAnswers: DataTypes.INTEGER,
    averageTimeOfCorrectAnswers: DataTypes.INTEGER,
    averageTimeOfIncorrectAnswers: DataTypes.INTEGER,
    percentile95OfCorrect: DataTypes.FLOAT,
    percentile95OfIncorrect: DataTypes.FLOAT,
  }, {});
  // TagStatistic.associate = function(models) {
  //   // associations can be defined here
  // };
  return TagStatistic;
};
