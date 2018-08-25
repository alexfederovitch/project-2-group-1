const request = require('request');

module.exports = function (query, callback) {
    const mealsFound = [];
    let mealsId = [];
    const mealsDetails = [];
    let searchList = [];


    console.log(query)
    getSearch = function () {
        const search = {
            url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?` +
                `number=5&query=${query}&limitLicense=false`,
            headers: {
                "X-Mashape-Key": process.env.MASH_APIKEY,
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
            }
        };
        console.log(search.url)
        request.get(search, function (_, _, body) {
            searchList = JSON.parse(body);
            // console.log(snackList.results[0].id,snackList.results.length)

            for (let i = 0; i < searchList.results.length; i++) {
                mealsFound.push(
                    {
                        "spoontacularID": searchList.results[i].id
                    }
                )
            }
            // console.log(mealsSnack);
            getDetails();
        });
    };

    getDetails = function () {
        mealsId = mealsFound.map(function (elem) {
            return elem.spoontacularID
        })
        console.log(mealsId)
        const details = {
            url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?` +
                // `ids=576710%2C10341&includeNutrition=true`,
                `ids=${mealsId.join("%2C")}&includeNutrition=true`,
            headers: {
                "X-Mashape-Key": process.env.MASH_APIKEY,
                "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
            }
        };
        console.log(details);

        request.get(details, function (error, response, body) {
            let detailsList = JSON.parse(body);
            for (let i = 0; i < detailsList.length; i++) {
                // console.log(mealsDetails[i])
                mealsDetails[i] = Object.assign(mealsFound[i], {
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
    getSearch();
}
