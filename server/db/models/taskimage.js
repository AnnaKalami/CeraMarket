'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskImage extends Model {
    static associate({TaskGallery}) {
      this.belongsTo(TaskGallery, {foreignKey: 'taskGallery_id'})
    }
  }
  TaskImage.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    taskGallery_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'TaskGalleries',
        key: 'id',
      }, 
      onDelete: "cascade", 
    },
    path: {
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
    modelName: 'TaskImage',
  });
  return TaskImage;
};