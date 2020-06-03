module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Answers',
      'answerTime',
      {
        type: Sequelize.INTEGER,
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
