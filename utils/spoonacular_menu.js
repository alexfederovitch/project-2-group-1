const request = require("request");

module.exports = function (diet, avoid, callback) {
    let targetCal = 2000;
    let mealsMain = [];
    let mealsSnack = [];
    let mealsIDs = [];
    let mealsAll = [];
    let mealsDetails = [];
    let mealType = "";

    getMains = function () {

        const mains = {
            url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?
            timeFrame=week&targetCalories=${targetCal}&diet=${diet}&exclude=${avoid}`,
            headers: {
                "X-Mashape-Key": process.env.MASH_APIKEY,
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
            }
        };

        request.get(mains, function (_,_, body) {
            let mealPlan = JSON.parse(body);

            for (n of mealPlan.items) {
                switch (n.slot) {
                    case 1:
                        mealType = "Breakfast"
                        break;
                    case 2:
                        mealType = "Lunch"
                        break;
                    case 3:
                        mealType = "Dinner"
                        break;
                }

                mealsMain.push(
                    {
                        "mealType": mealType,
                        "spoontacularID": (JSON.parse(n.value)).id
                    }
                )
            }
            // console.log(mealsMain);
            getSnacks();
        });
    };

    getSnacks = function () {

        const snacks = {
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?`' +
                `limitLicense=false&ranking=2&minCalories=10&maxCalories=200&offset=0&number=20&diet=${diet}&exclude=${avoid}`,
            headers: {
                "X-Mashape-Key": process.env.MASH_APIKEY,
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
            }
        };

        request.get(snacks, function (error, response, body) {
            let snackList = JSON.parse(body);
            // console.log(snackList.results[0].id,snackList.results.length)

            for (let i = 0; i < snackList.results.length; i++) {
                mealsSnack.push(
                    {
                        "mealType": "Snack",
                        "spoontacularID": snackList.results[i].id
                    }
                )
            }
            // console.log(mealsSnack);
            getDetails();
        });
    };

    getDetails = function () {
        mealsAll = mealsMain.concat(mealsSnack);
        mealsIDs = mealsAll.map(function (elem) {
            return elem.spoontacularID
        })
        // console.log(mealsIDs)


        const details = {
            url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?` +
                // `ids=576710%2C10341&includeNutrition=true`,
                `ids=${mealsIDs.join("%2C")}&includeNutrition=true`,
            headers: {
                "X-Mashape-Key": process.env.MASH_APIKEY,
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
            }
        };
        // console.log(details);




        request.get(details, function (error, response, body) {
            let detailsList = JSON.parse(body);
            for (let i = 0; i < detailsList.length; i++) {
                // console.log(mealsDetails[i])
                mealsDetails[i] = Object.assign(mealsAll[i], {
                    "mealName": detailsList[i].title,
                    "image": detailsList[i].image,
                    "url": detailsList[i].spoonacularSourceUrl,
                    "calories": detailsList[i].nutrition.nutrients[0].amount,
                    "fat": detailsList[i].nutrition.nutrients[1].amount,
                    "carbs": detailsList[i].nutrition.nutrients[3].amount,
                    "protein": detailsList[i].nutrition.nutrients[7].amount,

                })
            }
            callback(mealsDetails);
        });
    }
    getMains();
}
