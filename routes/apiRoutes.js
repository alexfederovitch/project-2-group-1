const db = require("../models");
// const request = require('request');
spoonMenu = require("../utils/spoonacular_menu.js");
spoonSearch = require("../utils/spoonacular_search.js");

const { check, validationResult } = require("express-validator/check");

module.exports = function(app) {
  // Get Meal Options from Spoontacular API
  app.get("/api/meals/options", function (req, res) {
    let body = req.query;
    const diet = [];
    const avoid = [];
    for (const n in body) {
      if (n.includes("diet")) {
        diet.push(body[n]);;
      } else {
        avoid.push(body[n]);;
      }
    }
    spoonMenu(diet.join(","), avoid.join(","), function(options) {
      res.render("meal-planner", { options });
    });;
  });

  //Get meal search from Spoontacular API
  app.get("/api/meals/search", function (req, res) {
    let query = [];
    console.log(req.query)
    for (const n in req.query) {
            query.push(req.query[n]);
      }
    spoonSearch(query.join(","), function (search) {
      res.render("meal-planner", { search });
    });;
  });

  // Get all examples
  app.get("/api/meals", function (_, res) {
    db.meals
      .findAll({ order: [["mealOrder", "ASC"]] })
      .then(function(userMeals) {
        res.json(userMeals);
      });
  });

  app.get("/api/meals/:day", function(req, res) {
    db.meals
      .findAll({ where: { day: req.params.day } })
      .then(function(userMeals) {
        res.json(userMeals);
      });
  });

  // Create a new example
  app.post("/api/meals", function(req, res) {
    db.meals.create(req.body).then(function(userMeals) {
      res.json(userMeals);
    });
  });

  // Delete an example by id
  app.delete("/api/meals/:id", function(req, res) {
    db.meals
      .destroy({ where: { id: req.params.id } })
      .then(function(userMeals) {
        res.json(userMeals);
      });
  });

  //////////////////////////////////////////////////////////////////////////
  // Create a new 'User'
  app.post("/api/newUser", [check("email").isEmail()], function(req, res) {
    var newUser = {
      username: req.body.username,
      pw1: req.body.password,
      pw2: req.body.password2,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      currentWeight: req.body.currentWeight,
      goal: req.body.goal
    };
    console.log(newUser);
    //console.log(res);
    //console.log("this happens in the app.post in the apiRouts.js");

    //validation checks
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("something went wrong");
      //console.log(req._validationErrors)
      const errVal = req._validationErrors[0].param;
      //console.log(req._validationErrors[0].value)
      const errMsg = req._validationErrors[0].msg;
      console.log(`Error: ${errVal} - ${errMsg}`);

      return res.status(422).json({ errors: errors.array() });
    }

    db.Users.create(newUser)
      .then(function(dbUsers) {
        console.log("works here");
        res.json({
          dbUsers: dbUsers,
          isworking: true
        });
      })
      .catch(function(err) {
        // handle error
        //res.json(err);
        //console.log(err)
        res.json({
          isworking: false
        });
      });
  });
};
