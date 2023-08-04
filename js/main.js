var theWeatherDiv=document.querySelector(".theWeatherDiv");
var findInput=document.querySelector(".findInput");
var findButton=document.querySelector('.findButton');
var title=document.querySelector(".title")
var forcastDay1=document.querySelector(".forcastDay1")
var forecastTitle1=document.querySelector(".forecastTitle1")

var forcastDay2=document.querySelector(".forcastDay2")
var forecastTitle2=document.querySelector(".forecastTitle2")
var date=new Date();

daysArr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
monthsArr=["January","February","March","April","May","June","July","August","September","October","November","December"]
var apiResponse;
var result;


async function getDegrees(country){
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5dcb8da7cc7f4156ad1205355233107&q=${country}&days=3`)
    result = await apiResponse.json();
    getTheCurrentDegree();
    getTheForcastedDegrees();
}

getDegrees("cairo");

function getTheCurrentDegree(){
    title.innerHTML=`<p>${daysArr[date.getDay()]}</p>
    <p>${date.getDate()}-${monthsArr[ date.getMonth()]}</p>`
    theWeatherDiv.innerHTML=`
    <p>${result.location.name}</p>
    <div class="d-flex align-items-center justify-content-between">
        <p class="text-white display-1 fw-bold">${result.current.temp_c}&deg;C</p>
        <img src="${result.current.condition.icon}" class=" w-25 me-5" alt="">
    </div>
    <p class="text-primary">${result.current.condition.text}</p>
    <div class="theIcon d-flex align-items-center">
    <i class="fa-solid fa-umbrella pe-2"></i>
    <p class="pe-4 m-0">20%</p>
    <i class="fa-solid fa-wind pe-2"></i>
    <p class="pe-4 m-0">${result.current.wind_kph}km/h</p>
    <i class="fa-solid fa-compass pe-2"></i>
    <p class="pe-4 m-0">east</p>
    </div>`
}

function getTheForcastedDegrees(){
    forecastTitle1.innerHTML=`<p>${daysArr[date.getDay()+1]}</p>`
    forcastDay1.innerHTML=`
    <img src="${result.forecast.forecastday[1].day.condition.icon}" class=" w-25" alt="">
    <p class="text-white h4 fw-bold">${result.forecast.forecastday[1].day.maxtemp_c}&deg;C</p>
    <p class="text-secondary">${result.forecast.forecastday[1].day.mintemp_c}&deg;</p>
    <p class="text-primary">${result.forecast.forecastday[1].day.condition.text}</p>`

    forecastTitle2.innerHTML=`<p>${daysArr[date.getDay()+2]}</p>`
    forcastDay2.innerHTML=`
    <img src="${result.forecast.forecastday[2].day.condition.icon}" class=" w-25" alt="">
    <p class="text-white h4 fw-bold">${result.forecast.forecastday[2].day.maxtemp_c}&deg;C</p>
    <p class="text-secondary">${result.forecast.forecastday[2].day.mintemp_c}&deg;</p>
    <p class="text-primary">${result.forecast.forecastday[2].day.condition.text}</p>`
}

findInput.addEventListener("keyup",function(){
    getDegrees(findInput.value);
})
