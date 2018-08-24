var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  //load Home page
  app.get("/", function(req, res, next) {
    res.render("index");
  });
  //load Signup page
  app.get("/signup", function(req, res, next) {
    res.render("create-account", { layout: true });
  });
  //load Login page
  app.get("/login", function(req, res, next) {
    res.render("login", { layout: true });
  });
  // Load meal planner
  app.get("/user/meal", function(req, res) {
    db.meals
      .findAll({ order: [["mealOrder", "ASC"]] })
      .then(function(userMeals) {
        res.render("meal-planner", {
          msg: "Welcome!",
          meals: userMeals
        });
      });
  });

  //LOAD meal planner for specific day of the week
  app.get("user/meal/:day", function(req, res) {
    db.meals
      .findAll({ where: { day: req.params.day } })
      .then(function(userMeals) {
        res.render("meal-planner", {
          msg: "Welcome!",
          meals: userMeals
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(_req, res) {
    res.render("404");
  });
//////////////////////////////////////////////////////////////////////////////////
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.render("profile");
  });
};
