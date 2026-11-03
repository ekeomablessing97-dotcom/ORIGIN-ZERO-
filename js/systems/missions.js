window.MissionSystem = {
    addMission: function(id, title, desc) {
        GameState.missions.push({ id, title, status: "In Progress", desc });
        console.log(`Mission Added: ${title}`);
    },

    completeMission: function(id) {
        const mission = GameState.missions.find(m => m.id === id);
        if (mission) {
            mission.status = "Completed";
            GameState.experience += 50;
            if (GameState.experience >= 100 * GameState.level) {
                GameState.level += 1;
            }
            console.log(`Mission Completed: ${mission.title} (+50 XP)`);
        }
    }
};
