// Adding API Key in a variable
const apiKey = "&appid=882e722c955d0dc80195f6f7f91d4d44";

// Adding value of the input in variable
var city = $("#searchTerm").val();

// Adding the current date data in a variable
var date = new Date();

// Adding jQuery syntax for calling on the id of searchTerm
// Adding calling button id of searchButton for the onclick
$("#searchTerm").keypress(function (event) {
    // keyCode === 13 allows user to use the 'return' key to return weather data
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click();
    };
});

// Adding jQuery onclick function for button click
$("#searchBtn").on("click", function () {
    /// Adding the city input value and store it in a variable
    $('#forecastH5').addClass('show');
    city = $("#searchTerm").val();
    $("#searchTerm").val("");
    // Adding weather URL, city value and API in variable
    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
    // Adding AJAX get request using URL, City and API key
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    
    // Adding a statment to get response and store fahrenheit temp values
    .then(function (res) {
        var tempF = (res.main.temp - 273.15) * 1.80 + 32;
        currentCondition(res);
        currentForecast(res);
        makeList();
    });
});

// Adding a function to add classes to list items and append city name //
function makeList() {
    var listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
};

// Adding function to convert temp into fahrenheit //
// Adding the current city being displayed after use //
function currentCondition(res) {
    // Convert the tempurature to fahrenheit //
    var tempF = (res.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#currentCity').empty();
    
    // Adding input the content to the dom using jQuery
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h4>").addClass("card-title").text(res.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    const temp = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + res.main.humidity + "%");
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + res.wind.speed + " MPH");
    const imageIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + res.weather[0].icon + ".png");

    // Adding Append data stored in variables to the page //
    city.append(city);
    cardBody.append(city, cityDate, imageIcon, temp, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card);
};

// Adding currentForecast function to make AJAX request for forecast and create and append content //
function currentForecast() {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
        method: "GET"
    }).then(function (res) {

        // Adding forecast input being displayed after use //
        $('#forecast').empty();

       // Store the response list in a variable //
        var resList = res.list;
        for (var i = 0; i < resList.length; i++) {

            // Adding the indexOf method to return the index of the res.list //
            // Adding value is not found 'return -1 //
            if (resList[i].dt_txt.indexOf("12:00:00") !== -1) {

                // Adding the current temp //
                // Adding fahrenheit conversion - store in varialbe //
                var temp = (resList[i].main.temp - 273.15) * 1.80 + 32;
                var tempF = Math.floor(temp);
                var dates = resList[i].dt_txt;

                // Adding input the content to the dom using jQuery //
                const card = $("<div>").addClass("card col-md-2 ml-4 bg-success text-white");
                const cardBody = $("<div>").addClass("card-body p-3 forecastBody");
                const fiveDate = $("<p>").addClass("card-title").text(dates);
                const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
                const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + resList[i].main.humidity + "%");
                const windDay = $("<p>").addClass("card-text forecastWind").text("Wind Speed: " + resList[i].wind.speed + " MPH");
                const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + resList[i].weather[0].icon + ".png");

                // Adding Append data stored in variables to the page //
                cardBody.append(fiveDate, image, temperature, humidity, windDay);
                card.append(cardBody);
                $("#forecast").append(card);
            };
        };
    });
};
