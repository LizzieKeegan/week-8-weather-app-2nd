function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let roundedTemperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidityData = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let weatherIcon = document.querySelector("#weather-app-icon");
  let iconURL = response.data.condition.icon_url;
  let iconImage = `<img src="${iconURL}">`;

  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = roundedTemperature;
  weatherIcon.innerHTML = iconImage;
  cityElement.innerHTML = response.data.city;
  weatherDescription.innerHTML = response.data.condition.description;
  humidityData.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = response.data.wind.speed;
}
function formatDate(date) {
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let hours = date.getHours();
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
  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "3bt55of44c88990a4f0ababb8d8f6206";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">☀️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">18°</div>
          7°
        </div>
      </div>
      `;
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
displayForecast();
