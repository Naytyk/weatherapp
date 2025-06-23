const apiKey = 'e498c68a8e6609745464138153ce8f7b';
const mockdata = {
    "coord": {
        "lon": 7.367,
        "lat": 45.133
    },
    "weather": [
        {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 284.2,
        "feels_like": 282.93,
        "temp_min": 283.06,
        "temp_max": 286.82,
        "pressure": 1021,
        "humidity": 60,
        "sea_level": 1021,
        "grnd_level": 910
    },
    "visibility": 10000,
    "wind": {
        "speed": 4.09,
        "deg": 121,
        "gust": 3.47
    },
    "rain": {
        "1h": 2.73
    },
    "clouds": {
        "all": 83
    },
    "dt": 1726660758,
    "sys": {
        "type": 1,
        "id": 6736,
        "country": "IT",
        "sunrise": 1726636384,
        "sunset": 1726680975
    },
    "timezone": 7200,
    "id": 3165523,
    "name": "Province of Turin",
    "cod": 200
}

function getWindDirection(degree) {
  const directions = ['Northwards', 'North Eastwards', 'Eastwards', 'South Eastwards', 'Southwards', 'South Westwards', 'Westward', 'North Westward'];
  const index = Math.round(degree / 45);
  return directions[index];
}



export function getWeather(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const imglink = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            const direction = getWindDirection(data.wind.deg);
            data.weather[0].icon = imglink;
            data.wind.deg = direction;
            return data;
        })
        .catch(error => {
            return mockdata;
        });
}


