window.NPCSystem = {
    activeNPC: null,

    init: function(scene) {
        this.createDOM();
        this.spawnNPCs(scene);
    },

    createDOM: function() {
        const box = document.createElement('div');
        box.id = 'dialogue-box';
        box.innerHTML = `
            <div id="npc-name" class="dialogue-speaker">NPC</div>
            <div id="npc-text" class="dialogue-text">Dialogue text goes here...</div>
            <div id="npc-options" class="dialogue-options"></div>
        `;
        document.body.appendChild(box);
    },

    spawnNPCs: function(scene) {
        const npcMesh = BABYLON.MeshBuilder.CreateCapsule("npc_imani", { radius: 0.6, height: 2.2 }, scene);
        npcMesh.position = new BABYLON.Vector3(5, 1.1, 15);
        
        const mat = new BABYLON.StandardMaterial("npcMat", scene);
        mat.diffuseColor = new BABYLON.Color3(0.9, 0.5, 0.0);
        npcMesh.material = mat;

        scene.registerBeforeRender(() => {
            if (!Player.mesh) return;
            const dist = BABYLON.Vector3.Distance(Player.mesh.position, npcMesh.position);
            if (dist < 4.0) {
                const aiResponse = AdvancedAISystem.processQuery("Dr. Imani Adeyemi", "The Architect");
                this.showDialogue("Dr. Imani Adeyemi", `Operative, the transmission isn't random. ${aiResponse}`, [
                    { text: "What do you know about The Architect?", response: "They vanished during the 2088 blackout. But their code remains embedded in the regional grid." },
                    { text: "I'll investigate the research station.", response: "Be careful. Abuja's security nodes are already monitoring this sector." },
                    { text: "Leave conversation", action: "close" }
                ]);
            } else {
                this.closeDialogue();
            }
        });
    },

    showDialogue: function(speaker, text, options) {
        const box = document.getElementById('dialogue-box');
        if (box.classList.contains('active') && document.getElementById('npc-text').innerText === text) return;

        document.getElementById('npc-name').innerText = speaker;
        document.getElementById('npc-text').innerText = text;
        
        const optsContainer = document.getElementById('npc-options');
        optsContainer.innerHTML = '';

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'dialogue-opt-btn';
            btn.innerText = opt.text;
            btn.addEventListener('click', () => {
                if (opt.action === 'close') {
                    this.closeDialogue();
                } else {
                    document.getElementById('npc-text').innerText = opt.response;
                    optsContainer.innerHTML = `<button class="dialogue-opt-btn" onclick="NPCSystem.closeDialogue()">[Disconnect]</button>`;
                }
            });
            optsContainer.appendChild(btn);
        });

        box.classList.add('active');
    },

    closeDialogue: function() {
        const box = document.getElementById('dialogue-box');
        box.classList.remove('active');
    }
};
