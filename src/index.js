let current = new Date();
function dateInfo() {
  let date = current.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[current.getDay()];
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
  let month = months[current.getMonth()];
  let year = current.getFullYear();

  return `${day} ${month} ${date}, ${year}`;
}
let dateToday = document.querySelector("h2");
dateToday.innerHTML = dateInfo(current);

function tellTime() {
  let hours = current.getHours();
  let realTime = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  let minutes = current.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes} ${realTime}`;
}
let currentTime = document.querySelector("h3");
currentTime.innerHTML = tellTime(current);

searchCity("Vancouver");
function showWeather(response) {
  let headline = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  celsiusTemperature = response.data.main.temp;
  let tempNow = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let tempDescription = document.querySelector(".advice");
  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  headline.innerHTML = `${response.data.name}`;
  tempNow.innerHTML = `${temperature}°C`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  tempDescription.innerHTML = `${response.data.weather[0].description}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
}

function searchCity(city) {
  let apiKey = "2404bb060c80d2e68d582b02d737ddf3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#find-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2404bb060c80d2e68d582b02d737ddf3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let nowButton = document.querySelector("#now-Button");
nowButton.addEventListener("click", getCurrentLocation);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature) + `°F`;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature) + `°C`;
}

let celsiusTemperature = null;

let goButton = document.querySelector("#go-Button");
goButton.addEventListener("click", handleSubmit);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchCity("Vancouver");
