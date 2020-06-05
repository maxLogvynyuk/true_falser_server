module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TagStatistics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TagId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      totalAnswers: {
        type: Sequelize.FLOAT
      },
      correctAnswers: {
        type: Sequelize.FLOAT
      },
      averageTimeOfCorrectAnswers: {
        type: Sequelize.FLOAT
      },
      averageTimeOfIncorrectAnswers: {
        type: Sequelize.FLOAT
      },
      percentile95OfCorrect: {
        type: Sequelize.FLOAT
      },
      percentile95OfIncorrect: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('TagStatistics');
  }
};
