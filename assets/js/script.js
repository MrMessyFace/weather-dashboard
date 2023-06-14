const apiKey = "&appid=882e722c955d0dc80195f6f7f91d4d44";
var city = $("#searchTerm").val();
var date = new Date();

// Pull the search data into the API
$("#searchTerm").keypress(function (event) {
    // keyCode === 13 allows user to use the 'return' key to return weather data
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click();
    };
});

// Search Button Function
$("#searchBtn").on("click", function () {
    // Adding city input
    $('#forecastH5').addClass('show');
    city = $("#searchTerm").val();
    $("#searchTerm").val("");
    // API URL
    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
    // ajax API function
    $.ajax({
        url: queryUrl,
        method: "GET"
    })

        // Function to store temperature for Fahrenheit conversions
        .then(function (res) {
            currentCondition(res);
            currentForecast(res);
            makeList();
        });
});

// Function that adds elements to the page
function makeList() {
    var listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
};

// Function for current weather
function currentCondition(res) {
    // Convert the temperature to Fahrenheit
    var tempF = (res.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#currentCity').empty();

    // The current weather section
    const card = $("<div>").addClass("card bg-transparent text-white");
    // The current weather section body
    const cardBody = $("<div>").addClass("card-body");
    // Searched city and current date
    const city = $("<h4>").addClass("card-title").text(res.name + " (" + date.toLocaleDateString('en-US') + ")");
    // Weather icon
    const imageIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + res.weather[0].icon + ".png");
    // Current temperature
    const temp = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    // Current wind speed
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + res.wind.speed + " MPH");
    // Current humidity
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + res.main.humidity + "%");

    // Adding append data stored in variables to the page
    city.append(city);
    cardBody.append(city, imageIcon, temp, wind, humidity);
    card.append(cardBody);
    $("#currentCity").append(card);
};

// Five-Day Forecast
function currentForecast() {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
        method: "GET"
    }).then(function (res) {
        // Adding forecast input being displayed after use
        $('#forecast').empty();

        // Store the response list in a variable
        var resList = res.list;
        for (var i = 0; i < resList.length; i++) {

            // Adding the indexOf method to return the index of the res.list if value is not -1
            if (resList[i].dt_txt.indexOf("12:00:00") !== -1) {
                var tempF = (resList[i].main.temp - 273.15) * 1.80 + 32;
                tempHi = Math.floor(tempF);

                const card = $("<div>").addClass("card col-md-2 ml-4 bg-success text-white");
                const cardBody = $("<div>").addClass("card-body p-3 forecastBody");
                // 5-day weather icon
                const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + resList[i].weather[0].icon + ".png");
                // 5-day temperature
                const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempHi + " °F");
                // 5-day wind speed
                const windDay = $("<p>").addClass("card-text forecastWind").text("Wind Speed: " + resList[i].wind.speed + " MPH");
                // 5-day humidity
                const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + resList[i].main.humidity + "%");

                // Adding Append data stored in variables to the page
                cardBody.append(image, temperature, windDay, humidity);
                card.append(cardBody);
                $("#forecast").append(card);
            };
        };
    });
};
