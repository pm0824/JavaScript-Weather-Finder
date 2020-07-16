var input = document.querySelector('#cityname');
var button= document.querySelector('.submit');

var weather = {
     date : document.getElementById("date"),
     today : new Date(),
     city_text : document.getElementById("city_text"),
     temp_text:document.getElementById("temp_text"),
     temp_desc_text:document.getElementById("temp_desc_text"),
     icon:document.getElementById("icon"),
     unit:document.getElementById("unit"),
     temp_unit: "",
    
        //display weather data
     display_weather: function(city,country,temp,temp_desc,iconid){
        console.log(city,country,temp,temp_desc,iconid);
        this.date.textContent= this.today.getDate()+" - "+this.today.getMonth()+" - "+this.today.getFullYear();
        
        this.city_text.textContent = city + ", " + country;
        this.temp_text.textContent = Math.round(temp);
        this.unit.textContent='C';
        this.temp_unit='C';
        this.temp_desc_text.textContent= temp_desc;
        this.icon.src=`images/${iconid}.png`;
    },

    //toggle temperature between celcius and fahrenheit
    toggle_temperature: function(){
        var temp = this.temp_text.textContent;
        if(this.temp_unit=='C'){
            temp= parseInt(temp)*9/5 +32;
            this.temp_text.textContent = Math.round(temp);
            this.unit.textContent='F';
            this.temp_unit='F';
            console.log(this.temp_text.textContent);
        }
        else{
            temp= (parseInt(temp)-32)*5/9;
            this.temp_text.textContent = Math.round(temp);
            this.unit.textContent='C';
            this.temp_unit='C';
            console.log(this.temp_text.textContent);
        }
    }
};

// API KEY
var key = "b38fb1cc60358434046217d938003adf";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    console.log("Browser doesnt support");
}
function showError(error){
    console.log("Error",error);
}
// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

function getWeather(latitude, longitude){
    fetch(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`)
        .then(response => response.json())
        .then(function(data){
            console.log(data);
            var city= data.name;
            var country= data.sys.country;
            var temp=data.main.temp;
            var temp_desc=data.weather[0].description;
            var icon = data.weather[0].icon;
            weather.display_weather(city,country,temp,temp_desc,icon);
        })
        .catch(err => alert("Something Went Wrong..."));
}


//Get weather using city name entered by user
button.addEventListener('click', function(name){
fetch(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${key}`)
.then(response => response.json())
.then(data => {
    var city= data.name;
    var country= data.sys.country;
    var temp=data.main.temp;
    var temp_desc=data.weather[0].description;
    var icon = data.weather[0].icon;
    weather.display_weather(city,country,temp,temp_desc,icon);
    input.value="";
 console.log(data);
})

.catch(err => alert("Wrong city name!"));
})

//To toggle the temperature
var temperature = document.getElementById("temperature");
temperature.addEventListener('click',function(){
    console.log("toggle temp");
    weather.toggle_temperature();
})