module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    currentWeight: DataTypes.TINYINT,
    weightGoal: DataTypes.TINYINT,
    caloricBudget: DataTypes.TINYINT,
    carbsBudget: DataTypes.TINYINT,
    fatsBudget: DataTypes.TINYINT,
    proteingBudget: DataTypes.TINYINT
  });
  return Users;
};
