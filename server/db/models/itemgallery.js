'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemGallery extends Model {
    static associate({Item,ItemImage}) {
      this.hasMany(ItemImage, {foreignKey: 'itemGallery_id'});
      this.belongsTo(Item, {foreignKey: 'item_id'})
    }
  }
  ItemGallery.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    item_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Items',
        key: 'id',
      }, 
    onDelete: "cascade",  
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
    modelName: 'ItemGallery',
  });
  return ItemGallery;
};