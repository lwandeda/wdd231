document.addEventListener("DOMContentLoaded", () => {
    // Set the current date and time
    const timestampField = document.getElementById("timestamp");

    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Open membership modals
    const modalButtons = document.querySelectorAll(".modal-button");

    modalButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modalId = button.dataset.modal;
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.showModal();
            }
        });
    });

    // Close membership modals
    const closeButtons = document.querySelectorAll(".close-modal");

    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");

            if (modal) {
                modal.close();
            }
        });
    });

    // Close modal when clicking outside the dialog
    const dialogs = document.querySelectorAll("dialog");

    dialogs.forEach((dialog) => {
        dialog.addEventListener("click", (event) => {
            const dialogDimensions = dialog.getBoundingClientRect();

            const clickedInside =
                event.clientX >= dialogDimensions.left &&
                event.clientX <= dialogDimensions.right &&
                event.clientY >= dialogDimensions.top &&
                event.clientY <= dialogDimensions.bottom;

            if (!clickedInside) {
                dialog.close();
            }
        });
    });
});
