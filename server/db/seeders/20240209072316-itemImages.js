'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'ItemImages',
      [
        { path: '/img/1.webp',
          itemGallery_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { path: '/img/2.webp',
          itemGallery_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { path: '/img/3.jpg',
          itemGallery_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { path: '/img/4.jpg',
          itemGallery_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { path: '/img/5.jpg',
          itemGallery_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ItemImages', null, {});
  }
};
