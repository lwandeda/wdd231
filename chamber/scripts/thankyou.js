/* =========================================
QHEBERHA BUSINESS CHAMBER
THANK YOU PAGE
========================================= */

const params = new URLSearchParams(window.location.search);

/* Get the information from the submitted form */

const firstName = params.get("firstName");
const lastName = params.get("lastName");
const email = params.get("email");
const phone = params.get("phone");
const organization = params.get("organization");
const timestamp = params.get("timestamp");

/* Display the information on the page */

document.querySelector("#display-first-name").textContent =
firstName || "Not provided";

document.querySelector("#display-last-name").textContent =
lastName || "Not provided";

document.querySelector("#display-email").textContent =
email || "Not provided";

document.querySelector("#display-phone").textContent =
phone || "Not provided";

document.querySelector("#display-organization").textContent =
organization || "Not provided";

/* Display the timestamp */

if (timestamp) {

```
const date = new Date(timestamp);

if (!Number.isNaN(date.getTime())) {

    document.querySelector("#display-timestamp").textContent =
        date.toLocaleString("en-ZA", {
            dateStyle: "full",
            timeStyle: "short"
        });

} else {

    document.querySelector("#display-timestamp").textContent =
        timestamp;

}
```

} else {

```
document.querySelector("#display-timestamp").textContent =
    "Not available";
```

}

