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
  tempElem.innerHTML = Math.round(response.data.main.temp);
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
  feelsLike.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}°`;
  let locationIcon = document.querySelector(".weather-icon");
  let icon = response.data.weather[0].icon;
  locationIcon.innerHTML = `<img src="icons/${icon}.png"></img>`;
  console.log(response.data.weather[0].icon);
}

let apiKey = "8dc5c84de9b99758c12092b7cd18ffae";
let city = "Moscow";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(`${apiUrl}`).then(showTemp);
