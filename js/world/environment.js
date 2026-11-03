window.Environment = {
    init: function(scene) {
        const light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
        light.diffuse = new BABYLON.Color3(0.1, 0.4, 0.6);
        light.groundColor = new BABYLON.Color3(0.05, 0.05, 0.1);
        light.intensity = 0.7;

        const dirLight = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(-1, -2, -1), scene);
        dirLight.diffuse = new BABYLON.Color3(0.8, 0.2, 0.9);
        dirLight.intensity = 0.4;

        scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
        scene.fogColor = new BABYLON.Color3(0.03, 0.03, 0.08);
        scene.fogDensity = 0.015;
    }
};
