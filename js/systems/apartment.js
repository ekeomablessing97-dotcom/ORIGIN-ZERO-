window.ApartmentSystem = {
    init: function(scene) {
        const aptNode = BABYLON.MeshBuilder.CreateBox("playerApartment", { width: 8, height: 4, depth: 8 }, scene);
        aptNode.position = new BABYLON.Vector3(-20, 2.0, 0);

        const mat = new BABYLON.StandardMaterial("aptMat", scene);
        mat.emissiveColor = new BABYLON.Color3(0.0, 0.8, 0.4);
        aptNode.material = mat;

        scene.registerBeforeRender(() => {
            if (!Player.mesh) return;
            const dist = BABYLON.Vector3.Distance(Player.mesh.position, aptNode.position);
            if (dist < 3.5) {
                // Apartment workstation proximity handler
            }
        });
    }
};
