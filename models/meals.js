module.exports = function(sequelize, DataTypes) {
  var meals = sequelize.define("meals", {
    day: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    mealName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100]
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
    },
    consumed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  meals.associate = function(models) {
    // We're saying that a Meals should belong to a User
    // A Post can't be created without an Author due to the foreign key constraint
    meals.belongsTo(models.Users, {
      foreignKey: {
        //allowNull: false
      }
    });
  };
  return meals;
};
