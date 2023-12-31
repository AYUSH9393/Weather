const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "55693a94c2e79dff59cbf11e012fc4b0";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError("Could not fetch weather data");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

    card.innerHTML = ""; // Use innerHTML instead of textContent
    card.style.display = "flex";

    const elements = [
        createWeatherElement("h1", city, "cityDisplay"),
        createWeatherElement("p", `${convertToFahrenheit(temp)}°F`, "tempDisplay"),
        createWeatherElement("p", `Humidity: ${humidity}%`, "humidityDisplay"),
        createWeatherElement("p", description, "descDisplay"),
        createWeatherElement("p", getWeatherEmoji(id), "weatherEmoji")
    ];

    elements.forEach(element => card.appendChild(element));
}

function createWeatherElement(elementType, text, className) {
    const element = document.createElement(elementType);
    element.textContent = text;
    element.classList.add(className);
    return element;
}

function convertToFahrenheit(celsius) {
    return ((celsius - 273.15) * (9 / 5) + 32).toFixed(1);
}

function getWeatherEmoji(weatherId) {
    // ... Same switch case as provided ...
}

function displayError(message) {
    const errorDisplay = createWeatherElement("p", message, "errorDisplay");
    card.innerHTML = ""; // Clear the card's content
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
