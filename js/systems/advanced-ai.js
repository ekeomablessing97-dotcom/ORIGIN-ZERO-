window.AdvancedAISystem = {
    processQuery: function(npcName, query) {
        const memoryDatabase = {
            "Dr. Imani Adeyemi": "The research station beneath the lagoon holds the core encryption keys.",
            "Kene Nwosu": "Power grid bypasses require a Level 2 technologist credential."
        };
        return memoryDatabase[npcName] || "The static on the network is too strong to parse that frequency right now.";
    }
};
