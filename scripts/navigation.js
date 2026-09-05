const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
        menuButton.setAttribute("aria-label", "Close navigation menu");
        menuButton.textContent = "✕";
    } else {
        menuButton.setAttribute("aria-label", "Open navigation menu");
        menuButton.textContent = "☰";
    }
});