window.CharacterSystem = {
    selectedCharacter: "Dami Adebayo",
    characters: [
        { name: "Dami Adebayo", role: "Investigator", desc: "Sharp instinct for unearthing hidden corporate conspiracies in Neo-Lagos." },
        { name: "Tobi Okafor", role: "Engineer", desc: "Master of hardware modifications, power grid bypasses, and machinery." },
        { name: "Malik Danjuma", role: "Explorer", desc: "Specializes in navigation through remote frontiers and coastal corridors." },
        { name: "Zara Eze", role: "Scientist", desc: "Expert in anomalous signal deciphering and biochemical archives." },
        { name: "Amara Bello", role: "Strategist", desc: "Calculated tactician with deep political and syndicate connections." },
        { name: "Nneka Okoye", role: "Technologist", desc: "Adept at quantum network intrusion and AI communication nodes." }
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
                </div>
            `;
        });

        screen.innerHTML = `
            <h2>ORIGIN ZERO // SELECT OPERATIVE</h2>
            <p>Choose your investigator profile for the 2094 Neo-Lagos deployment.</p>
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
                GameState.activeCharacter = this.selectedCharacter;
            });
        });

        document.getElementById('start-game-btn').addEventListener('click', () => {
            screen.classList.add('hidden');
        });
    }
};

window.addEventListener('DOMContentLoaded', () => {
    CharacterSystem.init();
});
