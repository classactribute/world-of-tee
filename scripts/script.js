import { clearHUDThemes, updateHUDTheme } from './themeManager.js';
import { storyTexts, titles  } from './gameTexts.js';
import { getTerritoryDirections, getDirection, locations, modalContent } from './gameData.js';
import { addInventoryItem, setupInitialInventory } from './inventory.js';
import { playerInventory, modalInventories } from './inventoryData.js';
import { navigateToTerritory, setupCloseMapListeners, setupZoomMapListener, setupModalListeners, state } from './territoryNavigator.js';

// --- DOM ELEMENTS ---
const mapContainer = document.querySelector(".map-container");
const mainButtons = document.querySelector(".main-buttons");
const optionButtons = document.querySelectorAll(".option-button");
const skipButton = document.getElementById("skip-button");
const moreButton = document.getElementById("more-button");
const openMapButton = document.getElementById("open-button");
const skipAllBtn = document.getElementById("skip-all-button");
const backButtons = document.querySelectorAll(".back-btn");
const backButtonsNav = document.querySelectorAll(".back-button-nav");
const navText = document.querySelector(".text-nav");
const allSubNavs = document.querySelectorAll(`.subsection-textbox`);
const textBox = document.querySelector(".text-box");
const minimap = document.querySelector(".minimap-box");
const northButtons = document.querySelector(".north-buttons");
const eastButtons = document.querySelector(".east-buttons");
const southButtons = document.querySelector(".south-buttons");
const westButtons = document.querySelector(".west-buttons");
const invModal = document.getElementById("inv-modal");
const invOpenBtn = document.getElementById("inv-button");
const invCloseSpan = document.querySelector(".inv-close-btn");
const inventoryContainer = document.querySelector(".inv-modal-box-container");
const inventoryContainerModals = document.querySelectorAll(".modal-inv-info");

console.log("current location: ", state.currentLocation);

// --- Back Button Handler ---
backButtons.forEach(btn => {
    btn.addEventListener("click", goBack);
});

backButtonsNav.forEach(btn => {
    btn.addEventListener("click", () => {
        goBack();
        textBox.style.display = "flex";
    });
});

// --- INITIAL UI STATE ---
// Hide buttons and sections that shouldn't be visible at page load
mainButtons.style.display = "none";
moreButton.style.visibility = "hidden";
openMapButton.style.visibility = "hidden";
northButtons.style.display = "none";
eastButtons.style.display = "none";
southButtons.style.display = "none";
westButtons.style.display = "none";

// state.currentLocation = location;
let intervalId;

// --- STARTUP TEXT ANIMATION ---
animateText(storyTexts[state.currentLocation]);
// animateSectionText(storyTexts[state.currentLocation], location);
getTerritoryDirections.forEach(setupTerritoryListeners);
getTerritoryDirections.forEach(setupTabs);

setupCloseMapListeners();
setupZoomMapListener();
setupInitialInventory(inventoryContainer, inventoryContainerModals);
setupModalListeners();

// Typewriter effect for navText
export function animateText(text) {
    const direction = getDirection[state.currentLocation];
    const currentSubNav = document.querySelector(`.${direction}-subsection-textbox`);
    const textLength = text.length;

    allSubNavs.forEach(el => el.textContent = "");
    navText.textContent = "";

    let i = 0;
    clearInterval(intervalId);

    if (!intervalId) {
        intervalId = setInterval(() => {
            if ( i === textLength ) {
              clearInterval(intervalId);
              onTypingComplete();
            } else {
              navText.textContent += text[i];
              if (currentSubNav) currentSubNav.textContent += text[i];
              i++;
            }  
        }, 20)
    }
}

// --- HANDLE POST-TYPING UI STATE ---
function onTypingComplete() {
    if (state.currentLocation === "start") {
        openMapButton.style.visibility = "visible";
    } else if (state.currentLocation === "world1") {
        moreButton.style.visibility = "visible";
    } else if (state.currentLocation === "world2") {
        mainButtons.style.display = "flex";
    } 
}

// --- SKIP ANIMATION BUTTONS ---
function skipAnimation() {
    clearInterval(intervalId);
    intervalId = null;
    navText.textContent = storyTexts[state.currentLocation];
    onTypingComplete();
}

skipButton.addEventListener("click", skipAnimation);
skipAllBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;
    setScene("world1");
    setScene("world2");
    skipAnimation();
    skipAllBtn.style.display = "none";
});

// --- SCENE MANAGER ---
// Updates text, UI visibility, and HUD logic based on location
export function setScene(location) {
    skipAnimation();
    state.currentLocation = location;
    navText.textContent = "";

    if (state.currentLocation === "world1") {
        openMapButton.style.visibility = "hidden";
        mapContainer.style.visibility = "visible";
    } else if (state.currentLocation === "world2") {
        moreButton.style.visibility = "hidden";
    }  else if (["north", "east", "south", "west"].includes(state.currentLocation)) {
        navigateToTerritory(state.currentLocation);
    }
    animateText(storyTexts[state.currentLocation]);
}

// --- SUBSECTION DISPLAY HANDLER ---
function showSubsection(location) {
    state.currentLocation = location;
    const subsection = document.getElementById(`${state.currentLocation}-subsection`);
    const allSubsections = document.getElementsByClassName("subsection");
    for (let i = 0; i < allSubsections.length; i++) {
        allSubsections[i].classList.add("hidden");
    }
    subsection.classList.remove("hidden");
    textBox.style.display = "none";
}

// --- MAP ENTRY ---
openMapButton.addEventListener("click", () => setScene("world1"));
moreButton.addEventListener("click", () => setScene("world2"));

// --- MAP NAVIGATION BUTTONS (territory selection) ---
optionButtons.forEach(optionButton => {
    optionButton.addEventListener("click", (e)=> {
        const location = locations[e.target.id];
        if (location) {
            setScene(location);
        }
    });
});

// --- TERRITORY LAND CLICK SETUP ---
function setupTerritoryListeners(direction) {
    const territoryBtns = document.querySelectorAll(`.${direction}-buttons`);
    const mapCont = document.querySelector(`.${direction}-map-container`);
    const body = document.querySelector(`.${direction}-body`);

    territoryBtns.forEach(territoryBtn => {
        territoryBtn.addEventListener("click", (e)=> {
            const location = locations[e.target.id];
            if (location) {
                setScene(location);
                showSubsection(location);
                mapCont.style.display = "none";
                minimap.style.display = "flex";
                body.style.display = "flex";
                const subNavBtn = document.querySelector(`.${location}-button-nav`);
                subNavBtn.click();
            }
        });
    });
}

// --- SETUP TERRITORY TABS --- 
function setupTabs(direction) {
    const subsectionNavBtns = document.querySelectorAll(`.${direction}-subsection-button`);
    const mapCont = document.querySelector(`.${direction}-map-container`);
    const body = document.querySelector(`.${direction}-body`);

    subsectionNavBtns.forEach(subsectionNavBtn => {
        subsectionNavBtn.addEventListener("click", (e)=> {
            const location = locations[e.target.id];
            const otherBtns = document.querySelectorAll(`.${direction}-subsection-button.active`);
            if (location) {
                setScene(location);
                showSubsection(location);
                mapCont.style.display = "none";
                minimap.style.display = "flex";
                body.style.display = "flex";
                otherBtns.forEach(otherBtn => {
                    otherBtn.classList.remove("active");
                });
                subsectionNavBtn.classList.add("active");
            }
        });
    });
}

// --- GO BACK TO MAIN MAP VIEW ---
function goBack() {
    clearHUDThemes();
    state.currentLocation = "world2";
    minimap.style.display = "none";
    mainButtons.style.display = "flex";
    northButtons.style.display = "none";
    eastButtons.style.display = "none";
    southButtons.style.display = "none";
    westButtons.style.display = "none";
    document.getElementById("main-map-container").style.display = "flex";
    document.getElementById("north-section").classList.add("hidden");
    document.getElementById("east-section").classList.add("hidden");
    document.getElementById("south-section").classList.add("hidden");
    document.getElementById("west-section").classList.add("hidden");

    const body = document.getElementsByTagName('body')[0];
    body.style.background = `linear-gradient(rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5)), url('assets/${state.currentLocation}-background.webp')`;
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundSize = "100% 100%";

    document.getElementById("section-name").innerHTML = titles[state.currentLocation];
    setScene("world2");
}

// --- Inventory Modal ---
invOpenBtn.addEventListener("click", () => invModal.classList.add("open"));
invCloseSpan.addEventListener("click", () => invModal.classList.remove("open"));

// --- KEYBOARD SUPPORT ---
document.querySelectorAll('[role="button"]').forEach(btn => {
    btn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        }
    })
});

console.log(state.currentLocation);

// --- CV SCROLL MODAL ---
const openCVBtn = document.getElementById("open-cv-btn");
const cvModal = document.getElementById("cv-scroll-modal");
const closeCVBtn = document.getElementById("close-cv-btn");

openCVBtn.addEventListener("click", () => {
  cvModal.classList.remove("hidden");
});

closeCVBtn.addEventListener("click", () => {
  cvModal.classList.add("hidden");
});