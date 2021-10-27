var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var currentWeatherElement = document.querySelector(".current");

function findCoord(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();
    // google geocoding api
    var coordApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyAfl9qXiBEqLsi1wvqPGoTN9N7f4YtBp38";

    fetch(coordApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var lat = data.results[0].geometry.location.lat;
                var lng = data.results[0].geometry.location.lng;
                city = data.results[0].address_components[0].short_name;
                fetchWeather(lat, lng, city);
            });
        } else {
            alert('Error');
        }
    });

    
};

function fetchWeather(lat, lon, city) {
    

    
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=eb74d780646659d73e979d1c2e45c146";

    

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data, city);

            });
        } else {
            alert('fetch error');
        }
    });

    
    
    
};


function displayWeather(data, city) {
    
    currentWeatherElement.textContent = "";

    // Moment
    
    var currentDate = moment().format("M/D/YY");
    
    console.log(currentDate);


    // Display city input and current date
    
    var currentCityDate = document.createElement("h1");
    currentCityDate.innerHTML = city + "  (" + currentDate + ")";
    currentWeatherElement.appendChild(currentCityDate);


    // Display Temperature

    var temp = data.current.temp;
    var tempEl = document.createElement("h3");
    tempEl.textContent = "Temp: " + temp + "°F";
    currentWeatherElement.appendChild(tempEl);

    // Display Wind Speed
    var windSpeed = data.current.wind_speed;
    var windEl = document.createElement("h3");
    windEl.textContent = "Wind: " + windSpeed + " MPH";
    currentWeatherElement.appendChild(windEl);

    // Display Humidity
    var humid = data.current.humidity;
    var humidEl = document.createElement("h3");
    humidEl.textContent = "Humidity: " + humid + "%";
    currentWeatherElement.appendChild(humidEl);

    // Display UV Index
    var uvi = data.current.uvi;
    var uviEl = document.createElement("h3");
    uviEl.textContent = "UV Index: ";

    var uviSpan = document.createElement("span");
        // uvi logic

        if (uvi <= 2) {
            uviSpan.className = "uviLow";
        } else if (uvi <= 5) {
            uviSpan.className = "uviMod";
        } else if (uvi <= 8) {
            uviSpan.className = "uviHigh";
        } else if (uvi <= 10) {
            uviSpan.className = "uviReallyHigh";
        } else {
            uviSpan.className = "uviSevere";
        }

    uviSpan.setAttribute("id", "uvispan");
    uviEl.classList = "d-flex align-items-center";

    uviSpan.textContent = uvi;
    uviEl.appendChild(uviSpan);

    currentWeatherElement.appendChild(uviEl);

    console.log(data);

};

cityFormEl.addEventListener("submit", findCoord);