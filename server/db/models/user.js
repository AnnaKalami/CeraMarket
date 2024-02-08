'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
        static associate({Like, Item, TaskAnswer, Task, ChatMessage, Chat}) {
          this.hasMany(Like, {foreignKey: 'user_id'}),
          this.hasMany(Item, {foreignKey: 'user_id'}),
          this.hasMany(TaskAnswer, {foreignKey: 'user_id'}),
          this.hasMany(Task, {foreignKey: 'user_id'}),
          this.hasMany(ChatMessage, {foreignKey: 'user_id'}),
          this.hasMany(Chat, {foreignKey: 'user_id'})
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.TEXT
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    img: {
      type: DataTypes.TEXT
    },
    isMaster: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};