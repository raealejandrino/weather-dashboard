var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");

function findCoord(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();
    // google geocoding api
    var coordApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyAfl9qXiBEqLsi1wvqPGoTN9N7f4YtBp38";

    fetch(coordApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            alert('Error');
        }
    });

    console.log(city);
};

function fetchTest(event) {
    event.preventDefault();

    
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"




    console.log(event);
};

cityFormEl.addEventListener("submit", findCoord);