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

  return `${day}, ${month} ${date}, ${year}`;
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

function changeTemp(event) {
  event.preventDefault();
  let firstTemp = document.querySelector(".temperature");
  firstTemp.innerHTML = `18°C`;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeTemp);

function changeTempBack(event) {
  event.preventDefault();
  let secondTemp = document.querySelector(".temperature");
  secondTemp.innerHTML = `63°F`;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeTempBack);

function showWeather(response) {
  console.log(response);
  let city = response.data.name;
  let headline = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  let tempNow = document.querySelector(".temperature");
  let description = response.data.weather[0].description;
  let tempDescription = document.querySelector(".advice");
  headline.innerHTML = `${city}`;
  tempNow.innerHTML = `${temperature}°C`;
  tempDescription.innerHTML = `${description}`;
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let nowButton = document.querySelector("#now-Button");
nowButton.addEventListener("click", getCurrentLocation);

let goButton = document.querySelector("#go-Button");
goButton.addEventListener("click", handleSubmit);

searchCity("Vancouver");
