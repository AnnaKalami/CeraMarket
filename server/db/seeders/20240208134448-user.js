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
        isMaster: false,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vlad",
        email: "Vlad@mail.ru",
        img: "https://kartin.papik.pro/uploads/posts/2023-07/1689026346_kartin-papik-pro-p-kartinki-osennii-yezhik-dlya-detei-2.jpg",
        password: await bcrypt.hash("1", 10),
        isMaster: true,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Admin",
        email: "Admin@mail.ru",
        img: "https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/Artyom_Moscow/phpGfHwFZ.jpeg",
        password: await bcrypt.hash("1", 10),
        isMaster: false,
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Один Чебурек",
        email: "1",
        img: "https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/Artyom_Moscow/phpGfHwFZ.jpeg",
        password: await bcrypt.hash("1", 10),
        isMaster: false,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Два Мастер",
        email: "2",
        img: "https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/Artyom_Moscow/phpGfHwFZ.jpeg",
        password: await bcrypt.hash("2", 10),
        isMaster: true,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Три Админ",
        email: "3",
        img: "https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/Artyom_Moscow/phpGfHwFZ.jpeg",
        password: await bcrypt.hash("3", 10),
        isMaster: false,
        isAdmin: true,
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
