module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LanguagesAnswersStatistics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      LanguageId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      totalAnswers: {
        type: Sequelize.INTEGER
      },
      correctAnswers: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('LanguagesAnswersStatistics');
  }
};
