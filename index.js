import userLocations from "./selectedAreas.js";
import getCurrentWeather from "./data.js";
import SelectedAreas from "./selectedAreas.js";


const searchBtn = document.getElementById("searchBtn");
const userSearch = document.getElementById("userSearch");
const saveBtn = document.getElementById('saveBtn')
const savedItemsContainer =  document.getElementById("savedItemsContainer");
const rightWeatherDate = document.getElementById('rightWeatherDate')


 rightWeatherDate.textContent = new Date().toDateString();

searchBtn.addEventListener('click', getCurrentWeather);

saveBtn.addEventListener('click', saveLocation);


let userSavedLocations = new SelectedAreas();

function saveLocation(){

  if(!userSearch.value){
    alert("Please enter in a value")
  }else{
    let date = new Date();
    const div1 = document.createElement('div');

    div1.className = "savedItem";
    const div2 = document.createElement('div');

    div2.className = "s_location_time"
    const p = document.createElement('p');

    const time = document.createElement('p');
    time.className = "timeStamp";

    const button = document.createElement('button');

    const  i = document.createElement('i');
    i.className = "fa fa-trash";
  
    p.textContent = userSearch.value;
    p.setAttribute('data-id' , userSearch.value);
    time.textContent = `Last Updated: ${date.toLocaleTimeString()}`;
    button.className = "btn btn-danger";
    button.appendChild(i);
  
    savedItemsContainer.append(div1);
    div1.append(div2 , button);
    div2.append(p,time);

    userSavedLocations.addLocation(userSearch.value)

    div2.addEventListener('click', () =>{
      userSearch.value = p.dataset.id
    })

    button.addEventListener('click' , () =>{
      userSavedLocations.removeLocation(p.dataset.id)
      div1.remove();
      

    })

  }
  userSearch.value = "";

}

