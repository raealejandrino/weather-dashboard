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
                console.log(data.results[0]);
                fetchTest(lat, lng, city);
            });
        } else {
            alert('Error');
        }
    });

    
};

function fetchTest(lat, lon, city) {
    

    
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=eb74d780646659d73e979d1c2e45c146";

    

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            alert('fetch error');
        }
    });

    // Moment

    var currentDate = moment().format("M/D/YY");

    console.log(currentDate);

    // Display
    
    var currentCityDate = document.createElement("h3");
    currentCityDate.innerHTML = city + currentDate;

    currentWeatherElement.appendChild(currentCityDate);

    






   
};

cityFormEl.addEventListener("submit", findCoord);