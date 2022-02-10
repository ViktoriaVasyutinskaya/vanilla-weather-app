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
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  let feelsLike = document.querySelector("#feel");
  feelsLikeFahr = response.data.main.feels_like;
  console.log(feelsLike);
  feelsLike.innerHTML = `Feels like: ${Math.round(feelsLikeFahr)}°`;

  let locationIcon = document.querySelector(".weather-icon");
  let icon = response.data.weather[0].icon;
  locationIcon.innerHTML = `<img src="icons/${icon}.png"></img>`;
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
function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#currentTemp");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrValue = (celciusTemp * 9) / 5 + 32;
  fahrenheitTemp.innerHTML = `${Math.round(fahrValue)}°`;
  let feelsLikeFahrTemp = document.querySelector("#feel");
  let fahrValueFeel = (feelsLikeFahr * 9) / 5 + 32;
  feelsLikeFahrTemp.innerHTML = `Feels like ${Math.round(fahrValueFeel)}°`;
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

let celciusTemp = null;
let feelsLikeFahr = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitSearch);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", showCelcius);

search("Moscow");
