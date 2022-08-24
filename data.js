const feelsLikeText = document.getElementById("feelsLikeText");
const tempHighText = document.getElementById("tempHighText");
const tempLowText = document.getElementById("tempLowText");
const userSearch = document.getElementById("userSearch");
const flexSwitchCheckDefault = document.getElementById(
  "flexSwitchCheckDefault"
);
const rightCityText = document.getElementById("rightCityText");
const rightDegreeText = document.getElementById("rightDegreeText");
const flexSwitchText = document.getElementById("flexSwitchText");
const weatherImageMobile = document.getElementById("weatherImageMobile");
const rightWeatherDescription = document.getElementById(
  "rightWeatherDescription"
);
const loaderContainer = document.getElementById("loaderContainer");
const body = document.body;

let date = new Date();

if (date.getHours() > 20 || date.getHours() < 6) {
  body.style.backgroundImage = `url('images/night-background.jpeg')`;
} else {
  body.style.backgroundImage = `url('images/rain3.jpeg')`;
}

window.addEventListener("load", () => {
  loaderContainer.style.visibility = "hidden";
});

function setLoading(isLoading) {
  if (!isLoading) {
    loaderContainer.style.visibility = "hidden";
  } else {
    loaderContainer.style.visibility = "visible";
  }
}

function getCurrentWeather() {
  setLoading(true);
  // Weather API Key
  const apiKey = "80c1cdf387885114b37924a1b27b799a";

  // Weather API URL
  const url1 = `https://api.openweathermap.org/data/2.5/weather?zip=${userSearch.value},us&appid=${apiKey}&units=imperial`;

  fetch(url1)
    .then((res) => res.json())
    .then((data) => {
      flexSwitchCheckDefault.addEventListener("click", () => {
        if (!flexSwitchCheckDefault.checked) {
          flexSwitchText.textContent = "Celsius";
          rightDegreeText.textContent = `${Math.floor(
            ((Math.round(data.main.temp) - 32) * 5) / 9
          )}`;
        } else {
          flexSwitchText.textContent = "Fahrenhiet";
          rightDegreeText.textContent = `${Math.round(data.main.temp)}`;
        }
      });

      try {
        if (userSearch.value) {
          const weatherUrlImage = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

          tempHighText.textContent = Math.round(data.main.temp_max);
          tempLowText.textContent = Math.round(data.main.temp_min);
          feelsLikeText.textContent = Math.round(data.main.feels_like);

          // Mobile Version
          rightDegreeText.textContent = Math.round(data.main.temp);
          rightCityText.textContent = data.name;
          weatherImageMobile.setAttribute("src", weatherUrlImage);
          rightWeatherDescription.textContent = data.weather[0].description;
        } else {
          alert(`Please enter in the correct value.`);
        }
      } catch (error) {
        userSearch.value = "";
      }

      if (
        data.weather[0].description == "rain" ||
        data.weather[0].description == "mist" ||
        data.weather[0].description == "heavy rain" ||
        data.weather[0].description == "light rain" ||
        data.weather[0].description == "shower rain"
      ) {
        body.style.backgroundImage = `url('images/rain3.jpeg')`;
        
      } else if (data.weather[0].description == "clear sky") {
        body.style.backgroundImage = `url('images/clearsky1.jpeg')`;
      } else if (
        data.weather[0].description == "cloudy" ||
        data.weather[0].description == "few clouds" ||
        data.weather[0].description == "scattered clouds" ||
        data.weather[0].description == "broken clouds"
      ) {
        body.style.backgroundImage = `url('images/cloudy.jpeg')`;
      }
    })
    .catch(() => console.log("Something went wrong, try again!"));

  if (loaderContainer.style.visibility == "visible") {
    setInterval(() => {
      setLoading(false);
    }, 1000);
  } else {
    setLoading(true);
  }
}

export default getCurrentWeather;
