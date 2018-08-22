var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(_req, res) {
    db.Users.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!"
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(_req, res) {
    res.render("404");
  });
};
