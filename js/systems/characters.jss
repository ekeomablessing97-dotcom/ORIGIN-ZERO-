window.CharacterSystem = {
    selectedCharacter: "Dami Adebayo",
    playerName: "Operative",
    characters: [
        { name: "Dami Adebayo", role: "Investigator", perk: "+20% Evidence Scan Range", color: new BABYLON.Color3(0.0, 0.8, 0.9), desc: "Sharp instinct for unearthing hidden corporate conspiracies in Neo-Lagos." },
        { name: "Tobi Okafor", role: "Engineer", perk: "Faster Grid Bypasses", color: new BABYLON.Color3(1.0, 0.6, 0.0), desc: "Master of hardware modifications, power grid bypasses, and machinery." },
        { name: "Malik Danjuma", role: "Explorer", perk: "+10% Movement Velocity", color: new BABYLON.Color3(0.2, 0.9, 0.4), desc: "Specializes in navigation through remote frontiers and coastal corridors." },
        { name: "Zara Eze", role: "Scientist", perk: "Faster Data Decryption", color: new BABYLON.Color3(0.8, 0.2, 0.9), desc: "Expert in anomalous signal deciphering and biochemical archives." },
        { name: "Amara Bello", role: "Strategist", perk: "+15% XP Gain Multiplier", color: new BABYLON.Color3(0.9, 0.1, 0.2), desc: "Calculated tactician with deep political and syndicate connections." },
        { name: "Nneka Okoye", role: "Technologist", perk: "Quantum Node Range Boost", color: new BABYLON.Color3(0.0, 0.4, 1.0), desc: "Adept at quantum network intrusion and AI communication nodes." }
    ],

    init: function() {
        this.createSelectionScreen();
    },

    createSelectionScreen: function() {
        const screen = document.createElement('div');
        screen.id = 'character-select-screen';
        
        let cardsHTML = '';
        this.characters.forEach((c, idx) => {
            cardsHTML += `
                <div class="char-card ${idx === 0 ? 'selected' : ''}" data-name="${c.name}">
                    <h4>${c.name}</h4>
                    <p><strong>[${c.role}]</strong></p>
                    <p>${c.desc}</p>
                    <div class="perk">Perk: ${c.perk}</div>
                </div>
            `;
        });

        screen.innerHTML = `
            <h2>ORIGIN ZERO // OPERATIVE DEPLOYMENT</h2>
            <p>Select your character profile and enter your operative callsign for Neo-Lagos (2094).</p>
            <br>
            <div class="naming-container">
                <label for="player-custom-name">OPERATIVE CALLSIGN:</label>
                <input type="text" id="player-custom-name" value="Operative Alpha" maxlength="20" />
            </div>
            <div class="char-grid">${cardsHTML}</div>
            <button id="start-game-btn">INITIALISE DEPLOYMENT</button>
        `;
        document.body.appendChild(screen);

        const cards = screen.querySelectorAll('.char-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.selectedCharacter = card.getAttribute('data-name');
            });
        });

        document.getElementById('start-game-btn').addEventListener('click', () => {
            const nameInput = document.getElementById('player-custom-name').value.trim();
            if (nameInput) {
                this.playerName = nameInput;
            }
            GameState.activeCharacter = this.selectedCharacter;
            GameState.playerName = this.playerName;

            // Apply character theme to player mesh if loaded
            if (window.Player && Player.applyCharacterTheme) {
                Player.applyCharacterTheme(this.selectedCharacter);
            }

            screen.classList.add('hidden');
        });
    }
};

window.addEventListener('DOMContentLoaded', () => {
    CharacterSystem.init();
});
