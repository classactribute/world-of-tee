import { bookPages } from "./gameTexts.js";

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

let currentPage = 0;

export function updateBookPages() {
    const leftPage = document.querySelector('.left-page');
    const rightPage = document.querySelector('.right-page');
    const nextBtn = document.getElementById('next-page-bk-btn');
    const backBtn = document.getElementById('back-page-bk-btn');
  
    // Guard: don't go out of bounds
    if (currentPage < 0) currentPage = 0;
    if (currentPage >= bookPages.length) currentPage = bookPages.length - 1;
  
    // Update the content
    leftPage.innerHTML = bookPages[currentPage].left;
    rightPage.innerHTML = bookPages[currentPage].right;
  
    // Show/hide Next button
    if (currentPage >= bookPages.length - 1) {
      nextBtn.style.display = 'none';
    } else {
      nextBtn.style.display = 'inline-block';
    }
  
    // Show/hide Back button
    if (currentPage <= 0) {
      backBtn.style.display = 'none';
    } else {
      backBtn.style.display = 'inline-block';
    }
  
    console.log("Page:", currentPage);
  }

document.getElementById('next-page-bk-btn').addEventListener('click', () => {
    currentPage++;
    updateBookPages();
});

document.getElementById('back-page-bk-btn').addEventListener('click', () => {
    currentPage--;
    updateBookPages();
});