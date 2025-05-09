import { clearHUDThemes, updateHUDTheme } from './themeManager.js';
import { storyTexts, titles  } from './gameTexts.js';
import { getTerritoryDirections, getDirection, locations, modalContent } from './gameData.js';
import { addInventoryItem, setupInitialInventory } from './inventory.js';
import { playerInventory, modalInventories } from './inventoryData.js';
import { navigateToTerritory, setupCloseMapListeners, setupZoomMapListener, setupModalListeners, goBack, skipAnimation, setScene, state } from './territoryNavigator.js';
import { setupBackButtons, setupNavBackButtons, toggleTextBox } from './uiBindings.js';
import { setupSkipButtons } from './animationControls.js';
import { getSceneContext } from './sceneUtils.js';
import { animateText } from './animations.js';

// --- DOM ELEMENTS ---
const mapContainer = document.querySelector(".map-container");
const mainButtons = document.querySelector(".main-buttons");
const optionButtons = document.querySelectorAll(".option-button");
const skipButton = document.getElementById("skip-button");
const moreButton = document.getElementById("more-button");
const openMapButton = document.getElementById("open-button");
const skipAllBtn = document.getElementById("skip-all-button");


const navText = document.querySelector(".text-nav");

const textBox = document.querySelector(".text-box");
const minimap = document.querySelector(".minimap-box");
const northButtons = document.querySelector(".north-buttons");
const eastButtons = document.querySelector(".east-buttons");
const southButtons = document.querySelector(".south-buttons");
const westButtons = document.querySelector(".west-buttons");
const contactModal = document.getElementById("contact-mdl");
const contactOpenBtn = document.getElementById("contact-open-btn");
const contactCloseBtn = document.getElementById("contact-close-btn");
const toolboxOpenBtn = document.getElementById("toolbox-button");
const toolboxModal = document.getElementById("toolbox-modal");
const toolboxCloseSpan = document.querySelector(".toolbox-close-btn");
const invModal = document.getElementById("inv-modal");
const invOpenBtn = document.getElementById("inv-button");
const invCloseSpan = document.querySelector(".inv-close-btn");
const inventoryContainer = document.querySelector(".inv-modal-box-container");
const inventoryContainerModals = document.querySelectorAll(".modal-inv-info");

console.log("current location: ", state.currentLocation);
let intervalId = null;
const intervalIdRef = {current: null};

// --- Back Buttons ---
setupBackButtons(goBack);
setupNavBackButtons(goBack);

// --- Set Scene ---
export function sceneSetter(location) {
    setScene(location, getSceneContext(intervalIdRef));
}

  // --- Skip Animation ---
setupSkipButtons({
    state,
    intervalIdRef,
    navText,
    skipButton,
    skipAllBtn,
    onTypingComplete,
    setScene: sceneSetter
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



// --- STARTUP TEXT ANIMATION ---
animateText(storyTexts[state.currentLocation], getSceneContext(intervalIdRef));
getTerritoryDirections.forEach(setupTerritoryListeners);
getTerritoryDirections.forEach(setupTabs);

setupCloseMapListeners();
setupZoomMapListener();
setupInitialInventory(inventoryContainer, inventoryContainerModals);
setupModalListeners();

// --- HANDLE POST-TYPING UI STATE ---
export function onTypingComplete() {
    if (state.currentLocation === "start") {
        openMapButton.style.visibility = "visible";
    } else if (state.currentLocation === "world1") {
        moreButton.style.visibility = "visible";
    } else if (state.currentLocation === "world2") {
        mainButtons.style.display = "flex";
        skipAllBtn.style.visibility = "hidden";
    }
    skipButton.style.visibility = "hidden";
}

// --- SUBSECTION DISPLAY HANDLER ---
export function showSubsection(location) {
    state.currentLocation = location;
    const subsection = document.getElementById(`${state.currentLocation}-subsection`);
    const allSubsections = document.getElementsByClassName("subsection");
    for (let i = 0; i < allSubsections.length; i++) {
        allSubsections[i].classList.add("hidden");
    }
    subsection.classList.remove("hidden");
    toggleTextBox(false);
    // textBox.classList.add('hide');
}

// --- MAP ENTRY ---
openMapButton.addEventListener("click", () => {
    sceneSetter("world1");
});
moreButton.addEventListener("click", () => {
    sceneSetter("world2");
});

// --- MAP NAVIGATION BUTTONS (territory selection) ---
optionButtons.forEach(optionButton => {
    optionButton.addEventListener("click", (e)=> {
        const location = locations[e.target.id];
        if (location) {
            sceneSetter(location);
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
                sceneSetter(location);
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
export function setupTabs(direction) {
    const subsectionNavBtns = document.querySelectorAll(`.${direction}-subsection-button`);
    const mapCont = document.querySelector(`.${direction}-map-container`);
    const body = document.querySelector(`.${direction}-body`);

    subsectionNavBtns.forEach(subsectionNavBtn => {
        subsectionNavBtn.addEventListener("click", (e)=> {
            const location = locations[e.target.id];
            const otherBtns = document.querySelectorAll(`.${direction}-subsection-button.active`);
            if (location) {
                sceneSetter(location);
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

// --- Toolbox Modal ---
toolboxOpenBtn.addEventListener("click", () => toolboxModal.classList.add("open"));
toolboxCloseSpan.addEventListener("click", () => toolboxModal.classList.remove("open"));

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

// --- TREE FRACTAL ---
function drawTree(ctx, startX, startY, length, angle, branchWidth, color1, color2) {
    ctx.beginPath();
    ctx.save();

    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "#FECBF1";
    ctx.lineWidth = branchWidth;

    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.stroke();

    if (length < 10) {
        ctx.restore();
        return;
    }

    drawTree(ctx, 0, -length, length * 0.7, angle - 20, branchWidth * 0.7, color1, color2);
    drawTree(ctx, 0, -length, length * 0.7, angle + 20, branchWidth * 0.7, color1, color2);

    ctx.restore();
}

window.addEventListener('load', () => {
    const canvas = document.getElementById('recursive-tree');
    const ctx = canvas.getContext('2d');

    // Clear and draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTree(ctx, canvas.width / 2, canvas.height - 80, 120, 0, 10, '#FA67D1', '#F7F3B7');
});
