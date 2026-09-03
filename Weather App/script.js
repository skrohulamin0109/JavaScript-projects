// const base_api_URL = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'
const api_URL = "https://api.openweathermap.org/data/2.5/weather?";
const api_KEY = "109cf467501c7b66945de152c1e0a5d3";

// making async function for weather data fetching and updating html dynamically
async function getWeatherData(city_name) {
  console.log(city_name)
    const response = await fetch(
        api_URL + `q=${city_name}` + `&appid=${api_KEY}`,
    );

    let data;
    if (response.status === 404) {
        alert("invalid city name.");
    } else {
        data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    }

    // updating right side weather data

    // updating temperature

    // converting kelving from json to celcius
    const kelvin = Number(data.main.temp);

    // Convert to Celsius and round the final result
    const celcius = kelvin - 273.15;
    document.querySelector(".leftTemp").innerHTML = `${celcius.toFixed(2)} °C`;
    // updating city name
    document.querySelector(".leftPlaceInfo h2").innerHTML = `${data.name}`;
    // updating date and time
    const timestamp = data.dt;
    const date = new Date(timestamp * 1000);

    const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "2-digit",
    };
    // Create formatter (using local timezone)
    const formatter = new Intl.DateTimeFormat("en-IN", options);
    const parts = formatter.formatToParts(date);
    // Map parts into a dictionary for easy access
    const p = Object.fromEntries(parts.map((dt) => [dt.type, dt.value]));

    // Construct the exact string format
    const formattedDate = `${p.hour}:${p.minute} - ${p.weekday}, ${p.day} ${p.month} ‘${p.year}`;

    document.querySelector(".leftPlaceInfo p").innerHTML = `${formattedDate}`;

    // updating the emoji for the weather

    console.log(data.weather[0].main);
    let weatherName = String(data.weather[0].main).toLowerCase();

    if (weatherName === "clouds") {
        document.querySelector(".leftWeatherIcon").innerHTML = "☁️";
        document.querySelector(".backgroudContainer").style.backgroundImage =
            "url('./images/backgroundImages/clouds.jpg')";
    } else if (weatherName === "clear") {
        document.querySelector(".leftWeatherIcon").innerHTML = "🌤️";
        document.querySelector(".backgroudContainer").style.backgroundImage =
            "url('./images/backgroundImages/clear.jpg')";
    } else if (weatherName === "atmosphere") {
        document.querySelector(".leftWeatherIcon").innerHTML = "🌥️";
        document.querySelector(".backgroudContainer").style.backgroundImage =
            "url('./images/backgroundImages/atmosphere.jpg')";
    } else if (weatherName === "snow") {
        document.querySelector(".leftWeatherIcon").innerHTML = "❄️";
        document.querySelector(".backgroudContainer").style.backgroundImage =
            "url('./images/backgroundImages/snow.jpg')";
    } else if (weatherName === "rain") {
        document.querySelector(".leftWeatherIcon").innerHTML = "☔";
        document.querySelector(".backgroudContainer").style.backgroundImage =
            "url('./images/backgroundImages/rain.jpg')";
    } else if (weatherName === "drizzle") {
        document.querySelector(".leftWeatherIcon").innerHTML = "💦";
        document.querySelector(".backgroudContainer").style.backgroundImage =
            "url('./images/backgroundImages/drizzle.jpg')";
    } else if (weatherName === "thunderstorm") {
        document.querySelector(".leftWeatherIcon").innerHTML = "⛈️";
        document.querySelector(".backgroudContainer").style.backgroundImage =
            "url('./images/backgroundImages/thunderstorm.jpg')";
    }

    // updating left side of the app
    document.querySelector(".rightWeatherData h2").innerHTML =
        `${data.weather[0].description}`;

    document.querySelector(".maxTemp .val").innerHTML =
        `${Number(data.main.temp_max - 273.15).toFixed(2)} °C`;

    document.querySelector(".minTemp .val").innerHTML =
        `${Number(data.main.temp_min - 273.15).toFixed(2)} °C`;

    document.querySelector(".humidity .val").innerHTML =
        `${Number(data.main.humidity)} %`;

    document.querySelector(".cloudy .val").innerHTML =
        `${Number(data.clouds.all)} %`;

    document.querySelector(".wind .val").innerHTML =
        `${Number(data.wind.speed)} m/s`;
}

const searchBox = document.querySelector(".searchBar input");
const searchBtn = document.querySelector(".searchBar button");


// Search button
searchBtn.addEventListener("click", async () => {
    let city = searchBox.value.trim().toLowerCase();

    if (!city) {
        city = await getCityByIP();
    }

    if (city) {
        console.log("City:", city);
        await getWeatherData(city);
    }
});


