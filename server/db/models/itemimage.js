'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemImage extends Model {
        static associate({ItemGallery}) {
        this.belongsTo(ItemGallery, {foreignKey: 'itemGallery_id'})
    }
  }
  ItemImage.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    path: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    itemGallery_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'ItemGalleries',
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
    modelName: 'ItemImage',
  });
  return ItemImage;
};