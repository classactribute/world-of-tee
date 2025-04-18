import { clearHUDThemes, updateHUDTheme } from './themeManager.js';
import { storyTexts, titles } from './gameTexts.js';
import { locations, modalContent, getTerritoryDirections } from './gameData.js';
import { setScene, setupTabs, showSubsection } from './script.js';

export const state = {
    currentLocation: "start"
}

export function navigateToTerritory(territory, isClosingMap = false) {
    state.currentLocation = territory;
    const textBox = document.querySelector(".text-box");
    textBox.style.display = "flex";

    const selectedTerritory = document.getElementById(`${territory}-section`);
    const selectedTerritoryButtons = document.querySelector(`.${territory}-buttons`);
    const selectedTerritoryMap = document.querySelector(`.${territory}-map-container`);
    const selectedTerritoryBody = document.querySelector(`.${territory}-body`);

    const body = document.getElementsByTagName('body')[0];
    body.style.background = `linear-gradient(rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5)), url('assets/${territory}-background.webp')`;
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundSize = "100% 100%";

    document.getElementById("section-name").innerHTML = titles[territory];
    updateHUDTheme(territory);

    const minimap = document.querySelector(".minimap-box");
    const mainMap = document.getElementById("main-map-container");
    const territoryMaps = document.querySelectorAll(".territory-map-container");
    const territoryBodies = document.querySelectorAll(".territory-body");
    const allSections = document.querySelectorAll(".territory-section");
    const territoryButtons = document.querySelectorAll(".territory-buttons");
    const mainButtons = document.querySelector(".main-buttons");

    if (isClosingMap) {
        console.log(state.currentLocation);
        const subsectionNavBtns = document.querySelectorAll(`.${state.currentLocation}-subsection-button`);
        if (selectedTerritoryMap) selectedTerritoryMap.style.display = "none";
        if (selectedTerritoryBody) selectedTerritoryBody.style.display = "flex";
        minimap.style.display = "flex";
        textBox.style.display = "none";
        subsectionNavBtns.forEach(subsectionNavBtn => {
            if (subsectionNavBtn.dataset.name == 'first-tab') {
                subsectionNavBtn.click();
            }
        });
        return;
    }

    minimap.style.display = "none";
    document.getElementById("minimap-img-id").src = `assets/${territory}-mini.png`;

    mainMap.style.display = "none";
    territoryMaps.forEach(map => map.style.display = "none");
    if (selectedTerritoryMap) selectedTerritoryMap.style.display = "flex";

    territoryBodies.forEach(body => body.style.display = "none");
    allSections.forEach(section => section.classList.add("hidden"));
    if (selectedTerritory) selectedTerritory.classList.remove("hidden");

    mainButtons.style.display = "none";
    territoryButtons.forEach(group => group.style.display = "none");
    if (selectedTerritoryButtons) selectedTerritoryButtons.style.display = "flex";
}

export function setupCloseMapListeners() {
    document.getElementById("close-north-map").addEventListener("click", () => navigateToTerritory("north", true));
    document.getElementById("close-east-map").addEventListener("click", () => navigateToTerritory("east", true));
    document.getElementById("close-south-map").addEventListener("click", () => navigateToTerritory("south", true));
    document.getElementById("close-west-map").addEventListener("click", () => navigateToTerritory("west", true));
}

export function setupZoomMapListener() {
    const zoomMap = document.getElementById("zoom-map-btn");
    zoomMap.addEventListener("click", () => {
        if (["north", "nl1", "nl2", "nl3"].includes(state.currentLocation)) {
            navigateToTerritory("north");
        } else if (["east", "el1", "el2", "el3"].includes(state.currentLocation)) {
            navigateToTerritory("east");
        } else if (["south", "sl1", "sl2", "sl3"].includes(state.currentLocation)) {
            navigateToTerritory("south");
        } else if (["west", "wl1", "wl2", "wl3"].includes(state.currentLocation)) {
            navigateToTerritory("west");
        }
    });
}

// --- Territory Modals ---
export function setupModalListeners() {
    document.addEventListener("click", (event) => {
        // console.log("event listener activated");
        const modal = event.target.closest(".map-modal");
        const openModal = document.querySelector(".map-modal[style*='display: flex']");
    
        // Close button logic
        if (event.target.classList.contains("modal-close-btn")) {
            modal.style.display = "none";
            return;
        }
    
        // Open territory modal
        const territory = event.target.closest(".territory-name");
        if (territory) {
            // console.log("Target modal:", targetModal);
            event.stopPropagation();
            const territoryType = territory.getAttribute("data-territory");
            const targetModal = document.getElementById(`${territoryType}-modal`);

    
            if (targetModal) {
                // console.log("Trying to open:", territoryType);
                console.log("Target modal:", targetModal);
                console.log("territory type: ", territoryType);
                const modalData = modalContent[territoryType];
                targetModal.querySelector(".modal-desc").textContent = modalData.description;
                targetModal.style.background = `linear-gradient(rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.8)), url('${modalData.image}')`;
                targetModal.style.backgroundRepeat = "no-repeat";
                targetModal.style.backgroundSize = "100% 100%";

                const selectedModalButton = targetModal.querySelector(`.${territoryType}-modal-button`);
                const selectedSSModalButton = targetModal.querySelector(`.${territoryType}-ssmodal-button`);
                
                if (selectedModalButton) {
                    selectedModalButton.addEventListener("click", () => {
                        setScene(territoryType);
                    });
                }

                if (selectedSSModalButton) {
                    selectedSSModalButton.addEventListener("click", () => {
                        console.log("this is being clicked");
                        console.log("trying to put this territory type: ", territoryType);
                        const ssBtn = document.querySelector(`.${territoryType}-button-nav`);
                        ssBtn.click();
                    });
                }
        
                if (!openModal || openModal !== targetModal) {
                    if (openModal) openModal.style.display = "none";
                    targetModal.style.display = "flex";
                    console.log("Opening target modal:", territoryType);
                }
            }
            return;
        }
    
        // Click outside to close
        if (openModal && !event.target.closest(".map-modal-content")) {
            openModal.style.display = "none";
        }
    });
}