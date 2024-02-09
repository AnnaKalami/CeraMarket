"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TaskGallery extends Model {
    static associate({ Task, TaskImage }) {
      this.belongsTo(Task, { foreignKey: "task_id" });
      this.hasMany(TaskImage, { foreignKey: "taskGallery_id" });
    }
  }
  
  TaskGallery.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      task_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Tasks",
          key: "id",
        },
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
  
    },
    {
      sequelize,
      modelName: "TaskGallery",
    }

  );

  return TaskGallery;
};
