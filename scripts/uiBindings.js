export function toggleTextBox(show) {
    const textBox = document.querySelector('.text-box');
    const navContainer = document.querySelector('.nav-container');
    if (show) {
        textBox.classList.remove('hide');
        textBox.style.display = '';       // ← removes inline override
        textBox.style.zIndex = '';
        textBox.style.pointerEvents = '';
        navContainer.style.position = 'fixed';
    } else {
        textBox.classList.add('hide');
        textBox.style.display = 'none';
        textBox.style.pointerEvents = 'none';
        textBox.style.zIndex = '-1';
        navContainer.style.position = 'static'; 
    }
}

export function setupBackButtons(goBack) {
    const backButtons = document.querySelectorAll(".back-btn");
    backButtons.forEach(btn => {
        btn.addEventListener("click", goBack);
    });
}

export function setupNavBackButtons(goBack) {
    const backButtonsNav = document.querySelectorAll(".back-button-nav");
    // const textBox = document.querySelector(".text-box");

    backButtonsNav.forEach(btn => {
        btn.addEventListener("click", () => {
            goBack();
            toggleTextBox(true);
            // textBox.classList.remove('hide');
        });
    });
}