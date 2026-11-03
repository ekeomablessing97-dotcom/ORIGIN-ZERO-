window.InteriorSystem = {
    currentInterior: null,

    init: function(scene) {
        // Create an interior trigger zone near the Technology University Hub (0, 60)
        const triggerZone = BABYLON.MeshBuilder.CreateBox("interiorTrigger", { width: 6, height: 4, depth: 6 }, scene);
        triggerZone.position = new BABYLON.Vector3(0, 2, 50);
        triggerZone.visibility = 0.3; // Semi-transparent marker in world

        const triggerMat = new BABYLON.StandardMaterial("trigMat", scene);
        triggerMat.emissiveColor = new BABYLON.Color3(0.0, 1.0, 0.5);
        triggerZone.material = triggerMat;

        scene.registerBeforeRender(() => {
            if (!Player.mesh) return;
            const dist = BABYLON.Vector3.Distance(Player.mesh.position, triggerZone.position);
            
            if (dist < 3.0 && !this.currentInterior) {
                this.enterInterior(scene, "Tech University Research Vault");
            }
        });
    },

    enterInterior: function(scene, roomName) {
        this.currentInterior = roomName;
        
        // Teleport player into a localized interior coordinate space offset
        Player.mesh.position = new BABYLON.Vector3(0, 1.1, 500); // Separate hidden interior space

        // Build a simple secure room environment for the interior
        const roomFloor = BABYLON.MeshBuilder.CreateGround("roomFloor", { width: 30, height: 30 }, scene);
        roomFloor.position = new BABYLON.Vector3(0, 0, 500);
        
        const roomWallMat = new BABYLON.StandardMaterial("rWallMat", scene);
        roomWallMat.diffuseColor = new BABYLON.Color3(0.05, 0.05, 0.1);
        roomFloor.material = roomWallMat;
        roomFloor.checkCollisions = true;

        // Add a terminal inside the interior to exit back out
        const exitTerminal = BABYLON.MeshBuilder.CreateBox("exitTerminal", { width: 2, height: 2, depth: 0.5 }, scene);
        exitTerminal.position = new BABYLON.Vector3(0, 1, 485);
        
        const termMat = new BABYLON.StandardMaterial("termMat", scene);
        termMat.emissiveColor = new BABYLON.Color3(1.0, 0.0, 0.5);
        exitTerminal.material = termMat;

        alert(`ENTERED INTERIOR: ${roomName}. Explore the terminal or walk back to exit.`);
    },

    exitInterior: function() {
        if (!this.currentInterior) return;
        this.currentInterior = null;
        Player.mesh.position = new BABYLON.Vector3(0, 1.1, 5); // Return to main street
        alert("EXITED TO NEO-LAGOS STREETS");
    }
};
