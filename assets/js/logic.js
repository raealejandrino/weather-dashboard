var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");

function findCoord(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    console.log(city);
};

function fetchTest(event) {
    event.preventDefault();

    
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"




    console.log(event);
};

cityFormEl.addEventListener("submit", findCoord);