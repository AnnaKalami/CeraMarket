'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskAnswer extends Model {
    static associate({User, Task}) {
      this.belongsTo(User, {foreignKey: 'user_id'})
      this.belongsTo(Task, {foreignKey: 'task_id'})
    }
  }
  TaskAnswer.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    task_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Tasks',
        key: 'id',
      }, 
    onDelete: "cascade", 
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
    text: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.INTEGER
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
    modelName: 'TaskAnswer',
  });
  return TaskAnswer;
};