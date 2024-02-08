'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Items',
      [
        { 
          description: 'Описание 1',
          price: 5100,
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { 
          description: 'Описание 2',
          price: 500,
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { 
          description: 'Описание 3',
          price: 50220,
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  }
};
