function setDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `Last updated: ${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElem = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="week-days">${formatDay(forecastDay.dt)}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt=""
              />
              <div class="temp-days">
                <span class="max-temp">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="min-temp">${Math.round(
                  forecastDay.temp.min
                )}°</span>
        </div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElem.innerHTML = forecastHTML;
}
function getCoords(coordinates) {
  console.log(coordinates);
  let apiKey = "8dc5c84de9b99758c12092b7cd18ffae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showTemp(response) {
  console.log(response.data);
  let tempElem = document.querySelector("#currentTemp");
  celciusTemp = response.data.main.temp;
  tempElem.innerHTML = `${Math.round(celciusTemp)}°`;
  let date = document.querySelector("#date");
  date.innerHTML = setDate(
    response.data.dt * 1000 - response.data.timezone * 1000
  );
  let cityElem = document.querySelector("#city");
  cityElem.innerHTML = response.data.name;
  let conditions = document.querySelector("#conditions");
  conditions.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let feelsLike = document.querySelector("#feel");
  feelsLikeFahr = response.data.main.feels_like;
  feelsLike.innerHTML = `Feels like: ${Math.round(feelsLikeFahr)}°`;
  let locationIcon = document.querySelector(".weather-icon");
  let icon = response.data.weather[0].icon;
  locationIcon.innerHTML = `<img src="icons/${icon}.png"></img>`;
  getCoords(response.data.coord);
}

function search(city) {
  let apiKey = "8dc5c84de9b99758c12092b7cd18ffae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemp);
}

function submitSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".type-city");
  search(cityInput.value);
}
/*showCelcius(event);
}
function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#currentTemp");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrValue = (celciusTemp * 9) / 5 + 32;
  fahrenheitTemp.innerHTML = `${Math.round(fahrValue)}°`;
  let feelsLikeFahrTemp = document.querySelector("#feel");
  let fahrValueFeel = (feelsLikeFahr * 9) / 5 + 32;
  feelsLikeFahrTemp.innerHTML = `Feels like: ${Math.round(fahrValueFeel)}°`;
}

function showCelcius(event) {
  event.preventDefault();
  let temperatureElem = document.querySelector("#currentTemp");
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElem.innerHTML = `${Math.round(celciusTemp)}°`;
  let feelsLikeElem = document.querySelector("#feel");
  feelsLikeElem.innerHTML = `Feels like: ${Math.round(feelsLikeFahr)}°`;
}
/*
let celciusTemp = null;
let feelsLikeFahr = null;
*/

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitSearch);

/*
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);


let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", showCelcius);
*/

search("Amsterdam");
