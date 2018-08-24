// Get references to page elements
$(".navSignup").on("click", function () {
  console.log("hey");
  $.ajax({
    url: "/signup",
    type: "GET"
  });
});
$(".navLogin").on("click", function () {
  $.ajax({
    url: "/login",
    type: "GET"
  });
});

// The API object contains methods for each kind of request we'll make
var API = {

  saveMeal: function (meal) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/meals",
      data: JSON.stringify(meal)
    });
  },

  deleteMeal: function (id) {
    return $.ajax({
      url: "/api/meals/" + id,
      type: "DELETE"
    });
  }
};

//handleOptionsBtnClick
const handleOptionsBtnClick = function (event) {
  // event.preventDefault();
  console.log("CLICKED");
  return true;
};
$("#options").on("submit", handleOptionsBtnClick);

//handleSearchBtnClick
let handleSearchBtnClick = function () { };
//handleAddMealBtnClick
let handleAddMealBtnClick = function () { };

// handleDeleteBtnClick is called when an example's delete button is clicked
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteMeal(idToDelete).then(function () {
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
modBtn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
//MODAL END

//MAKING CUSTOM MEAL
var handleMealFormSubmit = function (event) {
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

  API.saveMeal(meal).then(function () {
    console.log("saved");
  });
};

// Add event listeners to the submit and delete buttons
$("#creatMealBtn").on("click", handleMealFormSubmit);
$("#deleteMealBtn").on("click", handleDeleteBtnClick);

$("#getSearchBtn").on("click", handleSearchBtnClick);
$("#addMealBtn").on("click", handleAddMealBtnClick);
