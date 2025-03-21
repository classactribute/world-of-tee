const mapContainer = document.querySelector(".map-container");
const mainButtons = document.querySelector(".main-buttons");
const choiceButtons = document.querySelectorAll(".choice-button");
const optionButtons = document.querySelectorAll(".option-button");
const northButtons = document.querySelector(".north-buttons");
const eastButtons = document.querySelector(".east-buttons");
const southButtons = document.querySelector(".south-buttons");
const westButtons = document.querySelector(".west-buttons");
const northButtonsAll = document.querySelectorAll(".north-buttons");
const eastButtonsAll = document.querySelectorAll(".east-buttons");
const southButtonsAll = document.querySelectorAll(".south-buttons");
const westButtonsAll = document.querySelectorAll(".west-buttons");
const skipButton = document.getElementById("skip-button");
const openMapButton = document.getElementById("open-button");
const moreButton = document.getElementById("more-button");
const navText = document.querySelector(".text-nav");
const textBox = document.querySelector(".text-box");
const minimap = document.querySelector(".minimap-box");

const nl1Subsection = document.getElementById("algorithmic-hills");
const nl2Subsection = document.getElementById("framework-forge");
const nl3Subsection = document.getElementById("api-crossroads");


const storyTexts = {
    start: "Hello, welcome to Tee's website. I'd love for you to stay a little while and explore my world. Think of this box as your navigation through your journey. Let's get started. Go ahead and open the map.",
    world1: "This is the map of my World. It's separated in 4 territories; The Realm of Code, The Storyteller's Path, The Creative Frontier, The Hidden Archives. Hovering over each will give you a brief description of what the destination has in store for you",
    world2: "Each territory has hidden coins for you to collect, and items will be added to your inventory as you explore it, and the lands within it. Go ahead, you can pick your first destination now. Enjoy your travels. And if you manage to collect enough coins and all the items, come back to the start for a treat!",
    north: "You venture north, where the air grows crisp and the mountains loom.",
    south: "You travel south, feeling the warmth of the sun intensify.",
    east:  "You wander east, hearing distant whispers carried by the wind.",
    west:  "You head west, into a forest thick with ancient trees.",
    nl1: "The Algorithmic Hills",
    nl2: "The Framework Forge",
    nl3: "The API Crossroads",
    el1: "The Origin Grove",
    el2: "The Learning Bridge",
    el3: "The Reflection Tower",
    sl1: "The Puzzle Workshop",
    sl2: "The Expression Pavilion",
    sl3: "The Concept Forge",
    wl1: "The Forgotten Files",
    wl2: "The Easter Egg Vault",
    wl3: "The Unfinished Abyss"
};

const locations = {
    "north-button" : "north",
    "south-button" : "south",
    "east-button" : "east",
    "west-button" : "west",
    "nl1-button" : "nl1",
    "nl2-button" : "nl2",
    "nl3-button" : "nl3",
    "el1-button" : "el1",
    "el2-button" : "el2",
    "el3-button" : "el3",
    "sl1-button" : "sl1",
    "sl2-button" : "sl2",
    "sl3-button" : "sl3",
    "wl1-button" : "wl1",
    "wl2-button" : "wl2",
    "wl3-button" : "wl3"
};

const titles = {
    world2 : "The World of Tee",
    north : "The Realm of Code",
    east : "The Storyteller's Path",
    south : "The Creative Frontier",
    west : "The Hidden Archives"
}

const modalContent = {
    north: {
        title: "Realm of Code",
        description: "Where logic and creativity merge. Explore my coding projects, frameworks, and problem-solving skills.",
        image: "assets/north-mini.png",
        // buttonText: "Enter Realm",
        // link: "/realm-of-code.html"
    },
    east: {
        title: "The Storyteller's Path",
        description: "A journey through my experiences, reflections, and lessons learned as a developer.",
        image: "assets/east-mini.png",
        // buttonText: "Enter Path",
        // link: "/storytellers-path.html"
    },
    south: {
        title: "The Creative Frontier",
        description: "Where imagination meets innovation. Explore creative experiments and projects.",
        image: "assets/south-mini.png",
        // buttonText: "Enter Frontier",
        // link: "/creative-frontier.html"
    },
    west: {
        title: "The Hidden Archives",
        description: "A collection of forgotten files, secret projects, and things left behind.",
        image: "assets/west-mini.png",
        // buttonText: "Enter Archives",
        // link: "/hidden-archives.html"
    },
    land1North: {
        title: "The Algorithm Hills",
        description: "A collection of forgotten files, secret projects, and things left behind.",
        image: "assets/north-mini.png",
        // buttonText: "Enter Archives",
        // link: "/hidden-archives.html"
    },
    land2North: {
        title: "The Framework Forge",
        description: "A collection of forgotten files, secret projects, and things left behind.",
        image: "assets/north-mini.png",
        // buttonText: "Enter Archives",
        // link: "/hidden-archives.html"
    },
    land3North: {
        title: "The API Crossroads",
        description: "A collection of forgotten files, secret projects, and things left behind.",
        image: "assets/north-mini.png",
        // buttonText: "Enter Archives",
        // link: "/hidden-archives.html"
    },
    land1East: {
        title: "The Origin Grove",
        description: "A collection of forgotten files, secret projects, and things left behind.",
        image: "assets/east-mini.png",
        // buttonText: "Enter Archives",
        // link: "/hidden-archives.html"
    },
    land2East: {
        title: "The Learning Bridge",
        description: "A collection of forgotten files, secret projects, and things left behind.",
        image: "assets/east-mini.png",
        // buttonText: "Enter Archives",
        // link: "/hidden-archives.html"
    },
    land3East: {
        title: "The Reflection Tower",
        description: "A collection of forgotten files, secret projects, and things left behind.",
        image: "assets/east-mini.png",
        // buttonText: "Enter Archives",
        // link: "/hidden-archives.html"
    },
    land1South: {
        title: "The Puzzle Workshop",
        description: "A collection of forgotten files, secret projects, and things left behind.",
        image: "assets/south-mini.png",
        // buttonText: "Enter Archives",
        // link: "/hidden-archives.html"
    },
    land2South: {
        title: "The Expression Pavilion",
        description: "A collection of forgotten files, secret projects, and things left behind.",
        image: "assets/south-mini.png",
        // buttonText: "Enter Archives",
        // link: "/hidden-archives.html"
    },
    land3South: {
        title: "The Concept Forge",
        description: "A collection of forgotten files, secret projects, and things left behind.",
        image: "assets/south-mini.png",
        // buttonText: "Enter Archives",
        // link: "/hidden-archives.html"
    },
    land1West: {
        title: "The Forgotten Files",
        description: "A collection of forgotten files, secret projects, and things left behind.",
        image: "assets/west-mini.png",
        // buttonText: "Enter Archives",
        // link: "/hidden-archives.html"
    },
    land2West: {
        title: "The Easter Egg Vault",
        description: "A collection of forgotten files, secret projects, and things left behind.",
        image: "assets/west-mini.png",
        // buttonText: "Enter Archives",
        // link: "/hidden-archives.html"
    },
    land3West: {
        title: "The Unfinished Abyss",
        description: "A collection of forgotten files, secret projects, and things left behind.",
        image: "assets/west-mini.png",
        // buttonText: "Enter Archives",
        // link: "/hidden-archives.html"
    }
};

mainButtons.style.display = "none";
moreButton.style.visibility = "hidden";
openMapButton.style.visibility = "hidden";
northButtons.style.display = "none";
eastButtons.style.display = "none";
southButtons.style.display = "none";
westButtons.style.display = "none";

let currentLocation = "start";
let intervalId;

animateText(storyTexts[currentLocation]);

function animateText(text) {
    const textLength = text.length;
    let i = 0;
    if (!intervalId) {
        intervalId = setInterval(() => {
            if ( i === textLength ) {
              clearInterval(intervalId);
              onTypingComplete();
            } else {
              navText.textContent += text[i];
              i++;
            }  
        }, 20)
    }
}

function onTypingComplete() {
    if (currentLocation === "start") {
        openMapButton.style.visibility = "visible";
    } else if (currentLocation === "world1") {
        moreButton.style.visibility = "visible";
    } else if (currentLocation === "world2") {
        mainButtons.style.display = "flex";
    } 
}

function skipAnimation() {
    clearInterval(intervalId);
    intervalId = null;
    navText.textContent = storyTexts[currentLocation];
    onTypingComplete();
}

// Make this work eventually
// function skipBack() {
//     clearInterval(intervalId);
//     intervalId = null;
//     console.log(currentLocation);
//     console.log(storyTexts);
//     console.log(storyTexts[currentLocation]);
//     onTypingComplete();
// }

function setScene(location) {
    skipAnimation();
    currentLocation = location;
    navText.textContent = "";
    if (currentLocation === "world1") {
        openMapButton.style.visibility = "hidden";
        mapContainer.style.visibility = "visible";
    } else if (currentLocation === "world2") {
        moreButton.style.visibility = "hidden";
    }  else if (currentLocation === "north") {
        navigateToTerritory("north");
    } else if (currentLocation === "east") {
        navigateToTerritory("east");
    } else if (currentLocation === "south") {
        navigateToTerritory("south");
    } else if (currentLocation === "west") {
        navigateToTerritory("west");
    }
    animateText(storyTexts[currentLocation]);
}

function showSubsection(location) {
    console.log(location);
    currentLocation = location;
    console.log(currentLocation);
    const subsection = document.getElementById(`${currentLocation}-subsection`);
    console.log("current subsection:", subsection);
    const allSubsections = document.getElementsByClassName("subsection");
    for (let i = 0; i < allSubsections.length; i++) {
        allSubsections[i].classList.add("hidden");
    }
    subsection.classList.remove("hidden");
    return;
}

function openMap() {
    setScene("world1");
}

function tellMeMore() {
    setScene("world2");
}

function exitGame() {
    textBox.style.display = "none";
}

function goBack() {
    console.log("clicked the go back button");
    currentLocation = "world2";
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
    // set background
    const body = document.getElementsByTagName('body')[0];
    console.log(currentLocation);
    body.style.background = `linear-gradient(rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5)), url('assets/${currentLocation}-background.webp')`;
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundSize = "100% 100%";
    // set title
    const sectionTitle = document.getElementById("section-name");
    sectionTitle.innerHTML = titles[currentLocation];
    //set scene
    setScene("world2");
}

optionButtons.forEach(optionButton => {
    optionButton.addEventListener("click", (e)=> {
        const location = locations[e.target.id];
        if (location) {
            setScene(location);
        }
    });
});

// ---LANDS---
const northMapContainer = document.querySelector(".north-map-container");
const eastMapContainer = document.querySelector(".east-map-container");
const southMapContainer = document.querySelector(".south-map-container");
const westMapContainer = document.querySelector(".west-map-container");
const northBody = document.querySelector(".north-body");
const eastBody = document.querySelector(".east-body");
const southBody = document.querySelector(".south-body");
const westBody = document.querySelector(".west-body");

northButtonsAll.forEach(northButton => {
    northButton.addEventListener("click", (e)=> {
        const location = locations[e.target.id];
        console.log(location);
        if (location) {
            // change text, close map and go to section
            setScene(location);
            showSubsection(location);
            northMapContainer.style.display = "none";
            minimap.style.display = "flex";
            northBody.style.display = "flex";
        }
    });
});

eastButtonsAll.forEach(eastButton => {
    eastButton.addEventListener("click", (e)=> {
        const location = locations[e.target.id];
        if (location) {
            // change text, close map and go to section
            setScene(location);
            showSubsection(location);
            eastMapContainer.style.display = "none";
            minimap.style.display = "flex";
            eastBody.style.display = "flex";
        }
    });
});

southButtonsAll.forEach(southButton => {
    southButton.addEventListener("click", (e)=> {
        const location = locations[e.target.id];
        if (location) {
            // change text, close map and go to section
            setScene(location);
            showSubsection(location);
            southMapContainer.style.display = "none";
            minimap.style.display = "flex";
            southBody.style.display = "flex";
        }
    });
});

westButtonsAll.forEach(westButton => {
    westButton.addEventListener("click", (e)=> {
        const location = locations[e.target.id];
        if (location) {
            // change text, close map and go to section
            setScene(location);
            showSubsection(location);
            westMapContainer.style.display = "none";
            minimap.style.display = "flex";
            westBody.style.display = "flex";
        }
    });
});

// ---INVENTORY MODAL---
const invModal = document.getElementById("inv-modal");
const invOpenBtn = document.getElementById("inv-button");
const invCloseSpan = document.getElementsByClassName("inv-close-btn")[0];

invOpenBtn.onclick = function() {
    invModal.style.display = "flex";
}

invCloseSpan.onclick = function() {
    invModal.style.display = "none";
}

const inventoryContainer = document.querySelector(".inv-modal-box-container");

function addInventoryItem(itemName) {
    const itemBox = document.createElement("div");
    itemBox.classList.add("inv-modal-boxes");
    itemBox.textContent = itemName;  // Placeholder text (can be replaced with an image)
    inventoryContainer.appendChild(itemBox);
}

// Example: Add some test items
addInventoryItem("Golden Coin");
addInventoryItem("Mysterious Key");

// ---MODAL BEHAVIOUR---
document.addEventListener("click", (event) => {
    const modal = event.target.closest(".map-modal");
    const openModal = document.querySelector(".map-modal[style*='display: flex']");
    //const modalImg = modal.querySelector(".modal-img");
    //const modalTitle = modal.querySelector(".modal-title");
    //const modalDesc = modal.querySelector(".modal-desc");

    // Clicking the close button to close the modal
    if (event.target.classList.contains("modal-close-btn")) {
        console.log("Closing modal:", modal);
        modal.style.display = "none";
        return;
    }

    // Clicking a territory name to open the corresponding modal
    const territory = event.target.closest(".territory-name");
    if (territory) {
        event.stopPropagation();
        const territoryType = territory.getAttribute("data-territory");
        const targetModal = document.getElementById(`${territoryType}-modal`);

        // targetModal.querySelector(".modal-img").src = modalContent[territoryType].image;
        // targetModal.querySelector(".modal-title").textContent = modalContent[territoryType].title;
        targetModal.querySelector(".modal-desc").textContent = modalContent[territoryType].description;
        targetModal.style.background = `linear-gradient(rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5)), url('${modalContent[territoryType].image}')`;
        targetModal.style.backgroundRepeat = "no-repeat";
        // targetModal.style.backgroundAttachment = "fixed";
        targetModal.style.backgroundSize = "100% 100%";


        if (targetModal && openModal !== targetModal) {
            if (openModal) {
                console.log("Closing previously open modal:", openModal);
                openModal.style.display = "none";
            }
            console.log("Opening modal:", targetModal);
            targetModal.style.display = "flex";
        }
        return;
    }

    // Clicking anywhere outside the modal content to close the modal
    if (openModal && !event.target.closest(".map-modal-content")) {
        console.log("Closing modal by clicking outside:", openModal);
        openModal.style.display = "none";
    }
});

// ---Modal Inventory Info---
const inventoryContainerModals = document.querySelectorAll(".modal-inv-info");

inventoryContainerModals.forEach (inventoryContainerModal => {
    function addModalInventoryItem(itemName) {
        const itemBox = document.createElement("div");
        itemBox.classList.add("inv-modal-boxes");
        itemBox.textContent = itemName;  // Placeholder text (can be replaced with an image)
        inventoryContainerModal.appendChild(itemBox);
    }
    // Example: Add some test items
    addModalInventoryItem("Gold");
    addModalInventoryItem("Myst");
    addModalInventoryItem("Poop");
});


// ---TERRITORIES---
const mainMap = document.getElementById("main-map-container");
const allSections = document.querySelectorAll(".territory-section");
const territoryButtons = document.querySelectorAll(".territory-buttons");
const territoryMaps = document.querySelectorAll(".territory-map-container");
const territoryBodies = document.querySelectorAll(".territory-body");

function navigateToTerritory(territory, isClosingMap = false) {
    currentLocation = territory;
    const selectedTerritory = document.getElementById(`${territory}-section`);
    const selectedTerritoryButtons = document.querySelector(`.${territory}-buttons`);
    const selectedTerritoryMap = document.querySelector(`.${territory}-map-container`);
    const selectedTerritoryBody = document.querySelector(`.${territory}-body`);

    // set background
    const body = document.getElementsByTagName('body')[0];
    body.style.background = `linear-gradient(rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5)), url('assets/${currentLocation}-background.webp')`;
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundSize = "100% 100%";

    // set title
    const sectionTitle = document.getElementById("section-name");
    sectionTitle.innerHTML = titles[territory];

    if (isClosingMap) {
        // ✅ Closing the map and showing the minimap
        //console.log("Closing", `${territory}`, "map.");
        if (selectedTerritoryMap) selectedTerritoryMap.style.display = "none";
        if (selectedTerritoryBody) selectedTerritoryBody.style.display = "flex";
        minimap.style.display = "flex";
        return;
    }
    // hide minimap
    minimap.style.display = "none";
    
    // set minimap image
    const miniImage = document.getElementById("minimap-img-id");
    miniImage.src = `assets/${currentLocation}-mini.png`;

    // show selected map
    mainMap.style.display = "none";
    territoryMaps.forEach(territoryMap =>{
        territoryMap.style.display = "none";
    });
    if (selectedTerritoryMap) {
        selectedTerritoryMap.style.display = "flex";
    }
    // hide all bodies
    territoryBodies.forEach(territoryBody => {
        territoryBody.style.display = "none";
    });
    // hide all territories
    allSections.forEach (section => {
        section.classList.add("hidden");
    });
    // show selected territory
    if (selectedTerritory) {
        selectedTerritory.classList.remove("hidden");
    }
    // show relevant territory buttons
    mainButtons.style.display = "none";
    territoryButtons.forEach(buttonGroup => {
        buttonGroup.style.display = "none";
        console.log(buttonGroup);
    });
    console.log(selectedTerritoryButtons);
    if (selectedTerritoryButtons) {
        selectedTerritoryButtons.style.display = "flex";
    }
}

const nmClose = document.getElementById("close-north-map");
const emClose = document.getElementById("close-east-map");
const smClose = document.getElementById("close-south-map");
const wmClose = document.getElementById("close-west-map");

nmClose.addEventListener('click', ()=> navigateToTerritory("north", true));
emClose.addEventListener("click", () => navigateToTerritory("east", true));
smClose.addEventListener("click", () => navigateToTerritory("south", true));
wmClose.addEventListener("click", () => navigateToTerritory("west", true));

const zoomMap = document.getElementById('zoom-map-btn');
zoomMap.addEventListener('click', () => {
    if (["north", "nl1", "nl2", "nl3"].includes(currentLocation)) {
        navigateToTerritory("north");
    } else if (["east", "el1", "el2", "el3"].includes(currentLocation)) {
        navigateToTerritory("east");
    } else if (["south", "sl1", "sl2", "sl3"].includes(currentLocation)) {
        navigateToTerritory("south");
    } else if (["west", "wl1", "wl2", "wl3"].includes(currentLocation)) {
        navigateToTerritory("west");
    } 
});

console.log(currentLocation);