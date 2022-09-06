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

function getWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let feelLike = Math.round(response.data.main.feels_like);
  let windSpeed = Math.round(response.data.wind.speed);
  let mainTemp = document.querySelector("#main-temperature");
  mainTemp.innerHTML = temperature;
  let city = document.querySelector(".city");
  city.innerHTML = response.data.name;
  let tempFeel = document.querySelector("#temp-feel");
  tempFeel.innerHTML = feelLike;
  let wind = document.querySelector("#wind");
  wind.innerHTML = windSpeed;
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

let currentTime = new Date();
let timeInfo = document.querySelector("#main-day-time");
timeInfo.innerHTML = displayDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);

let btnLocation = document.querySelector("#location");
btnLocation.addEventListener("click", getLocation);

searchCity("Vienna");



