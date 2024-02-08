'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate({User, Item}) {
      this.belongsTo(User, {foreignKey: 'user_id'})
      this.belongsTo(Item, {foreignKey: 'item_id'})
    }
  }
  Like.init({
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
        key: 'id'
      },
      onDelete: 'cascade'
    },
    item_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Items',
        key: 'id',
      }, 
      onDelete: "cascade"
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
    modelName: 'Like',
  });
  return Like;
};