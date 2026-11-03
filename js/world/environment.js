window.Environment = {
    init: function(scene) {
        // Atmospheric Night Lighting (Cyberpunk Tone)
        const light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
        light.diffuse = new BABYLON.Color3(0.12, 0.35, 0.55);
        light.groundColor = new BABYLON.Color3(0.05, 0.05, 0.1);
        light.intensity = 0.8;

        // Key Directional Glow
        const dirLight = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(-1, -2, -1), scene);
        dirLight.diffuse = new BABYLON.Color3(0.9, 0.2, 0.8);
        dirLight.intensity = 0.5;

        // Cyberpunk Atmospheric Fog
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
        scene.fogColor = new BABYLON.Color3(0.02, 0.03, 0.07);
        scene.fogDensity = 0.012;
    }
};
