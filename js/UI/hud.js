window.GameHUD = {
    fpsLabel: null,

    init: function(scene) {
        this.fpsLabel = document.getElementById("fps");
    },

    update: function(engine) {
        if (this.fpsLabel) {
            this.fpsLabel.innerText = Math.round(engine.getFps());
        }
    }
};
