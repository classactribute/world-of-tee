export function setupBackButtons(goBack) {
    const backButtons = document.querySelectorAll(".back-btn");
    backButtons.forEach(btn => {
        btn.addEventListener("click", goBack);
    });
}

export function setupNavBackButtons(goBack) {
    const backButtonsNav = document.querySelectorAll(".back-button-nav");
    const textBox = document.querySelector(".text-box");

    backButtonsNav.forEach(btn => {
        btn.addEventListener("click", () => {
            goBack();
            textBox.style.display = "flex";
        });
    });
}