window.addEventListener('load', () => {
    let long;
    let lat;
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description')
    let degreeSection = document.querySelector('.degree-section');
    let unitSpan = document.querySelector('.unit');
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=[INSERT YOUR KEY HERE]`

            fetch(api).then(response =>{
                return response.json();
            }).then(data =>{
                console.log(data);
                const {temp, conditions, icon} = data.currentConditions;
                locationTimezone.textContent = data.timezone;
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = conditions;
                 let tempC = Math.floor((temp-32)*5/9);

                setIcons(icon, document.querySelector(".icon"));

                degreeSection.addEventListener('click', () => {
                    if(unitSpan.textContent === "F"){
                       unitSpan.textContent = "C";
                       temperatureDegree.textContent = tempC;
                    } else {
                       unitSpan.textContent = "F";
                       temperatureDegree.textContent = temp;
                    }
               })

            })

            
        })
    } 
    
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]); 
    }
})

