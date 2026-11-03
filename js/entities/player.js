window.Player = {
    mesh: null,
    speed: 8.0,
    jumpForce: 6.0,
    verticalVelocity: 0,
    isGrounded: true,
    animTimer: 0,

    init: function(scene) {
        this.mesh = BABYLON.MeshBuilder.CreateCapsule("player", { radius: 0.6, height: 2.2 }, scene);
        this.mesh.position = new BABYLON.Vector3(0, 1.1, 0);
        
        this.applyCharacterTheme(GameState.activeCharacter || "Dami Adebayo");
    },

    applyCharacterTheme: function(charName) {
        if (!this.mesh || !this.mesh.getScene()) return;
        const scene = this.mesh.getScene();
        
        const charData = CharacterSystem.characters.find(c => c.name === charName) || CharacterSystem.characters[0];
        
        const mat = new BABYLON.StandardMaterial("playerMat", scene);
        mat.diffuseColor = charData.color;
        mat.emissiveColor = charData.color.scale(0.3);
        this.mesh.material = mat;
    },

    update: function(dt) {
        if (!this.mesh) return;

        let inputX = 0;
        let inputZ = 0;

        if (GameInput.keys.w) inputZ += 1;
        if (GameInput.keys.s) inputZ -= 1;
        if (GameInput.keys.a) inputX -= 1;
        if (GameInput.keys.d) inputX += 1;

        if (GameInput.moveVector.x !== 0 || GameInput.moveVector.z !== 0) {
            inputX = GameInput.moveVector.x;
            inputZ = GameInput.moveVector.z;
        }

        const moveDir = new BABYLON.Vector3(inputX, 0, inputZ);
        const isMoving = moveDir.length() > 0;

        if (isMoving) {
            moveDir.normalize();
            this.mesh.moveWithCollisions(moveDir.scale(this.speed * dt));
            
            const angle = Math.atan2(inputX, inputZ);
            this.mesh.rotation.y = angle;

            // Running / Walking procedural bobbing animation
            this.animTimer += dt * 12;
            this.mesh.scaling.y = 1.0 + Math.sin(this.animTimer) * 0.05;
        } else {
            // Idle breathing animation
            this.animTimer += dt * 3;
            this.mesh.scaling.y = 1.0 + Math.sin(this.animTimer) * 0.02;
        }

        if (!this.isGrounded) {
            this.verticalVelocity -= 9.81 * dt;
        } else if (GameInput.keys.jump) {
            this.verticalVelocity = this.jumpForce;
            this.isGrounded = false;
        }

        this.mesh.moveWithCollisions(new BABYLON.Vector3(0, this.verticalVelocity * dt, 0));

        if (this.mesh.position.y <= 1.1) {
            this.mesh.position.y = 1.1;
            this.verticalVelocity = 0;
            this.isGrounded = true;
        }

        GameState.playerCoords = {
            x: Math.round(this.mesh.position.x * 10) / 10,
            y: Math.round(this.mesh.position.y * 10) / 10,
            z: Math.round(this.mesh.position.z * 10) / 10
        };
    }
};
