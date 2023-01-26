window.addEventListener('load', () => {
    let long;
    let lat;
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description')
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
         
            const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=SVTAPZRTXMZP8X5A53CVQT2A6`

            fetch(api).then(response =>{
                return response.json();
            }).then(data =>{
                console.log(data);
                const {temp, conditions} = data.currentConditions;
                locationTimezone.textContent = data.timezone;
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = conditions;
            })
        })
    } else {
        h1.textContent = "NOT WORKING";
    }
    
})

