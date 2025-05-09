const contactModal = document.getElementById("contact-mdl");
const contactOpenBtn = document.getElementById("contact-open-btn");
const contactCloseBtn = document.getElementById("contact-close-btn");

// --- Contact Me Modal ---
const contactNav = document.getElementById("contact-nav-cont");

contactOpenBtn.addEventListener("click", () => {
    contactModal.classList.remove("hidden");
    contactNav.classList.add("animate");
});
contactCloseBtn.addEventListener("click", () => {
    contactModal.classList.add("hidden");
    contactNav.classList.remove("animate");
});