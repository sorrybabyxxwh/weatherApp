// let cityName = prompt("Enter city:");
// cityName = cityName.toLowerCase();
// let cities = [
//     {
//         name: "kiev",
//         temperature: "11",
//         humidity: "12"
//     },
//     {
//         name: "lviv",
//         temperature: "13",
//         humidity: "22"
//     },
//     {
//         name: "oslo",
//         temperature: "12",
//         humidity: "70"
//     },
//     {
//         name: "paris",
//         temperature: "12",
//         humidity: "70"
//     }

// ]
// function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }

// if (cities.some(e => e.name === cityName)) {
//     let yourCity = cities.find(city => city.name == cityName);
//     let capitalized = capitalizeFirstLetter(yourCity.name);
//     alert(`It is currently ${yourCity.temperature}°C in ${capitalized} with a humidity of ${yourCity.humidity}%`)
//   }
// else {
//     alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${cityName}"`)
// }

function search (event){
    event.preventDefault();

    // let cityElement = document.querySelector("#current-city");
    // let cityInput = document.querySelector("#city-input");
    // cityElement.innerHTML = cityInput.value; 
    let city = document.querySelector("#city-input").value;
    let apiKey = '854e33f61b08418023d6baae98ed2380'
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(showTemperature);
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = city;
} 

function showTemperature(response) {
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.getElementById('temperature');
    temperatureElement.innerHTML = `${temperature}&#8451;`;
}

function displayCityName(response){
    let nameOfTheCurrentCity = response.data.city;
    let city = document.querySelector("#current-city");
    city.innerHTML = `${nameOfTheCurrentCity}`

}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let cityNameApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`
    let apiKey = '854e33f61b08418023d6baae98ed2380'
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
    axios.get(`${cityNameApiUrl}`).then(displayCityName);
  }

  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  let button = document.querySelector("#current-location-btn");
  button.addEventListener("click", getCurrentPosition);

  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search)
