module.exports = (sequelize, DataTypes) => {
  const TagStatistic = sequelize.define('TagStatistic', {
    TagId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    totalAnswers: DataTypes.FLOAT,
    correctAnswers: DataTypes.FLOAT,
    averageTimeOfCorrectAnswers: DataTypes.FLOAT,
    averageTimeOfIncorrectAnswers: DataTypes.FLOAT,
    percentile95OfCorrect: DataTypes.FLOAT,
    percentile95OfIncorrect: DataTypes.FLOAT,
  }, {});
  // TagStatistic.associate = function(models) {
  //   // associations can be defined here
  // };
  return TagStatistic;
};
