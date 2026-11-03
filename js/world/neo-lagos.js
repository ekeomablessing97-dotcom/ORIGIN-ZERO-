window.NeoLagos = {
    init: function(scene) {
        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 300, height: 300 }, scene);
        const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
        groundMat.diffuseColor = new BABYLON.Color3(0.04, 0.04, 0.07);
        groundMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        ground.material = groundMat;
        ground.checkCollisions = true;

        const buildingMat = new BABYLON.StandardMaterial("buildingMat", scene);
        buildingMat.diffuseColor = new BABYLON.Color3(0.07, 0.08, 0.14);
        buildingMat.emissiveColor = new BABYLON.Color3(0.0, 0.03, 0.08);

        const neonPink = new BABYLON.StandardMaterial("neonPink", scene);
        neonPink.emissiveColor = new BABYLON.Color3(1.0, 0.0, 0.4);

        const neonCyan = new BABYLON.StandardMaterial("neonCyan", scene);
        neonCyan.emissiveColor = new BABYLON.Color3(0.0, 0.9, 1.0);

        const neonGold = new BABYLON.StandardMaterial("neonGold", scene);
        neonGold.emissiveColor = new BABYLON.Color3(1.0, 0.7, 0.0);

        const structures = [
            { x: -30, z: 30, w: 14, h: 55, d: 14, mat: neonPink },
            { x: 30, z: 30, w: 16, h: 70, d: 16, mat: neonCyan },
            { x: -30, z: -30, w: 15, h: 45, d: 15, mat: neonPink },
            { x: 30, z: -30, w: 20, h: 80, d: 18, mat: neonCyan },
            { x: 0, z: 60, w: 25, h: 35, d: 25, mat: neonGold },
            { x: -55, z: 0, w: 18, h: 50, d: 18, mat: neonCyan },
            { x: 55, z: 0, w: 22, h: 25, d: 22, mat: neonPink },
            { x: 0, z: -60, w: 30, h: 40, d: 20, mat: neonGold },
            { x: -50, z: 50, w: 12, h: 30, d: 12, mat: neonGold },
            { x: 50, z: 50, w: 12, h: 35, d: 12, mat: neonPink },
            { x: -50, z: -50, w: 14, h: 28, d: 14, mat: neonPink },
            { x: 50, z: -50, w: 14, h: 40, d: 14, mat: neonCyan }
        ];

        structures.forEach((s, index) => {
            const b = BABYLON.MeshBuilder.CreateBox("building_" + index, { width: s.w, height: s.h, depth: s.d }, scene);
            b.position = new BABYLON.Vector3(s.x, s.h / 2, s.z);
            b.material = buildingMat;
            b.checkCollisions = true;

            const strip = BABYLON.MeshBuilder.CreateBox("neon_strip_" + index, { width: s.w + 0.3, height: 1.2, depth: s.d + 0.3 }, scene);
            strip.position = new BABYLON.Vector3(s.x, s.h * 0.75, s.z);
            strip.material = s.mat;
        });

        const monumentBase = BABYLON.MeshBuilder.CreateCylinder("monument", { diameterTop: 2, diameterBottom: 8, height: 35, tessellation: 6 }, scene);
        monumentBase.position = new BABYLON.Vector3(0, 17.5, 0);
        const monumentMat = new BABYLON.StandardMaterial("monumentMat", scene);
        monumentMat.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.2);
        monumentMat.emissiveColor = new BABYLON.Color3(0.0, 0.4, 0.6);
        monumentBase.material = monumentMat;
        monumentBase.checkCollisions = true;
    }
};
