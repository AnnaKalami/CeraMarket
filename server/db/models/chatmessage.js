'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatMessage extends Model {
     static associate({Chat, User}) {
      this.belongsTo(Chat, {foreignKey: 'chat_id'});
      this.belongsTo(User, {foreignKey: 'user_id'})
    }
  }
  ChatMessage.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      }, 
onDelete: "cascade",
    },
    chat_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Chats',
        key: 'id',
      }, 
onDelete: "cascade",
    },
    message: {
      allowNull: false,
      type: DataTypes.TEXT
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
    modelName: 'ChatMessage',
  });
  return ChatMessage;
};