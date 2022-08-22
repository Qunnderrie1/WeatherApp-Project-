const windSpeedText = document.getElementById("windSpeedText");
const feelsLikeText = document.getElementById("feelsLikeText");
const tempHighText = document.getElementById("tempHighText");
const tempLowText = document.getElementById("tempLowText");
const humidityText = document.getElementById("humidityText");
const cityText = document.getElementById("cityText");
const degreeText = document.getElementById("degreeText");
const userSearch = document.getElementById("userSearch");
const  flexSwitchCheckDefault = document.getElementById('flexSwitchCheckDefault')
const rightCityText =  document.getElementById('rightCityText');
const rightDegreeText =  document.getElementById('rightCityText');
const flexSwitchText = document.getElementById('flexSwitchText');
const weatherUrlImage = document.getElementById('weatherUrlImage');
const weatherImage = document.getElementById('weatherImage');
const weatherImageMobile = document.getElementById('weatherImageMobile');
const rightWeatherContainer = document.getElementById('rightWeatherContainer')
const appContainer = document.getElementById('appContainer');
const weatherDescription = document.getElementById('weatherDescription');
const rightWeatherDescription = document.getElementById('rightWeatherDescription');
const loader = document.getElementById('loader');
const loaderContainer = document.getElementById('loaderContainer')
const body = document.body;

let date = new Date();

console.log(date.getHours())

loaderContainer.style.visibility = "hidden";

if(date.getHours() > 20 || date.getHours() < 6){
  body.style.backgroundImage = `url('images/night-background.jpeg')`
}else{
   body.style.backgroundImage = `url('images/backgroundImage.jpeg')`
}
console.log(date.getHours())

// body.style.backgroundImage = "url(./images/rain.jpeg)";

function getCurrentWeather(){
  
    // Weather API Key
    const apiKey = "80c1cdf387885114b37924a1b27b799a";
  
    
    // Weather API URL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${userSearch.value}&appid=${apiKey}&units=imperial`;
    const url1 = `https://api.openweathermap.org/data/2.5/weather?zip=${userSearch.value},us&appid=${apiKey}&units=imperial`;
    
  
    fetch(url1)
    .then((res) => res.json())
    .then((data) =>{
      flexSwitchCheckDefault.addEventListener('click', () =>{
        loaderContainer.style.visibility == "visible"
        if(!flexSwitchCheckDefault.checked){
          flexSwitchText.textContent = "Celsius"
          degreeText.textContent = `${Math.floor((Math.round(data.main.temp) - 32) * 5 / 9)}`;
          rightDegreeText.textContent = `${Math.floor((Math.round(data.main.temp) - 32) * 5 / 9)}`;
        }else{
          flexSwitchText.textContent = "Fahrenhiet"
          degreeText.textContent = `${Math.round(data.main.temp)}`;
          rightDegreeText.textContent = `${Math.round(data.main.temp)}`;
        }
      })


      try {

        if(!userSearch.value){
          alert("Please enter in a value.")
        }else{
    
          const weatherUrlImage = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          // Web Version 
          cityText.textContent = data.name
          degreeText.textContent = Math.round(data.main.temp)
          windSpeedText.textContent = `${data.wind.speed} m/h `;
          tempHighText.textContent =  Math.round(data.main.temp_max);
          tempLowText.textContent =  Math.round(data.main.temp_min);
          feelsLikeText.textContent =  Math.round(data.main.feels_like);
          humidityText.textContent =  Math.round(data.main.humidity);
          weatherImage.setAttribute('src', weatherUrlImage)
          weatherDescription.textContent = data.weather[0].description
  
          // Mobile Version
          rightDegreeText.textContent = Math.round(data.main.temp)
          rightCityText.textContent = data.name
          weatherImageMobile.setAttribute('src', weatherUrlImage)
          rightWeatherDescription.textContent = data.weather[0].description
        }
        
      } catch (error) {
        alert(`Please enter in the correct value.`)
        userSearch.value = "";
      }
      if(data.weather[0].description == "rain"){
        body.style.backgroundImage = `url('images/rain2.jpeg')`
      }else if (data.weather[0].description == "clear sky"){
        body.style.backgroundImage = `url('images/backgroundImage.jpeg')`
      }else if(data.weather[0].description == "cloudy"){
        body.style.backgroundImage = `url('images/cloudy.jpeg')`
      }
      
    }).catch(() => console.log("Something went wrong, try again!")) 
    if(loaderContainer.style.visibility == "visible"){
      loaderContainer.style.visibility == "hidden"
    }
  
  }
  console.log(  loaderContainer)

  export default getCurrentWeather;