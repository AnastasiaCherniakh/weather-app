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

function showForecast() {
  forecastEl = document.querySelector("#forecast");
  let days = ["fri",'thu',"sun"];
  forecastHtml = '';
  days.forEach(function (day) {
    forecastHtml += `<div class="day-forecast-wrap">
    <p class="day-info" id="forecast-day">${day}</p>
    <p class="day-temperature" id="forecast-temp">27°C ☀️</p>
    </div>`
  });
  forecastEl.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
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
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function handleLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handleLocation);
}

function getFahrenheit(event) {
  event.preventDefault();
  let temperatureEl = document.querySelector("#main-temperature");
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  let fahrenheitTemp = (celsiusTemp *9/5) + 32;
  temperatureEl.innerHTML = Math.round(fahrenheitTemp);
}

function getCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureEl = document.querySelector("#main-temperature");
  temperatureEl.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;


let currentTime = new Date();
let timeInfo = document.querySelector("#main-day-time");
timeInfo.innerHTML = displayDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);

let btnLocation = document.querySelector("#location");
btnLocation.addEventListener("click", getLocation);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", getFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", getCelsius);

searchCity("Vienna");
showForecast();



