window.GameCamera = {
    camera: null,

    init: function(scene, targetMesh) {
        this.camera = new BABYLON.ArcRotateCamera("ThirdPersonCam", -Math.PI / 2, Math.PI / 3, 12, targetMesh.position, scene);
        this.camera.lowerRadiusLimit = 6;
        this.camera.upperRadiusLimit = 25;
        this.camera.lowerBetaLimit = 0.2;
        this.camera.upperBetaLimit = Math.PI / 2.1;
        
        this.camera.attachControl(scene.getEngine().getRenderingCanvas(), true);
    },

    update: function() {
        // ArcRotateCamera automatically tracks linked targets
    }
};
