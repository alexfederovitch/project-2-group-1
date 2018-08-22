var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(_req, res) {
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
  app.post("/api/newUser",[check("email").isEmail()],function(req, res) {
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
      //check(newUser.email).isEmail()
      //console.log(newUser.email)

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("something went wrong")
        //console.log(req._validationErrors)
        const errVal = req._validationErrors[0].param
        //console.log(req._validationErrors[0].value)
        const errMsg = req._validationErrors[0].msg
        console.log(`Error: ${errVal} - ${errMsg}`)   
        
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
