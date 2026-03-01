const API_KEY = "0568748bef6dd37ca32238a6ff37ddac"; // OpenWeatherMap API Key

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const historyBox = document.getElementById("history");
const logBox = document.getElementById("logBox");

/* ---------- Logger ---------- */
function log(message) {
    console.log(message);
    logBox.textContent += message + "\n";
}

/* ---------- Local Storage ---------- */
function saveCity(city) {
    let cities = JSON.parse(localStorage.getItem("cities")) || [];

    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities));
    }
    loadHistory();
}

function loadHistory() {
    historyBox.innerHTML = "";
    const cities = JSON.parse(localStorage.getItem("cities")) || [];

    cities.forEach(city => {
        const btn = document.createElement("button");
        btn.textContent = city;
        btn.onclick = () => fetchWeather(city);
        historyBox.appendChild(btn);
    });
}

/* ---------- Fetch Weather (async/await) ---------- */
async function fetchWeather(city) {
    log("Function start");
    log("Before fetch()");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        log("Fetch resolved");

        if (!response.ok) {
            throw new Error("Invalid city or API error");
        }

        const data = await response.json();
        displayWeather(data);
        saveCity(city);

    } catch (error) {
        weatherResult.innerHTML = `<p style="color:#ff4444;">${error.message}</p>`;
        log("Error caught: " + error.message);
    }

    log("Function end");
}

/* ---------- Display Weather ---------- */
function displayWeather(data) {
    weatherResult.innerHTML = `
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Condition:</strong> ${data.weather[0].main}</p>
    `;
}

/* ---------- Events & Promise Demo ---------- */
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    Promise.resolve("Promise started")
        .then(msg => log(msg))
        .then(() => fetchWeather(city))
        .catch(err => log(err));
});

/* ---------- Init ---------- */
loadHistory();
