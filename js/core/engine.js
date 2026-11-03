window.GameEngine = {
    canvas: null,
    engine: null,
    scene: null,

    init: function() {
        this.canvas = document.getElementById("renderCanvas");
        this.engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
        this.scene = new BABYLON.Scene(this.engine);
        
        this.scene.clearColor = new BABYLON.Color3(0.02, 0.02, 0.05);

        GameInput.init();
        Environment.init(this.scene);
        NeoLagos.init(this.scene);
        Player.init(this.scene);
        GameCamera.init(this.scene, Player.mesh);
        GameHUD.init(this.scene);

        this.engine.runRenderLoop(() => {
            const dt = this.engine.getDeltaTime() / 1000;
            Player.update(dt);
            GameCamera.update();
            this.scene.render();
            GameHUD.update(this.engine);
        });

        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }
};

window.addEventListener("DOMContentLoaded", () => {
    GameEngine.init();
});
