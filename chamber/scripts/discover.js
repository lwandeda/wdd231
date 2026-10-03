import { discoverItems } from "../data/discover.mjs";

const discoverGrid = document.querySelector("#discover-grid");
const visitorMessage = document.querySelector("#visitor-message");

function createDiscoverCard(item, index) {
    const card = document.createElement("article");

    card.classList.add("discover-card");
    card.classList.add(`card-${index + 1}`);

    card.innerHTML = `
        <h2>${item.name}</h2>

        <figure>
            <img
                src="images/${item.image}"
                alt="${item.alt}"
                width="300"
                height="200"
                loading="${index === 0 ? "eager" : "lazy"}"
            >
        </figure>

        <address>${item.address}</address>

        <p>${item.description}</p>

        <button type="button" class="learn-more">
            Learn More
        </button>
    `;

    return card;
}

function displayDiscoverItems() {
    discoverItems.forEach((item, index) => {
        const card = createDiscoverCard(item, index);
        discoverGrid.appendChild(card);
    });
}

function displayVisitMessage() {
    const currentVisit = Date.now();
    const lastVisit = localStorage.getItem("qheberhaLastVisit");

    if (!lastVisit) {
        visitorMessage.textContent =
            "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference = currentVisit - Number(lastVisit);

        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const daysBetweenVisits =
            Math.floor(timeDifference / millisecondsPerDay);

        if (timeDifference < millisecondsPerDay) {
            visitorMessage.textContent =
                "Back so soon! Awesome!";
        } else {
            const dayWord =
                daysBetweenVisits === 1 ? "day" : "days";

            visitorMessage.textContent =
                `You last visited ${daysBetweenVisits} ${dayWord} ago.`;
        }
    }

    localStorage.setItem("qheberhaLastVisit", currentVisit);
}

function setFooterInformation() {
    const currentYear = document.querySelector("#current-year");
    const lastModified = document.querySelector("#last-modified");

    currentYear.textContent = new Date().getFullYear();

    lastModified.textContent =
        `Last Modified: ${document.lastModified}`;
}

displayDiscoverItems();
displayVisitMessage();
setFooterInformation();