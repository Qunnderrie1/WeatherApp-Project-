

class SelectedAreas{
    constructor(savedLocations = []){
        this.savedLocations = savedLocations;
    }


    addLocation(userLocation){
        this.savedLocations.push(userLocation)
    }

    removeLocation(userLocation){
        let locationIndex = this.savedLocations.indexOf(userLocation)

       return this.savedLocations.splice(locationIndex , 1)

  
    }
}


export default  SelectedAreas;