"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        name: "Tolya",
        email: "Tolya@mail.ru",
        img: "https://elbrus-api-uploads.storage.yandexcloud.net/image_160_1_99e61bd837.png",
        password: await bcrypt.hash("1", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vlad",
        email: "Vlad@mail.ru",
        img: "https://kartin.papik.pro/uploads/posts/2023-07/1689026346_kartin-papik-pro-p-kartinki-osennii-yezhik-dlya-detei-2.jpg",
        password: await bcrypt.hash("1", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Max",
        email: "Max@mail.ru",
        img: "https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/Artyom_Moscow/phpGfHwFZ.jpeg",
        password: await bcrypt.hash("1", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users");
  },
};
