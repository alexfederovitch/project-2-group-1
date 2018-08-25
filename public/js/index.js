//Add functions for day of the week listeners
function toSunday() {
  location.href = "/user/meal/sunday";
}

function toMonday() {
  location.href = "/user/meal/monday";
}

function toTuesday() {
  location.href = "/user/meal/tuesday";
}

function toWednesday() {
  location.href = "/user/meal/wednesday";
}

function toThursday() {
  location.href = "/user/meal/thursday";
}

function toFriday() {
  location.href = "/user/meal/friday";
}

function toSaturday() {
  location.href = "/user/meal/saturday";
}

function toDay(day) {
  location.href = "/user/meal/" + day;
}
// Get references to page elements
$(".navSignup").on("click", function() {
  console.log("hey");
  $.ajax({
    url: "/signup",
    type: "GET"
  });
});
$(".navLogin").on("click", function() {
  $.ajax({
    url: "/login",
    type: "GET"
  });
});

// The API object contains methods for each kind of request we'll make
const API = {
  saveMeal: function(meal) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/meals",
      data: JSON.stringify(meal)
    });
  },

  deleteMeal: function(id) {
    return $.ajax({
      url: "/api/meals/" + id,
      type: "DELETE"
    });
  }
};

// handleDeleteBtnClick is called when an example's delete button is clicked
const handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteMeal(idToDelete).then(function() {
    console.log("deleted");
  });
};

//MODAL
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var modBtn = document.getElementById("modBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
$("#modBtn").on("click", function() {
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
$("span").on("click", function() {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
$(window).on("click", function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
//MODAL END

//MAKING CUSTOM MEAL
const handleMealFormSubmit = function(event) {
  event.preventDefault();

  var meal = {
    day: document.getElementById("day").value,
    mealName: $("#mealName")
      .val()
      .trim(),
    servings: $("#servings")
      .val()
      .trim(),
    calories: $("#calories")
      .val()
      .trim(),
    fat: $("#fats")
      .val()
      .trim(),
    carbs: $("#carbs")
      .val()
      .trim(),
    protein: $("#proteins")
      .val()
      .trim(),
    mealOrder: document.getElementById("order").value
  };

  console.log(meal);

  if (
    !(
      meal.day &&
      meal.mealName &&
      meal.servings &&
      meal.calories &&
      meal.calories &&
      meal.fat &&
      meal.carbs &&
      meal.protein &&
      meal.mealOrder
    )
  ) {
    alert("Please complete all fields");
    return;
  }

  API.saveMeal(meal).then(function() {
    console.log("saved");
    location.reload();
  });
};

//GET SUGGESTED MEALS
const handleOptionsBtnClick = function() {
  return true;
};

//ADD SUGGESTED MEAL
const handleAddMealClick = function(event) {
  event.preventDefault();
  const mealId = $(this).attr("name");
  const meal = {
    day: $(`#day-${mealId}`)
      .val()
      .trim(),
    mealName: $(`#title-${mealId}`).attr("value"),
    servings: 1,
    calories: $(`#cal-${mealId}`).attr("value"),
    fat: $(`#fat-${mealId}`).attr("value"),
    carbs: $(`#carbs-${mealId}`).attr("value"),
    protein: $(`#protein-${mealId}`).attr("value"),
    mealOrder: $(`#order-${mealId}`)
      .val()
      .trim()
  };

  API.saveMeal(meal).then(function() {
    console.log("saved");
    toDay(meal.day);
  });
};

//SEARCH MEAL
const handleSearchBtnClick = function() {
  return true;
};

//GET DAY FROM DAY BUTTONS
const handleGetDayBtnClick = function() {
  event.preventDefault();
  const day = $(this).attr("name");
};

// Add event listeners to the submit and delete buttons
$("#creatMealBtn").on("click", handleMealFormSubmit);
$("#deleteMealBtn").on("click", handleDeleteBtnClick);
$("#meal-options").on("click", handleOptionsBtnClick);
$("#meal-search").on("click", handleSearchBtnClick);
$(document).on("click", ".add-meal-btn", handleAddMealClick);
$(".day-btn").on("click", handleGetDayBtnClick);
