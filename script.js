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
                                throw new Error("Error getting weather data, try later.");
                            }); 
                            
    fetch(forecastUrl).then((response) => response.json())
                        .then((data) => {
                            displayForecast(data.list);
                        })
                        .catch((err) => {
                            console.error("Error getting forecast data", err);
                            throw new Error("Error getting forecast data, try later.")
                        })
}

