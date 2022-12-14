function displayDate(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let currentDate = date.getDate();
  let monthIndex = date.getMonth();
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = currentTime.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${currentDate} ${months[monthIndex]} ${currentHour}:${currentMinute}`;
}

function getForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let numDay = date.getDate();
  let monthIndex = date.getMonth();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return `${numDay} ${months[monthIndex]}, ${days[day]}`;
}


function showForecast(response) {
  let forecast = response.data.daily;
  forecastEl = document.querySelector("#forecast");
  forecastHtml = '';
  forecast.forEach(function (forecastObj, index) {
    if(index < 5) {
      forecastHtml += `<div class="day-forecast-wrap">
      <p class="day-info" id="forecast-day">${getForecastDate(forecastObj.dt)}</p>
      <p class="day-temperature" id="forecast-temp">${Math.round(forecastObj.temp.max)}°/ <span class="min-temp" id="min-temp">${Math.round(forecastObj.temp.min)}°</span><img src="http://openweathermap.org/img/wn/${forecastObj.weather[0].icon}@2x.png" class="forecast-icon" alt="weather icon"/></p>
      </div>`
    }
  });
  forecastEl.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function getWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let feelLike = Math.round(response.data.main.feels_like);
  let windSpeed = Math.round(response.data.wind.speed);
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let icon = response.data.weather[0].icon;
  celsiusTemp = response.data.main.temp;
  let mainTempEl = document.querySelector("#main-temperature");
  let cityEl = document.querySelector(".city");
  let tempFeelEl = document.querySelector("#temp-feel");
  let windEl = document.querySelector("#wind");
  let descriptionEl = document.querySelector("#description");
  let iconEl = document.querySelector("#main-imj");
  mainTempEl.innerHTML = temperature;
  cityEl.innerHTML = city;
  tempFeelEl.innerHTML = feelLike;
  windEl.innerHTML = windSpeed;
  descriptionEl.innerHTML = description;
  iconEl.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
  iconEl.setAttribute("alt", description);
  getForecast(response.data.coord);
}

function getCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let city = searchInput.value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function handleLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handleLocation);
}

let currentTime = new Date();
let timeInfo = document.querySelector("#main-day-time");
timeInfo.innerHTML = displayDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);

let btnLocation = document.querySelector("#location");
btnLocation.addEventListener("click", getLocation);

searchCity("Vienna");



