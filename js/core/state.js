window.GameState = {
    activeCharacter: "Dami Adebayo",
    currentRegion: "Neo-Lagos",
    playerCoords: { x: 0, y: 0, z: 0 },
    inventory: ["Quantum Datapad v1", "Multi-Tool Scanner"],
    evidenceLog: ["Audio Log #042: Fragmented recording mentioning a forgotten laboratory."],
    missions: [
        { id: "M001", title: "Mission 001: A Strange Arrival", status: "In Progress", desc: "Investigate power fluctuation near Victoria Island research sector." },
        { id: "M002", title: "Mission 002: The Unknown Message", status: "Locked", desc: "Decrypt signal origin." }
    ],
    experience: 120,
    level: 1,
    nexusUnlocked: true,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
};
