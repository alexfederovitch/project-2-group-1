//Onclick for the Submit Button for th Sign Up
$("#submitSignUp").on("click", function(event){
  event.preventDefault();
  //Grab the email and password values
  let firstName = $("#firstName").val().trim();
  let lastName = $("#lastName").val().trim();
  let email = $("#inputEmail").val().trim();
  let username = $("#inputUsername").val().trim();
  let pw1 = $("#inputPw1").val().trim();
  let pw2 = $("#inputPw2").val().trim();
  let currentWeight = $("#inputWeight").val().trim();
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
        console.log(`line 151 on index.handlebars`);;

        console.log(result);;
      });
    }   else {
    $("#pwErrAlert").show();
  }
  }
});
;