window.InvestigationSystem = {
    init: function(scene) {
        const beacon = BABYLON.MeshBuilder.CreateSphere("evidenceBeacon", { diameter: 1.5 }, scene);
        beacon.position = new BABYLON.Vector3(-10, 1.0, 15);

        const mat = new BABYLON.StandardMaterial("beaconMat", scene);
        mat.emissiveColor = new BABYLON.Color3(0.0, 1.0, 0.8);
        beacon.material = mat;

        scene.registerBeforeRender(() => {
            if (!Player.mesh) return;
            const dist = BABYLON.Vector3.Distance(Player.mesh.position, beacon.position);
            if (dist < 3.0 && !beacon.isCollected) {
                beacon.isCollected = true;
                beacon.dispose();
                GameState.evidenceLog.push("Encrypted Datapad: Uncovered schematics for 2094 transit routing.");
                MissionSystem.completeMission("M001");
                MissionSystem.addMission("M002", "Mission 002: The Unknown Message", "Decrypt signal origin from the Lagos lagoon station.");
                alert("INVESTIGATION UPDATE: New Evidence Acquired & Mission 001 Completed!");
            }
        });
    }
};
