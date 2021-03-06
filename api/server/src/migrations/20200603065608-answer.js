module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Answers',
      'answerTime',
      {
        type: Sequelize.FLOAT,
      }
    )
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(
      'Answers',
      'answerTime'
    );
  }
};
