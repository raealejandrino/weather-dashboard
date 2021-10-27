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

    console.log(temp);

};

cityFormEl.addEventListener("submit", findCoord);