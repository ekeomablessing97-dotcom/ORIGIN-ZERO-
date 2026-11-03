window.NeoLagos = {
    init: function(scene) {
        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 150, height: 150 }, scene);
        const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
        groundMat.diffuseColor = new BABYLON.Color3(0.05, 0.05, 0.08);
        groundMat.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        ground.material = groundMat;
        ground.checkCollisions = true;

        const buildingMat = new BABYLON.StandardMaterial("buildingMat", scene);
        buildingMat.diffuseColor = new BABYLON.Color3(0.08, 0.09, 0.15);
        buildingMat.emissiveColor = new BABYLON.Color3(0.0, 0.05, 0.1);

        const neonMat = new BABYLON.StandardMaterial("neonMat", scene);
        neonMat.emissiveColor = new BABYLON.Color3(1.0, 0.0, 0.3);

        const positions = [
            { x: -25, z: 25, w: 12, h: 45, d: 12 },
            { x: 25, z: 25, w: 15, h: 60, d: 15 },
            { x: -25, z: -25, w: 14, h: 35, d: 14 },
            { x: 25, z: -25, w: 18, h: 50, d: 18 },
            { x: 0, z: 40, w: 20, h: 70, d: 15 }
        ];

        positions.forEach((p, index) => {
            const building = BABYLON.MeshBuilder.CreateBox("building_" + index, { width: p.w, height: p.h, depth: p.d }, scene);
            building.position = new BABYLON.Vector3(p.x, p.h / 2, p.z);
            building.material = buildingMat;
            building.checkCollisions = true;

            const strip = BABYLON.MeshBuilder.CreateBox("neon_" + index, { width: p.w + 0.2, height: 1.5, depth: p.d + 0.2 }, scene);
            strip.position = new BABYLON.Vector3(p.x, p.h * 0.75, p.z);
            strip.material = neonMat;
        });
    }
};
