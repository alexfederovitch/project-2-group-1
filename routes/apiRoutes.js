var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Get all examples
  app.get("/api/meals", function(req, res) {
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
  //
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });
  //////////////////// Create a new 'User'
  // app.post("/api/newUser", [check("email").isEmail()], function(req, res) {
  app.post("/api/newUser", function(req, res) {
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
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   console.log("something went wrong");
    //   //console.log(req._validationErrors)
    //   const errVal = req._validationErrors[0].param;
    //   //console.log(req._validationErrors[0].value)
    //   const errMsg = req._validationErrors[0].msg;
    //   console.log(`Error: ${errVal} - ${errMsg}`);

    //   return res.status(422).json({ errors: errors.array() });
    // }

    db.Users.create(newUser)
      .then(function(dbUsers) {
        console.log("works here");
        res.redirect(307, "/api/login");
        // res.json({
        //   dbUsers: dbUsers,
        //   isworking: true
        // });
      })
      .catch(function(err) {
        // handle error
        //res.json(err);
        //console.log(err)
        // res.json({
        //   isworking: false
        // });
        res.json(err);
      });
  });
};
