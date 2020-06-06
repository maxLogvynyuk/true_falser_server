module.exports = {
  up: (queryInterface) => {
    return queryInterface.removeColumn(
      'Questions',
      'highlightedText',
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Questions',
      'highlightedText',
      {
         type: Sequelize.STRING,
    });
  }
};
