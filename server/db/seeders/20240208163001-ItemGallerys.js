'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'ItemGalleries',
      [
        { 
          item_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { 
          item_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { 
          item_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ItemGalleries', null, {});
  }
};
