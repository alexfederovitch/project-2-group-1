//Requiring 'bcrypt-nodejs'
const bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: [4, 30]
      }
    },
    pw1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 30]
      }
    },
    pw2: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 30]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 70]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30]
      }
    },
    currentWeight: {
      type: DataTypes.MEDIUMINT,
      allowNull: false,
      validate: {
        len: [2, 3]
      }
    },
    //this has to be a boolean value
    weightGoal: {
      type: DataTypes.MEDIUMINT,
      allowNull: true,
      validate: {
        len: [2, 3]
      }
    },
    caloricBudget: {
      type: DataTypes.MEDIUMINT,
      allowNull: true,
      validate: {
        len: [4, 6]
      }
    },
    carbsBudget: {
      type: DataTypes.MEDIUMINT,
      allowNull: true,
      validate: {
        len: [0, 8]
      }
    },
    fatsBudget: {
      type: DataTypes.MEDIUMINT,
      allowNull: true,
      validate: {
        len: [0, 8]
      }
    },
    proteingBudget: {
      type: DataTypes.MEDIUMINT,
      allowNull: true,
      validate: {
        len: [2, 8]
      }
    }
  });

  // Associating users with meals
  // When meals is deleted, also delete any associated meals
  Users.associate = function(models) {
    Users.hasMany(models.meals, {
      onDelete: "cascade"
    });
  };

  return Users;
};
