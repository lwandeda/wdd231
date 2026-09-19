/* =========================================
   W03 CHAMBER HOME PAGE
   ========================================= */


/* =========================================
   WEATHER
   ========================================= */

// Gqeberha coordinates
const latitude = -33.918;
const longitude = 25.570;

// OpenWeatherMap API key 
const apiKey = "49846c5bec2572c017a0d754323a4aee";


/* =========================================
   GET WEATHER
   ========================================= */

async function getWeather() {

    const currentWeatherURL =
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    const forecastURL =
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    try {

        const [currentResponse, forecastResponse] =
            await Promise.all([
                fetch(currentWeatherURL),
                fetch(forecastURL)
            ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Unable to retrieve weather data.");
        }

        const currentData =
            await currentResponse.json();

        const forecastData =
            await forecastResponse.json();

        displayCurrentWeather(currentData);

        displayForecast(forecastData);

    } catch (error) {

        console.error("Weather error:", error);

        document.querySelector("#current-temperature").textContent =
            "Weather unavailable.";

        document.querySelector("#weather-description").textContent =
            "Please try again later.";

        document.querySelector("#forecast-container").innerHTML =
            "<p>Forecast unavailable.</p>";
    }
}


/* =========================================
   CURRENT WEATHER
   ========================================= */

function displayCurrentWeather(data) {

    const temperature =
        Math.round(data.main.temp);

    const description =
        data.weather[0].description;

    document.querySelector("#current-temperature").textContent =
        `${temperature} °C`;

    document.querySelector("#weather-description").textContent =
        description;
}


/* =========================================
   THREE-DAY FORECAST
   ========================================= */

function displayForecast(data) {

    const forecastContainer =
        document.querySelector("#forecast-container");

    forecastContainer.innerHTML = "";

    const today = new Date();

    const forecastDays = [];

    data.list.forEach(item => {

        const date =
            new Date(item.dt * 1000);

        const dayKey =
            date.toLocaleDateString("en-ZA");

        // Skip today's date
        if (
            date.toDateString() !== today.toDateString()
            && !forecastDays.some(
                day => day.key === dayKey
            )
        ) {

            forecastDays.push({
                key: dayKey,
                date: date,
                temperature: item.main.temp
            });
        }
    });


    // Display the next three days
    forecastDays.slice(0, 3).forEach(day => {

        const article =
            document.createElement("article");

        article.classList.add("forecast-card");

        const dayName =
            day.date.toLocaleDateString("en-ZA", {
                weekday: "long"
            });

        const temperature =
            Math.round(day.temperature);

        article.innerHTML = `
            <h4>${dayName}</h4>

            <p class="forecast-temperature">
                ${temperature} °C
            </p>
        `;

        forecastContainer.appendChild(article);
    });
}


/* =========================================
   COMPANY SPOTLIGHTS
   ========================================= */

async function getSpotlights() {

    const spotlightContainer =
        document.querySelector("#spotlight-container");

    try {

        const response =
            await fetch("../data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members =
            await response.json();


        // Keep Gold and Silver members
        const qualifiedMembers =
            members.filter(member =>
                member.membership === 2 ||
                member.membership === 3
            );


        // Randomize members
        qualifiedMembers.sort(
            () => Math.random() - 0.5
        );


        // Select up to 3 members
        const selectedMembers =
            qualifiedMembers.slice(0, 3);


        // Clear loading message
        spotlightContainer.innerHTML = "";


        // Create spotlight cards
        selectedMembers.forEach(member => {

            const card =
                document.createElement("article");

            card.classList.add("spotlight-card");


            const membershipName =
                member.membership === 3
                    ? "Gold Member"
                    : "Silver Member";


            card.innerHTML = `
                <img
                    src="images/${member.image}"
                    alt="${member.name} logo"
                    loading="lazy"
                    width="120"
                    height="80"
                >

                <h3>${member.name}</h3>

                <p class="membership-level">
                    ${membershipName}
                </p>

                <p>
                    ${member.address}
                </p>

                <p>
                    ${member.phone}
                </p>

                <p>
                    <a
                        href="${member.website}"
                        target="_blank"
                        rel="noopener"
                    >
                        Visit Website
                    </a>
                </p>
            `;

            spotlightContainer.appendChild(card);
        });

    } catch (error) {

        console.error("Spotlight error:", error);

        spotlightContainer.innerHTML =
            "<p>Business spotlights are currently unavailable.</p>";
    }
}


/* =========================================
   START THE FUNCTIONS
   ========================================= */

getWeather();

getSpotlights();