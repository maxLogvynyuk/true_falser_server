module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Answers',
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
      'Answers',
      'tags'
    );
  }
};
