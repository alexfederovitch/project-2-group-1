var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });

  //////////////////////////////////////////////////////////////////////////
  // Create a new 'User'
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
        res.json({
          isworking: false
        });
        console.log("username already exists, pick another username");
      });
  });
};
