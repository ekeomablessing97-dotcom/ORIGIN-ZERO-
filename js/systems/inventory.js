window.InventorySystem = {
    addItem: function(itemName) {
        GameState.inventory.push(itemName);
    },

    hasItem: function(itemName) {
        return GameState.inventory.includes(itemName);
    }
};
