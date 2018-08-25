// Checks to see if the todolist exists in localStorage and is an array currently
// If not, set a local list variable to an empty array
// Otherwise list is our current list of todos

var list = JSON.parse(localStorage.getItem("todolist"));

if (!Array.isArray(list)) {
  list = [];
}


$("#todo-list").empty(); // empties out the html

var insideList = JSON.parse(localStorage.getItem("todolist"));

// Checks to see if we have any todos in localStorage
// If we do, set the local insideList variable to our todos
// Otherwise set the local insideList variable to an empty array
if (!Array.isArray(insideList)) {
  insideList = [];
}
$(document).on("click", "button.delete", function() {
    var todolist = JSON.parse(localStorage.getItem("todolist"));
    var currentIndex = $(this).attr("data-index");

    localStorage.setItem("todolist", JSON.stringify(todolist));
    
    $("input[type='submit']").on("click", function(event) {
      event.preventDefault();
      // Setting the input value to a variable and then clearing the input
      var val = $("input[type='text']").val();
      $("input[type='text']").val("");

      // Adding our new todo to our local list variable and adding it to local storage
      list.push(val);
      localStorage.setItem("todolist", JSON.stringify(list));
