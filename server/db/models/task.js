'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate({User, TaskAnswer, TaskGallery, TaskAtWork}) {
      this.belongsTo(User, {foreignKey: 'user_id'})
      this.hasMany(TaskAnswer, {foreignKey: 'task_id'})
      this.hasOne(TaskGallery, {foreignKey: 'task_id'})
      this.hasOne(TaskAtWork, {foreignKey: 'task_id'})
    }
  }
  Task.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
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
    atWork: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    finished: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    confirmFinished: {
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
    modelName: 'Task',
  });
  return Task;
};