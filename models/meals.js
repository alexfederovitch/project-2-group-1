module.exports = function(sequelize, DataTypes) {

  var meals = sequelize.define("meals", {
    day: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 10]
      }
    },
    mealName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 20]
      }
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fat: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    carbs: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    protein: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mealOrder: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return meals;
};