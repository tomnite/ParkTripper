// Global Variables

// Search Parameters
var state = "";
var name = "";
var numResults = 0;
var description = "";
var url = "";
var images = "";
var code = "";
var fields = "";

// Search button functionality
$("#searchBtn").on("click", function() {
    event.preventDefault();
    // Get Search Terms
    state = $("#search").val().trim();
    // Get the Number of Parks
    numResults = $("#numParks").val();
    // Send the AJAX call the newly assembled URL
    runQuery(numResults, state);
});

// Variable to Track number of places
var parkCounter = 0;

// Functions
function runQuery(numParks, state) {
  var queryURLBase =
    "https://developer.nps.gov/api/v1/parks?stateCode=" +
    state +
    "&fields=images,addresses&api_key=afINGn9zfWUna73PflSQlrH2T9LUuA2dAiUDkTeb";
  //AJAX Function
    $.ajax({ 
        url: queryURLBase,
        datatype: 'json',
        error: function(data){
            console.log("There was an error");
        },
        success: function(data){
            $("#wellSection").empty();
            console.log("--------------");
            console.log(queryURLBase);
            console.log("--------------");
            console.log(numParks);
            console.log(data);
            for (var i = 0; i < numParks; i++) {
                var item = {
                    i: i,
                    fullName: data.data[i].fullName,
                    description: data.data[i].description,
                    url: data.data[i].url,
                    images: data.data[i].images[i],
                    city: data.data[i].addresses[0].city,
                    stateCode: data.data[i].addresses[0].stateCode
                }
                
                // we have the park, append to page
                var wellSection = $("<div>");
                wellSection.addClass("well");
                wellSection.attr("id", "parkWell-" + i);
                $("#wellSection").append(wellSection);
                // Attach the content to the appropriate well
                $("#parkWell-" + i).append(
                    "<img class='urlToImage' src='" + data.data[i].images[0].url + "'>"
                );
                $("#parkWell-" + i).append(
                    "<h3>" + data.data[i].fullName + "</h3>"
                );
                $("#parkWell-" + i).append(
                    "<p>" + data.data[i].description + "</p>"
                );
                $("#parkWell-" + i).append(
                    "<a href='" + data.data[i].url + "'>Park Website:  " + data.data[i].url + "</a>"
                );
                $("#parkWell-" + i).append(
                    "<h3>Park Weather Forecast:</h3>"
                );
                (function weather() {
                    var object = item; // the reference to the object
                    // self-invoking functions need to explicitly return something...
                    
                    var cityWeather = object.city;
                    var stateWeather = object.stateCode;
                    var queryURLWeather = "http://api.wunderground.com/api/690cb48e9e905cb4";
                    var searchTerm = cityWeather + "," + stateWeather;
                    queryURLWeather += "/forecast/q/" + searchTerm + ".json";
                    console.log(cityWeather);
                    console.log(queryURLWeather);
                    
                    //return function() {
                        
                        $.ajax({
                          url: queryURLWeather,
                          method: "GET"
                        }).then(function(wundergroundData) {
                          // append weather info to each item
                          console.log(object.i);
                            $("#parkWell-" + object.i).append(
                            "<h5>" + wundergroundData.forecast.txt_forecast.forecastday[0].title + "</h5>");
                            $("#parkWell-" + object.i).append(
                            "<p>" + wundergroundData.forecast.txt_forecast.forecastday[0].fcttext + "</p>");
                            $("#parkWell-" + object.i).append(
                            "<h5>" + wundergroundData.forecast.txt_forecast.forecastday[1].title + "</h5>");
                            $("#parkWell-" + object.i).append(
                            "<p>" + wundergroundData.forecast.txt_forecast.forecastday[1].fcttext + "</p>");
                            $("#parkWell-" + object.i).append(
                            "<h5>" + wundergroundData.forecast.txt_forecast.forecastday[2].title + "</h5>");
                            $("#parkWell-" + object.i).append(
                            "<p>" + wundergroundData.forecast.txt_forecast.forecastday[2].fcttext + "</p>");
                            $("#parkWell-" + object.i).append(
                            "<h5>" + wundergroundData.forecast.txt_forecast.forecastday[3].title + "</h5>");
                            $("#parkWell-" + object.i).append(
                            "<p>" + wundergroundData.forecast.txt_forecast.forecastday[3].fcttext + "</p>");
                        console.log(wundergroundData);
                        console.log(wundergroundData.forecast.txt_forecast.forecastday[0].title);
                        console.log(wundergroundData.forecast.txt_forecast.forecastday[0].fcttext);
                        console.log(wundergroundData.forecast.txt_forecast.forecastday[1].title);
                        console.log(wundergroundData.forecast.txt_forecast.forecastday[1].fcttext);
                        console.log(wundergroundData.forecast.txt_forecast.forecastday[2].title);
                        console.log(wundergroundData.forecast.txt_forecast.forecastday[2].fcttext);
                        console.log(wundergroundData.forecast.txt_forecast.forecastday[3].title);
                        console.log(wundergroundData.forecast.txt_forecast.forecastday[3].fcttext);
                        });
                        
                    //} // end of return
                })() // end of weather function

            }


        }
    })
      //method: "GET" }).then(function(ParksData) {
    //Logging to Console
    
    
    
//***NEED TO HAVE CLOSURE */
        //var item = 
//success: function(data){

  
}
      

      // Start Dumping to HTML
      


