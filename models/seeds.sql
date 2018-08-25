/*
-- Query: SELECT * FROM fitness_db.users
-- Date: 2018-08-24 23:15
*/
INSERT INTO `Users` (`id`,`Username`,`pw1`,`pw2`,`email`,`firstName`,`lastName`,`currentWeight`,`weightGoal`,`caloricBudget`,`carbsBudget`,`fatsBudget`,`proteingBudget`,`createdAt`,`updatedAt`) VALUES (1,'alxfed','password','password','alexfederovitch@yahoo.com','Alex','Federovitch',290,220,1800,20,20,50,NULL,NULL);
INSERT INTO `users` (`id`,`Username`,`pw1`,`pw2`,`email`,`firstName`,`lastName`,`currentWeight`,`weightGoal`,`caloricBudget`,`carbsBudget`,`fatsBudget`,`proteingBudget`,`createdAt`,`updatedAt`) VALUES (2,'testr','password','password','test@test.com','Test','Account',200,175,2200,20,25,45,NULL,NULL);

/*
-- Query: SELECT * FROM fitness_db.meals
-- Date: 2018-08-24 23:17
*/
INSERT INTO `meals` (`id`,`day`,`mealName`,`servings`,`calories`,`fat`,`carbs`,`protein`,`mealOrder`,`consumed`,`createdAt`,`updatedAt`,`UserId`) VALUES (1,'Monday','Breakfast',1,400,5,5,10,1,1,NULL,NULL,1);
INSERT INTO `meals` (`id`,`day`,`mealName`,`servings`,`calories`,`fat`,`carbs`,`protein`,`mealOrder`,`consumed`,`createdAt`,`updatedAt`,`UserId`) VALUES (2,'Monday','Lunch',1,400,5,5,10,2,1,NULL,NULL,1);
INSERT INTO `meals` (`id`,`day`,`mealName`,`servings`,`calories`,`fat`,`carbs`,`protein`,`mealOrder`,`consumed`,`createdAt`,`updatedAt`,`UserId`) VALUES (3,'Monday','Dinner',1,400,5,5,10,3,0,NULL,NULL,1);
INSERT INTO `meals` (`id`,`day`,`mealName`,`servings`,`calories`,`fat`,`carbs`,`protein`,`mealOrder`,`consumed`,`createdAt`,`updatedAt`,`UserId`) VALUES (4,'Tuesday','Breakfast',1,400,10,10,20,1,0,NULL,NULL,1);
