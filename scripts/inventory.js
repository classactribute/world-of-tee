import { playerInventory, modalInventories } from './inventoryData.js';

// --- INVENTORY MODAL EVENTS ---
export function addInventoryItem(itemName, container) {
    const itemBox = document.createElement("div");
    itemBox.classList.add("inv-modal-boxes");
    itemBox.textContent = itemName;
    container.appendChild(itemBox);
}

export function setupInitialInventory(inventoryContainer, inventoryContainerModals) {
    // Load player inventory
    playerInventory.forEach(item => {
        addInventoryItem(item, inventoryContainer);
    });

    //Load items into each modal container
    inventoryContainerModals.forEach(modal => {
        const direction = modal.dataset.territory; 
        const items = modalInventories[direction] || [];
        items.forEach(item => {
          addInventoryItem(item, modal);
        });
      });
}