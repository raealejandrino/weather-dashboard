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
                var lat = data.results[0].geometry.location.lat;
                var lng = data.results[0].geometry.location.lng;

                fetchTest(lat, lng);
            });
        } else {
            alert('Error');
        }
    });

    console.log(city);
};

function fetchTest(lat, lon) {
    

    
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=eb74d780646659d73e979d1c2e45c146";

    console.log(apiUrl);

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            alert('fetch error');
        }
    });




   
};

cityFormEl.addEventListener("submit", findCoord);