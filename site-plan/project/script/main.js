
/* =========================================
   GQEBERHA FITNESS & WELLNESS CENTER
   Main JavaScript
   ========================================= */

// Select the navigation elements.
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

// Open or close the mobile navigation menu.
menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    // Keep the accessibility information updated.
    menuButton.setAttribute("aria-expanded", String(isOpen));

    // Update the button label for screen readers.
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    // Change the menu symbol.
    menuButton.textContent = isOpen ? "×" : "☰";
});

// Display the current year automatically in the footer.
const currentYear = document.querySelector("#current-year");

currentYear.textContent = new Date().getFullYear();
javascript
// Fitness program filtering
const programList = document.querySelector("#program-list");

if (programList) {
    const filterButtons = document.querySelectorAll(".filter-button");
    const programCards = document.querySelectorAll(".program-card");
    const programCount = document.querySelector("#program-count");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedCategory = button.dataset.filter;
            let visibleCount = 0;

            programCards.forEach((card) => {
                const matchesCategory =
                    selectedCategory === "all" ||
                    card.dataset.category === selectedCategory;

                card.hidden = !matchesCategory;

                if (matchesCategory) {
                    visibleCount++;
                }
            });

            filterButtons.forEach((filterButton) => {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

            programCount.textContent =
                `Showing ${visibleCount} ${
                    visibleCount === 1 ? "program" : "programs"
                }`;
        });
    });
}

// ==============================
// MEMBERSHIP PAGE INTERACTIVITY
// ==============================

// Store the available membership plans in an array of objects.
const membershipPlans = [
    {
        id: "basic",
        name: "Basic",
        monthlyPrice: 299
    },
    {
        id: "standard",
        name: "Standard",
        monthlyPrice: 499
    },
    {
        id: "premium",
        name: "Premium",
        monthlyPrice: 699
    }
];

// Find the membership page elements.
const membershipSelect = document.querySelector("#membership-plan");
const monthlyCost = document.querySelector("#monthly-cost");
const annualCost = document.querySelector("#annual-cost");
const membershipMessage = document.querySelector("#membership-message");
const membershipButtons = document.querySelectorAll(".membership-select");

// Only run this code on pages that contain the membership calculator.
if (membershipSelect && monthlyCost && annualCost && membershipMessage) {

    // Display money in South African rand.
    const formatRand = (amount) => {
        return `R${amount.toLocaleString("en-ZA")}`;
    };

    // Find a plan, update the calculator, and save the selection.
    const updateMembership = (planId, saveSelection = true) => {

        // Find the selected plan in the array.
        const selectedPlan = membershipPlans.find((plan) => {
            return plan.id === planId;
        });

        // Stop if the requested plan does not exist.
        if (!selectedPlan) {
            return;
        }

        // Calculate the estimated cost for twelve months.
        const yearlyCost = selectedPlan.monthlyPrice * 12;

        // Update the page using the selected plan's information.
        membershipSelect.value = selectedPlan.id;
        monthlyCost.textContent = formatRand(selectedPlan.monthlyPrice);
        annualCost.textContent = formatRand(yearlyCost);

        membershipMessage.textContent =
            `You have selected the ${selectedPlan.name} membership.`;

        // Save the selected plan in the browser.
        if (saveSelection) {
            try {
                localStorage.setItem("selectedMembership", selectedPlan.id);
            } catch (error) {
                console.warn("Your membership selection could not be saved.");
            }
        }

        // Update the membership buttons.
        membershipButtons.forEach((button) => {
            const isSelected = button.dataset.plan === selectedPlan.id;

            button.classList.toggle("active", isSelected);
            button.setAttribute("aria-pressed", String(isSelected));
        });
    };

    // When a visitor changes the dropdown, update the calculator.
    membershipSelect.addEventListener("change", () => {
        updateMembership(membershipSelect.value);
    });

    // When a visitor clicks a membership card button, select that plan.
    membershipButtons.forEach((button) => {
        button.addEventListener("click", () => {
            updateMembership(button.dataset.plan);

            // Move the visitor to the calculator to see the updated cost.
            membershipSelect.focus();
            document.querySelector(".membership-calculator").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    // Restore the visitor's previous selection when possible.
    try {
        const savedPlan = localStorage.getItem("selectedMembership");

        const validSavedPlan = membershipPlans.some((plan) => {
            return plan.id === savedPlan;
        });

        if (validSavedPlan) {
            updateMembership(savedPlan, false);
        } else {
            updateMembership("basic", false);
        }
    } catch (error) {
        updateMembership("basic", false);
    }
}

// ==============================
// CONTACT FORM INTERACTIVITY
// ==============================

const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");

// Only run this code when the contact form exists on the page.
if (contactForm && formFeedback) {

    // Listen for the visitor submitting the form.
    contactForm.addEventListener("submit", (event) => {

        // Stop the browser from reloading the page.
        event.preventDefault();

        // Check whether the form passes browser validation.
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Collect the information entered by the visitor.
        const formData = new FormData(contactForm);

        const submission = {
            fullName: formData.get("fullName").trim(),
            email: formData.get("email").trim(),
            phone: formData.get("phone").trim(),
            enquiryType: formData.get("enquiryType"),
            message: formData.get("message").trim(),
            submittedAt: new Date().toISOString()
        };

        // Check that the required text fields contain enough characters.
        if (
            submission.fullName.length < 2 ||
            submission.message.length < 10
        ) {
            formFeedback.textContent =
                "Please enter your name and a message with at least 10 characters.";
            return;
        }

        // Try to save the demonstration submission in this browser.
        try {
            const savedSubmissions = JSON.parse(
                localStorage.getItem("contactSubmissions") || "[]"
            );

            // Make sure the saved data is an array before adding to it.
            if (!Array.isArray(savedSubmissions)) {
                throw new Error("Saved submissions are not in the expected format.");
            }

            savedSubmissions.push(submission);

            localStorage.setItem(
                "contactSubmissions",
                JSON.stringify(savedSubmissions)
            );

            // Show a confirmation message on the page.
            formFeedback.textContent =
                `Thank you, ${submission.fullName}! Your demonstration enquiry has been saved in this browser. No email was sent.`;

            // Clear the form after successful local storage.
            contactForm.reset();

        } catch (error) {
            // Explain what happened if browser storage is unavailable.
            formFeedback.textContent =
                "Your form is valid, but this browser could not save the demonstration enquiry. No email was sent.";

            console.error("Could not save the contact submission:", error);
        }
    });
}
