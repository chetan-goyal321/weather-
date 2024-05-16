function fetchWeatherData(city) {
    var apiKey = '97d12d665c631eb412e35f585cc9ca19';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data && data.name && data.sys && data.weather && data.main) {
                displayWeatherData(data);
            } else {
                displayErrorMessage('Invalid data received from weather API');
            }
        })
        .catch(function(error) {
            displayErrorMessage('Failed to fetch weather data');
        });
}

function displayWeatherData(data) {
    var weatherInfo = document.getElementById('weather-info');
    weatherInfo.style.display = 'block';
    weatherInfo.innerHTML = '<h2>' + data.name + ', ' + data.sys.country + '</h2>' +
                            '<p>Weather: ' + data.weather[0].main + '</p>' +
                            '<p>Temperature: ' + convertKelvinToCelsius(data.main.temp) + '°C</p>' +
                            '<p>Humidity: ' + data.main.humidity + '%</p>';
}

function displayErrorMessage(message) {
    var weatherInfo = document.getElementById('weather-info');
    weatherInfo.style.display = 'block';
    weatherInfo.innerHTML = '<p>' + message + '</p>';
}

function convertKelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}

function handleSearch() {
    var cityInput = document.getElementById('city-input').value;
    if (cityInput) {
        fetchWeatherData(cityInput);
    } else {
        displayErrorMessage('Please enter a city name');
    }
}