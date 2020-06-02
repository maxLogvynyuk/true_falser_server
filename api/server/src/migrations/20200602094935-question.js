module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Questions',
      'tags',
      {
        type: Sequelize.ARRAY({
          type: Sequelize.INTEGER
        }),
      }
    )
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(
      'Questions',
      'tags'
    );
  }
};
