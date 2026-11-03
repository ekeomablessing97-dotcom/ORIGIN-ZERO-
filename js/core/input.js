window.GameInput = {
    keys: { w: false, a: false, s: false, d: false, jump: false },
    moveVector: { x: 0, z: 0 },

    init: function() {
        window.addEventListener('keydown', (e) => this.handleKey(e, true));
        window.addEventListener('keyup', (e) => this.handleKey(e, false));

        if (GameState.isMobile) {
            this.initTouchControls();
        }
    },

    handleKey: function(e, isDown) {
        switch(e.key.toLowerCase()) {
            case 'w': case 'arrowup': this.keys.w = isDown; break;
            case 's': case 'arrowdown': this.keys.s = isDown; break;
            case 'a': case 'arrowleft': this.keys.a = isDown; break;
            case 'd': case 'arrowright': this.keys.d = isDown; break;
            case ' ': this.keys.jump = isDown; break;
        }
    },

    initTouchControls: function() {
        const base = document.getElementById('joystick-base');
        const stick = document.getElementById('joystick-stick');
        const jumpBtn = document.getElementById('btn-jump');

        let centerX = 0;
        let centerY = 0;
        let maxDist = 35;

        base.addEventListener('touchstart', (e) => {
            const rect = base.getBoundingClientRect();
            centerX = rect.left + rect.width / 2;
            centerY = rect.top + rect.height / 2;
        });

        base.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.targetTouches[0];
            let dx = touch.clientX - centerX;
            let dy = touch.clientY - centerY;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > maxDist) {
                dx = (dx / dist) * maxDist;
                dy = (dy / dist) * maxDist;
            }

            stick.style.transform = `translate(${dx}px, ${dy}px)`;
            this.moveVector.x = dx / maxDist;
            this.moveVector.z = -dy / maxDist;
        });

        base.addEventListener('touchend', () => {
            stick.style.transform = `translate(0px, 0px)`;
            this.moveVector.x = 0;
            this.moveVector.z = 0;
        });

        jumpBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.keys.jump = true;
            setTimeout(() => { this.keys.jump = false; }, 100);
        });
    }
};
