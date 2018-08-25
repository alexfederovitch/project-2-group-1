$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyBLBrmK0uxoh_3-cXZrtZWVmShKBnPunFw",
    authDomain: "macrosapp-ea2a8.firebaseapp.com",
    databaseURL: "https://macrosapp-ea2a8.firebaseio.com",
    projectId: "macrosapp-ea2a8",
    storageBucket: "macrosapp-ea2a8.appspot.com",
    messagingSenderId: "498399742442"
  };
  firebase.initializeApp(config);

  const auth = firebase.auth();

  $("#logOut").on("click", function(event) {
    event.preventDefault();
    console.log("hello from logout");
    firebase
      .auth()
      .signOut()
      .then(function() {
        localStorage.clear();
        window.location.href = "/";
      })
      .catch(function(error) {
        console.log(error.message);
      });
  });

  //Onclick for the Submit Button for the Sign Up
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

    console.log(
      firstName,
      lastName,
      email,
      username,
      pw1,
      pw2,
      currentWeight,
      goal
    );

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

    //__>DELETE?
    var temp;
    //console.log(newUserVals.password,newUserVals.password2,newUserVals.password === newUserVals.password2)
    if (newUserVals.password === newUserVals.password2) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(newUserVals.email, newUserVals.password)
        .then(function(user) {
          // This POST request is sent to the API Routes.JS
          $.ajax("/api/newUser", {
            type: "POST",
            data: newUserVals
          }).then(function(result) {
            if (result.isworking) {
              console.log(result);
              temp = result;
              const userID = result.dbUsers.id;
              console.log(userID);
              localStorage.setItem("id", userID);
              localStorage.setItem("email", result.dbUsers.email);
              localStorage.setItem("username", result.dbUsers.username);
              localStorage.setItem("firstName", result.dbUsers.firstName);
              localStorage.setItem(
                "currenWeight",
                result.dbUsers.currentWeight
              );
              window.location.href = `/members/${localStorage.id}`;;
            }
          });
        })
        .catch(function(result) {
          console.log(result);
          alert(result.message);
          //this function is caputring the error and
          console.log("line 151 on index.handlebars");
          console.log(result);
        });
    }
  });
});
