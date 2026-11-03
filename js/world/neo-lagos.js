window.NeoLagos = {
    init: function(scene) {
        // Main Ground & Pavement Grid (Neo-Lagos Sector 7)
        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 400, height: 400 }, scene);
        const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
        groundMat.diffuseColor = new BABYLON.Color3(0.04, 0.04, 0.07);
        groundMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        ground.material = groundMat;
        ground.checkCollisions = true;

        // Expressways & Pavements (Grid Layout)
        const roadMat = new BABYLON.StandardMaterial("roadMat", scene);
        roadMat.diffuseColor = new BABYLON.Color3(0.08, 0.08, 0.12);

        const roadNorthSouth = BABYLON.MeshBuilder.CreateBox("roadNS", { width: 16, height: 0.1, depth: 400 }, scene);
        roadNorthSouth.position = new BABYLON.Vector3(0, 0.05, 0);
        roadNorthSouth.material = roadMat;

        const roadEastWest = BABYLON.MeshBuilder.CreateBox("roadEW", { width: 400, height: 0.1, depth: 16 }, scene);
        roadEastWest.position = new BABYLON.Vector3(0, 0.05, 0);
        roadEastWest.material = roadMat;

        // Materials for Architecture
        const corpMat = new BABYLON.StandardMaterial("corpMat", scene);
        corpMat.diffuseColor = new BABYLON.Color3(0.07, 0.09, 0.16);
        corpMat.emissiveColor = new BABYLON.Color3(0.0, 0.03, 0.08);

        const resMat = new BABYLON.StandardMaterial("resMat", scene);
        resMat.diffuseColor = new BABYLON.Color3(0.12, 0.10, 0.14);

        const neonPink = new BABYLON.StandardMaterial("neonPink", scene);
        neonPink.emissiveColor = new BABYLON.Color3(1.0, 0.0, 0.4);

        const neonCyan = new BABYLON.StandardMaterial("neonCyan", scene);
        neonCyan.emissiveColor = new BABYLON.Color3(0.0, 0.9, 1.0);

        const neonGold = new BABYLON.StandardMaterial("neonGold", scene);
        neonGold.emissiveColor = new BABYLON.Color3(1.0, 0.7, 0.0);

        // --- ZONE 1: TECHNOLOGY DISTRICT (North-East) ---
        const techBuildings = [
            { x: 35, z: 35, w: 22, h: 65, d: 22, mat: neonCyan },
            { x: 65, z: 35, w: 18, h: 50, d: 18, mat: neonGold },
            { x: 35, z: 65, w: 25, h: 75, d: 25, mat: neonCyan }
        ];

        techBuildings.forEach((b, idx) => {
            const mesh = BABYLON.MeshBuilder.CreateBox("tech_b_" + idx, { width: b.w, height: b.h, depth: b.d }, scene);
            mesh.position = new BABYLON.Vector3(b.x, b.h / 2, b.z);
            mesh.material = corpMat;
            mesh.checkCollisions = true;

            // Accent strip
            const strip = BABYLON.MeshBuilder.CreateBox("tech_strip_" + idx, { width: b.w + 0.4, height: 1.5, depth: b.d + 0.4 }, scene);
            strip.position = new BABYLON.Vector3(b.x, b.h * 0.8, b.z);
            strip.material = b.mat;
        });

        // --- ZONE 2: RESIDENTIAL NEIGHBOURHOOD (South-West) ---
        const resBuildings = [
            { x: -35, z: -35, w: 14, h: 30, d: 14 },
            { x: -65, z: -35, w: 16, h: 35, d: 16 },
            { x: -35, z: -65, w: 15, h: 25, d: 15 }
        ];

        resBuildings.forEach((b, idx) => {
            const mesh = BABYLON.MeshBuilder.CreateBox("res_b_" + idx, { width: b.w, height: b.h, depth: b.d }, scene);
            mesh.position = new BABYLON.Vector3(b.x, b.h / 2, b.z);
            mesh.material = resMat;
            mesh.checkCollisions = true;
        });

        // --- ZONE 3: FUTURISTIC TRANSPORT STATION (South-East) ---
        const stationHub = BABYLON.MeshBuilder.CreateBox("transportHub", { width: 35, height: 12, depth: 35 }, scene);
        stationHub.position = new BABYLON.Vector3(45, 6, -45);
        const stationMat = new BABYLON.StandardMaterial("stationMat", scene);
        stationMat.diffuseColor = new BABYLON.Color3(0.1, 0.12, 0.2);
        stationMat.emissiveColor = new BABYLON.Color3(0.0, 0.5, 0.8);
        stationHub.material = stationMat;
        stationHub.checkCollisions = true;

        // --- ZONE 4: BUSINESS DISTRICT & CENTRAL MONUMENT (North-West) ---
        const corpBuildings = [
            { x: -35, z: 35, w: 20, h: 60, d: 20, mat: neonPink },
            { x: -65, z: 35, w: 18, h: 55, d: 18, mat: neonPink }
        ];

        corpBuildings.forEach((b, idx) => {
            const mesh = BABYLON.MeshBuilder.CreateBox("corp_b_" + idx, { width: b.w, height: b.h, depth: b.d }, scene);
            mesh.position = new BABYLON.Vector3(b.x, b.h / 2, b.z);
            mesh.material = corpMat;
            mesh.checkCollisions = true;

            const strip = BABYLON.MeshBuilder.CreateBox("corp_strip_" + idx, { width: b.w + 0.4, height: 1.5, depth: b.d + 0.4 }, scene);
            strip.position = new BABYLON.Vector3(b.x, b.h * 0.7, b.z);
            strip.material = b.mat;
        });

        // Central Signal Monolith
        const monolith = BABYLON.MeshBuilder.CreateCylinder("monolith", { diameterTop: 2, diameterBottom: 10, height: 45, tessellation: 6 }, scene);
        monolith.position = new BABYLON.Vector3(0, 22.5, 0);
        const monoMat = new BABYLON.StandardMaterial("monoMat", scene);
        monoMat.diffuseColor = new BABYLON.Color3(0.05, 0.05, 0.1);
        monoMat.emissiveColor = new BABYLON.Color3(0.0, 0.8, 0.6);
        monolith.material = monoMat;
        monolith.checkCollisions = true;

        // Street furniture & Lights (Optimized positioning)
        for (let i = -80; i <= 80; i += 40) {
            if (i === 0) continue;
            const lightPole = BABYLON.MeshBuilder.CreateCylinder("pole_" + i, { diameter: 0.4, height: 8 }, scene);
            lightPole.position = new BABYLON.Vector3(9, 4, i);
            lightPole.checkCollisions = true;

            const bulb = BABYLON.MeshBuilder.CreateSphere("bulb_" + i, { diameter: 0.8 }, scene);
            bulb.position = new BABYLON.Vector3(9, 8, i);
            const bulbMat = new BABYLON.StandardMaterial("bulbMat", scene);
            bulbMat.emissiveColor = new BABYLON.Color3(0.0, 1.0, 0.8);
            bulb.material = bulbMat;
        }
    }
};
