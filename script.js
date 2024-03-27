function getWeather() {
    const apiKey = "e5a1db222ab651d0a6afc1a810803718";
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Enter a valid city");
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl).then((response) => response.json())
                            .then((data) => {
                                displayWeather(data);
                            })
                            .catch((error) => {
                                console.error("Error getting weather data", error);
                                alert("Error getting weather data, try again later.");
                            }); 
                            
    fetch(forecastUrl).then((response) => response.json())
                        .then((data) => {
                            displayHourlyForecast(data.list);
                        })
                        .catch((err) => {
                            console.error("Error getting forecast data", err);
                            alert("Error getting forecast data, try again later.")
                        })
}

function displayWeather(data) {
    const tempDiv = document.getElementById("temp-div");
    const weatherInfoDiv = document.getElementById("weather-info");
    const weatherIcon = document.getElementById("weather-icon");
    const hourlyForecastDiv = document.getElementById("hourly-forecast");

    // Reset content
    tempDiv.innerHTML = "";
    weatherInfoDiv.innerHTML = "";
    hourlyForecastDiv.innerHTML = "";

    // check if data was retrieved. Get useful data from json if retrieved and handle error if not
    if (data.code = "404") {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}</p>`;
        const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        // put newly created elements in container divs
        tempDiv.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showIcon(); //call function to show Icon
    }
}

// function to show icon 
function showIcon() {
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.style.display = "block";
}