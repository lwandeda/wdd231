// ========================================
// Qheberha Business Chamber
// Directory JavaScript
// ========================================


// Get the member container from the HTML
const memberContainer = document.querySelector("#member-container");


// Get the Grid and List buttons
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");


// Get the mobile menu button and navigation
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");


// ========================================
// FETCH MEMBER DATA
// ========================================

async function getMembers() {

    try {

        // Fetch the JSON file
        const response = await fetch("data/members.json");

        // Check if the request was successful
        if (!response.ok) {
            throw new Error("Could not load member data.");
        }

        // Convert the response into JavaScript data
        const data = await response.json();

        // Display the members
        displayMembers(data);

    } catch (error) {

        // Display an error message if something goes wrong
        memberContainer.innerHTML = `
            <p>Sorry, the member directory could not be loaded.</p>
        `;

        console.error(error);
    }
}


// ========================================
// DISPLAY MEMBERS
// ========================================

function displayMembers(members) {

    // Clear the container
    memberContainer.innerHTML = "";

    // Go through every member
    members.forEach((member) => {

        // Create an article element
        const card = document.createElement("article");

        // Give the article a class
        card.classList.add("member-card");

        // Convert membership number to a name
        let membershipLevel;

        if (member.membership === 3) {
            membershipLevel = "Gold";
        } else if (member.membership === 2) {
            membershipLevel = "Silver";
        } else {
            membershipLevel = "Member";
        }

        // Create the member card
        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy"
            >

            <div class="member-info">

                <h2>${member.name}</h2>

                <p>${member.address}</p>

                <p>${member.phone}</p>

                <p>Membership Level: ${membershipLevel}</p>

                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit Website
                </a>

            </div>
        `;

        // Add the card to the page
        memberContainer.appendChild(card);
    });
}


// ========================================
// GRID VIEW
// ========================================

gridButton.addEventListener("click", () => {

    memberContainer.classList.add("member-grid");

    memberContainer.classList.remove("member-list");

});


// ========================================
// LIST VIEW
// ========================================

listButton.addEventListener("click", () => {

    memberContainer.classList.add("member-list");

    memberContainer.classList.remove("member-grid");

});


// ========================================
// MOBILE NAVIGATION
// ========================================

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

});


// ========================================
// FOOTER COPYRIGHT YEAR
// ========================================

const currentYear = document.querySelector("#currentyear");

currentYear.textContent = new Date().getFullYear();


// ========================================
// LAST MODIFIED DATE
// ========================================

const lastModified = document.querySelector("#lastModified");

lastModified.textContent = `Last Modified: ${document.lastModified}`;


// ========================================
// START THE DIRECTORY
// ========================================

getMembers();