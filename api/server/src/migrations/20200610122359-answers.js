module.exports = {
  up: (queryInterface) => {
    return queryInterface.removeColumn(
      'Answers',
      'timeSpend',
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Answers',
      'timeSpend',
      {
        type: Sequelize.DATE,
      });
  }
};

