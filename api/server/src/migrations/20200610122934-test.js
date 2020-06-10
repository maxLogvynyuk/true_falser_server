module.exports = {
  up: (queryInterface) => {
    return queryInterface.removeColumn(
      'Tests',
      'averageTime',
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Tests',
      'averageTime',
      {
        type: Sequelize.FLOAT,
      });
  }
};
