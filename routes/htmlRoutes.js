const db = require("../models");

module.exports = function(app) {
  //load Home page
  app.get("/", function(req, res, next) {
    res.render("index");
  });
  //load Signup page
  app.get("/signup", function(req, res, next) {
    res.render("create-account");
  });
  //load Login page
  app.get("/login", function(req, res, next) {
    res.render("login");
  });
  /////////////////////////////////////
  //load Login page
  app.get("/members/:id", function(req, res, next) {
    res.render("profile");
  });
  ////////////////////////////////////

  //LOAD meal planner for specific day of the week
  app.get("/user/meal/:day", function(req, res) {
    db.meals
      .findAll({
        where: { day: req.params.day },
        order: [["mealOrder", "ASC"]]
      })
      .then(function(userMeals) {
        res.render("meal-planner", {
          msg: "Welcome!",
          meals: userMeals
        });
      });
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

  //LOAD profile page
  app.get("/profile", function(req, res, next) {
    //Querying the Users table
    db.Users.findAll({
      where: { id: 1 }
    }).then(function(users) {
      console.log(users);
      //Querying the meals table
      db.meals.findAll({}).then(function(meals) {
        console.log(meals);
        //Querying calorie data
        db.meals.sum("calories", { where: { consumed: true } }).then(sum => {
          let caloricBudget = users[0].caloricBudget;
          let caloriesEaten = sum;
          let calPercent = Math.floor((caloriesEaten / caloricBudget) * 100);
          calPercent = calPercent.toString() + "%";
          //Querying fat data
          db.meals.sum("fat", { where: { consumed: true } }).then(sum => {
            let fatsBudget = users[0].fatsBudget;
            let fatEaten = sum;
            let fatPercent = Math.floor((fatEaten / fatsBudget) * 100);
            fatPercent = fatPercent.toString() + "%";
            //Querying carb data
            db.meals
              .sum("carbs", {
                where: { consumed: true }
              })
              .then(sum => {
                let carbsBudget = users[0].carbsBudget;
                let carbsEaten = sum;
                let carbPercent = Math.floor((carbsEaten / carbsBudget) * 100);
                carbPercent = carbPercent.toString() + "%";
                //Querying protein data
                db.meals
                  .sum("protein", {
                    where: { consumed: true }
                  })
                  .then(sum => {
                    let proteinBudget = users[0].proteingBudget;
                    let proteinEaten = sum;
                    let proteinPercent = Math.floor(
                      (proteinEaten / proteinBudget) * 100
                    );
                    proteinPercent = proteinPercent.toString() + "%";
                    //Rendering the profile page
                    res.render("profile", {
                      //Handlebars values
                      firstName: users[0].firstName,
                      day: req.params.day,
                      calories: caloricBudget,
                      caloriesEaten: caloriesEaten,
                      calPercent: calPercent,
                      fats: fatsBudget,
                      fatEaten: fatEaten,
                      fatPercent: fatPercent,
                      carbs: carbsBudget,
                      carbsEaten: carbsEaten,
                      carbPercent: carbPercent,
                      protein: proteinBudget,
                      proteinEaten: proteinEaten,
                      proteinPercent: proteinPercent
                    });
                  });
              });
          });
        });
      });
    });
  });
};
//   // Render 404 page for any unmatched routes
//   app.get("*", function(_req, res) {
//     res.render("404");
//   });
// };

// //LOAD meal planner for specific day of the week
// app.get("/user/meal/:day", function(req, res) {
//   //Querying the Users table
//   db.Users.findAll({ where: { id: 1 } }).then(function(users) {
//     // console.log(users[0].username);
//     //Querying the meals table
//     db.meals
//       .findAll({ where: { day: req.params.day } })
//       .then(function(meals) {
//         console.log(meals);
//         //Querying calorie data
//         db.meals
//           .sum("calories", { where: { day: req.params.day, consumed: true } })
//           .then(sum => {
//             let caloricBudget = users[0].caloricBudget;
//             let caloriesEaten = sum;
//             let calPercent = Math.floor(
//               (caloriesEaten / caloricBudget) * 100
//             );
//             calPercent = calPercent.toString() + "%";
//             //Querying fat data
//             db.meals
//               .sum("fat", { where: { day: req.params.day, consumed: true } })
//               .then(sum => {
//                 let fatsBudget = users[0].fatsBudget;
//                 let fatEaten = sum;
//                 let fatPercent = Math.floor((fatEaten / fatsBudget) * 100);
//                 fatPercent = fatPercent.toString() + "%";
//                 //Querying carb data
//                 db.meals
//                   .sum("carbs", {
//                     where: { day: req.params.day, consumed: true }
//                   })
//                   .then(sum => {
//                     let carbsBudget = users[0].carbsBudget;
//                     let carbsEaten = sum;
//                     let carbPercent = Math.floor(
//                       (carbsEaten / carbsBudget) * 100
//                     );
//                     carbPercent = carbPercent.toString() + "%";
//                     //Querying protein data
//                     db.meals
//                       .sum("protein", {
//                         where: { day: req.params.day, consumed: true }
//                       })
//                       .then(sum => {
//                         let proteinBudget = users[0].proteingBudget;
//                         let proteinEaten = sum;
//                         let proteinPercent = Math.floor(
//                           (proteinEaten / proteinBudget) * 100
//                         );
//                         proteinPercent = proteinPercent.toString() + "%";
//                         console.log(users[0].username);
//                         //Rendering the profile page
//                         res.render("meal-planner", {
//                           //Handlebars values
//                           meals: meals,
//                           firstName: users[0].firstName,
//                           day: req.params.day,
//                           calories: caloricBudget,
//                           caloriesEaten: caloriesEaten,
//                           calPercent: calPercent,
//                           fats: fatsBudget,
//                           fatEaten: fatEaten,
//                           fatPercent: fatPercent,
//                           carbs: carbsBudget,
//                           carbsEaten: carbsEaten,
//                           carbPercent: carbPercent,
//                           protein: proteinBudget,
//                           proteinEaten: proteinEaten,
//                           proteinPercent: proteinPercent
//                         });
//                       });
//                   });
//               });
//           });
//       });
//   });
// });
