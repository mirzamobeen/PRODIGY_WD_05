let currentCity = "Islamabad";  // Set the default city to Islamabad
let units = "metric";

let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let weather__forecast = document.querySelector(".weather__forecast");
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon = document.querySelector(".weather__icon");
let weather__minmax = document.querySelector(".weather__minmax");
let weather__realfeel = document.querySelector(".weather__realfeel");
let weather__humidity = document.querySelector(".weather__humidity");
let weather__wind = document.querySelector(".weather__wind");
let weather__pressure = document.querySelector(".weather__pressure");
let weather__search = document.querySelector(".weather__search");

weather__search.addEventListener("submit", (e) => {
  let search = document.querySelector(".weather__searchform");
  e.preventDefault();
  currentCity = search.value;
  getWeather();
  search.value = "";
});

document.querySelector(".unit__celsisus").addEventListener("click", () => {
  if (units !== "metric") {
    units = "metric";
    getWeather();
  }
});

document.querySelector(".unit__fharenheit").addEventListener("click", () => {
  if (units !== "imperial") {
    units = "imperial";
    getWeather();
  }
});

function convertCountryCode(country) {
  let regionName = new Intl.DisplayNames(["en"], { type: "region" });
  return regionName.of(country);
}

function convertTimestamp(timestamp, timezone) {
  const convertTimeZone = timezone / 3600;
  const date = new Date(timestamp * 1000);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: `Etc/GMT${convertTimeZone >= 0 ? "-" : "+"}${Math.abs(convertTimeZone)}`,
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

function getWeather() {
  const API_KEY = "dc3977d5a4b18e24a322df78d10a1fb1";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=${units}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
      weather__forecast.innerHTML = `<p>${data.weather[0].main}</p>`;
      weather__temperature.innerHTML = `${Math.round(data.main.temp)}&deg;`;
      weather__icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="${data.weather[0].description}" />`;
      weather__minmax.innerHTML = `<p>Min: ${Math.round(data.main.temp_min)}&deg;</p><p>Max: ${Math.round(data.main.temp_max)}&deg;</p>`;
      weather__realfeel.innerHTML = `${Math.round(data.main.feels_like)}&deg;`;
      weather__humidity.innerHTML = `${data.main.humidity}%`;
      weather__wind.innerHTML = `${Math.round(data.wind.speed * 3.6)} km/h`;
      weather__pressure.innerHTML = `${data.main.pressure} hPa`;
      datetime.innerHTML = convertTimestamp(data.dt, data.timezone);
    })
    .catch((error) => {
      console.error("Error fetching the weather data", error);
    });
}

getWeather();  // Initialize with default city as Islamabad
