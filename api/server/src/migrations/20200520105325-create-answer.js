module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      TestId: {
        type: Sequelize.INTEGER
      },
      LanguageId: {
        type: Sequelize.INTEGER
      },
      QuestionId: {
        type: Sequelize.INTEGER
      },
      answer: {
        type: Sequelize.BOOLEAN
      },
      userAnswer: {
        type: Sequelize.BOOLEAN
      },
      timeSpend: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Answers');
  }
};
