// Initialize Firebase
var config = {
    apiKey: "AIzaSyAcUnk9odkQ2SQM68Lxh8MuOPr-mQ_AfTQ",
    authDomain: "roadtripper-cd101.firebaseapp.com",
    databaseURL: "https://roadtripper-cd101.firebaseio.com",
    projectId: "roadtripper-cd101",
    storageBucket: "",
    messagingSenderId: "163943163525"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();

   // Initial Values
   var name = "";
   var email = "";
   var message = "";

   // Capture Button Click
   $("#submit").on("click", function() {
     // Prevent refresh
     event.preventDefault();

     // Input values of variables
     name = $("#name").val().trim();
     email = $("#email").val().trim();
     message = $("#message").val().trim();

      //Upload variables into database
     database.ref().set({
       name: name,
       email: email,
       message: message
     });

   });

   // Firebase watcher + initial loader 
   database.ref().on("value", function(snapshot) {


    
     // Handle the errors
   }, function(errorObject) {
     console.log("Errors handled: " + errorObject.code);
   });