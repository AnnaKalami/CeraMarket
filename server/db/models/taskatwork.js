'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskAtWork extends Model {
    static associate({User,Task}) {
      this.belongsTo(User, {foreignKey: 'user_id'})
      this.belongsTo(Task, {foreignKey: 'task_id'})
    }
  }
  TaskAtWork.init({
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
        model:'Users',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    task_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model:'Tasks',
        key: 'id'
      },
      onDelete: 'cascade'
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
    modelName: 'TaskAtWork',
  });
  return TaskAtWork;
};