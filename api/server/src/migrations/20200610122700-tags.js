module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Tags',
      'description',
      {
        type: Sequelize.STRING,
      }
    )
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(
      'Tags',
      'description'
    );
  }
};
