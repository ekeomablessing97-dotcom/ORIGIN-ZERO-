window.TransportSystem = {
    init: function(scene) {
        const station = BABYLON.MeshBuilder.CreateBox("transportStation", { width: 6, height: 4, depth: 6 }, scene);
        station.position = new BABYLON.Vector3(20, 2.0, 0);

        const mat = new BABYLON.StandardMaterial("stationMat", scene);
        mat.emissiveColor = new BABYLON.Color3(1.0, 0.5, 0.0);
        station.material = mat;

        scene.registerBeforeRender(() => {
            if (!Player.mesh) return;
            const dist = BABYLON.Vector3.Distance(Player.mesh.position, station.position);
            if (dist < 3.5) {
                // Transport node proximity handler
            }
        });
    }
};
