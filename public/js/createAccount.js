//Onclick for the Submit Button for th Sign Up
$("#button").on("click", function(event) {
  event.preventDefault();
  //Grab the email and password values
  let firstName = $("#first-name")
    .val()
    .trim();
  let lastName = $("#last-name")
    .val()
    .trim();
  let email = $("#email")
    .val()
    .trim();
  let username = $("#username")
    .val()
    .trim();
  let pw1 = $("#password")
    .val()
    .trim();
  let pw2 = $("#confirm-password")
    .val()
    .trim();
  let currentWeight = $("#weight")
    .val()
    .trim();
  let goal = $("input[name='goalOption']:checked").val();

  console.log(email, username, pw1, pw2, currentWeight, goal);

  const newUserVals = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    password: pw1,
    password2: pw2,
    currentWeight: currentWeight,
    goal: goal
  };

  /////////////\\\\\\\\\\\\\\\
  //VALIDATE that pw1 = pw2 BEFORE sending the POST req!!!!!!
  ///////////////\\\\\\\\\\\\\\\

  if (newUserVals.password === newUserVals.password2) {
    // This POST request is sent to the API Routes.JS
    $.ajax("/api/newUser", {
      type: "POST",
      data: newUserVals
    })
      .then(function(result) {
        if (result.isworking) {
          console.log(result);

          // Reload the page to get the updated list
          // location.reload()
        }
      })
      .catch(function(result) {
        //this function is caputring the error and
        $("#errorAlert").show();
        console.log("line 151 on index.handlebars");

        console.log(result);
      });
  } else {
    $("#pwErrAlert").show();
  }
});
