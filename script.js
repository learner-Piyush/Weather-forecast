document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const weatherButton = document.getElementById("weather-button");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const minTemperatureDisplay = document.getElementById("min-temperature");
  const maxTemperatureDisplay = document.getElementById("max-temperature");
  const feelsLikeDisplay = document.getElementById("feels-like");
  const humidityDisplay = document.getElementById("humidity");
  const windDegreeDisplay = document.getElementById("wind-degree");
  const windSpeedDisplay = document.getElementById("wind-speed");
  const pressureDisplay = document.getElementById("pressure");
  const visiblityDisplay = document.getElementById("visiblity");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "13f0bc0f60ecb3f369c6fbabad383bc5";

  weatherButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
      return;
    }

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(typeof(response));
    console.log("RESPONSE", response);
    
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log(data)

    const { name, weather, main, wind } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;
    minTemperatureDisplay.textContent = `Min Temperature: ${main.temp_min}°C`;
    maxTemperatureDisplay.textContent = `Max Temperature: ${main.temp_max}°C`;
    feelsLikeDisplay.textContent = `Feels like: ${main.feels_like}°C`;
    humidityDisplay.textContent = `Humidity: ${main.humidity}%`;
    windDegreeDisplay.textContent = `Wind Degree: ${wind.deg}°`;
    const windSpeedKmh = (wind.speed * 3.6).toFixed(2);
    windSpeedDisplay.textContent = `Wind Speed: ${windSpeedKmh} km/h`;
    pressureDisplay.textContent = `Pressure: ${main.pressure} hPa`;
    const visibilityKm = (data.visibility / 1000).toFixed(2);
    visiblityDisplay.textContent = `Visibility: ${visibilityKm} km`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
