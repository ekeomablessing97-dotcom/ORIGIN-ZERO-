window.NPCSystem = {
    npcs: [],
    activeNPC: null,
    currentDialogueNode: null,

    init: function(scene) {
        this.createDOM();
        this.spawnNPCs(scene);
        this.startBehaviorLoop(scene);
    },

    createDOM: function() {
        // Interaction Button for Mobile / Desktop
        const promptBtn = document.createElement('button');
        promptBtn.id = 'interaction-prompt';
        promptBtn.innerText = '[INTERACT]';
        document.body.appendChild(promptBtn);

        // Dialogue Box UI
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
        const npcData = [
            { name: "Dr. Imani Adeyemi", role: "Researcher", location: new BABYLON.Vector3(35, 1.1, 45), color: new BABYLON.Color3(0.9, 0.5, 0.0), desc: "Senior researcher at Neo-Lagos Technology University studying grid anomalies." },
            { name: "Kene Nwosu", role: "Mechanic", location: new BABYLON.Vector3(55, 1.1, -45), color: new BABYLON.Color3(1.0, 0.3, 0.1), desc: "Workshop owner specializing in hardware modifications and power bypasses." },
            { name: "Detective Sade Williams", role: "Investigator", location: new BABYLON.Vector3(-35, 1.1, 35), color: new BABYLON.Color3(0.0, 0.6, 1.0), desc: "Investigates unauthorized tech incursions and corporate cover-ups." },
            { name: "Mr. Ekon", role: "Archivist", location: new BABYLON.Vector3(0, 1.1, -60), color: new BABYLON.Color3(0.7, 0.7, 0.7), desc: "Historical archivist guarding data logs from before the 2088 blackout." },
            { name: "Tomi Akinwale", role: "Transport Pilot", location: new BABYLON.Vector3(20, 1.1, 0), color: new BABYLON.Color3(0.2, 0.9, 0.7), desc: "Veteran transport pilot navigating regional routes across Nigeria." }
        ];

        npcData.forEach((data, index) => {
            const mesh = BABYLON.MeshBuilder.CreateCapsule("npc_" + index, { radius: 0.6, height: 2.2 }, scene);
            mesh.position = data.location.clone();
            
            const mat = new BABYLON.StandardMaterial("npcMat_" + index, scene);
            mat.diffuseColor = data.color;
            mat.emissiveColor = data.color.scale(0.3);
            mesh.material = mat;
            mesh.checkCollisions = true;

            this.npcs.push({
                name: data.name,
                role: data.role,
                mesh: mesh,
                basePos: data.location.clone(),
                desc: data.desc
            });
        });
    },

    startBehaviorLoop: function(scene) {
        let timer = 0;
        scene.registerBeforeRender(() => {
            if (!Player.mesh) return;
            const dt = scene.getEngine().getDeltaTime() / 1000;
            timer += dt;

            // Simple routine: gentle patrolling back and forth
            this.npcs.forEach((npc, idx) => {
                npc.mesh.position.x = npc.basePos.x + Math.sin(timer * 0.5 + idx) * 3;
            });

            // Check proximity to player
            let nearestNPC = null;
            let minDist = 4.5;

            this.npcs.forEach(npc => {
                const dist = BABYLON.Vector3.Distance(Player.mesh.position, npc.mesh.position);
                if (dist < minDist) {
                    minDist = dist;
                    nearestNPC = npc;
                }
            });

            const promptBtn = document.getElementById('interaction-prompt');
            if (nearestNPC) {
                this.activeNPC = nearestNPC;
                promptBtn.classList.add('active');
                promptBtn.innerText = `[INTERACT: ${nearestNPC.name}]`;
                
                promptBtn.onclick = () => {
                    this.triggerDialogue(nearestNPC);
                };
            } else {
                if (!document.getElementById('dialogue-box').classList.contains('active')) {
                    this.activeNPC = null;
                    promptBtn.classList.remove('active');
                }
            }
        });
    },

    triggerDialogue: function(npc) {
        let initialText = `Hello, ${GameState.playerName || 'Operative'}. What brings you to my sector?`;
        let options = [];

        if (npc.name === "Dr. Imani Adeyemi") {
            initialText = "Operative, the power fluctuation near the University isn't natural. Someone is broadcasting using an old frequency associated with The Architect.";
            options = [
                { text: "Tell me about The Architect.", next: "architect" },
                { text: "I'm investigating Mission 001: A Strange Arrival.", next: "mission1" },
                { text: "Disconnect", action: "close" }
            ];
        } else if (npc.name === "Kene Nwosu") {
            initialText = "Need your gear tuned? The power grid in Sector 7 has been acting weird all morning.";
            options = [
                { text: "Have you noticed any missing researchers?", next: "missing" },
                { text: "Run local diagnostic query (AI Fallback)", next: "ai_query" },
                { text: "Disconnect", action: "close" }
            ];
        } else if (npc.name === "Detective Sade Williams") {
            initialText = "Keep your nose clean, Operative. Abuja is monitoring all data traffic through the central nodes.";
            options = [
                { text: "What do you know about The Unknown Message?", next: "message" },
                { text: "Disconnect", action: "close" }
            ];
        } else {
            initialText = `Greetings from ${npc.role} station. The regional networks are unstable today.`;
            options = [
                { text: "Disconnect", action: "close" }
            ];
        }

        this.showDialogue(npc.name, initialText, options);
    },

    showDialogue: function(speaker, text, options) {
        const box = document.getElementById('dialogue-box');
        document.getElementById('npc-name').innerText = speaker;
        document.getElementById('npc-text').innerText = text;

        const optsContainer = document.getElementById('npc-options');
        optsContainer.innerHTML = '';

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'dialogue-opt-btn';
            btn.innerText = opt.text;
            btn.addEventListener('click', () => {
                this.handleDialogueChoice(opt);
            });
            optsContainer.appendChild(btn);
        });

        box.classList.add('active');
        document.getElementById('interaction-prompt').classList.remove('active');
    },

    handleDialogueChoice: function(opt) {
        if (opt.action === 'close') {
            this.closeDialogue();
            return;
        }

        if (opt.next === 'architect') {
            this.showDialogue("Dr. Imani Adeyemi", "The Architect left behind encrypted nodes before disappearing in 2088. If someone is waking them up, Neo-Lagos is in danger.", [
                { text: "I'll keep searching for clues.", action: "close" }
            ]);
            GameState.evidenceLog.push("Audio Log: Mention of Architect encrypted nodes from 2088.");
        } else if (opt.next === 'mission1') {
            this.showDialogue("Dr. Imani Adeyemi", "Check the research beacon near Victoria Island. That's where the signal spiked.", [
                { text: "Understood.", action: "close" }
            ]);
        } else if (opt.next === 'missing') {
            this.showDialogue("Kene Nwosu", "Two research assistants vanished near the lagoon docks last night. Their equipment was left powered on.", [
                { text: "Add Mission: The Missing Researchers", action: "add_mission" }
            ]);
        } else if (opt.next === 'add_mission') {
            if (window.MissionSystem) {
                MissionSystem.addMission("M003", "Mission 003: The Missing Researchers", "Investigate the lagoon docks where the assistants vanished.");
            }
            alert("NEW MISSION LOGGED IN NEXUS OS");
            this.closeDialogue();
        } else if (opt.next === 'ai_query') {
            const fallback = AdvancedAISystem ? AdvancedAISystem.processQuery(this.activeNPC.name, "grid bypass") : "Grid protocol secure.";
            this.showDialogue(this.activeNPC.name, `[LOCAL AI DIAGNOSTIC]: ${fallback}`, [
                { text: "Thanks", action: "close" }
            ]);
        } else {
            this.closeDialogue();
        }
    },

    closeDialogue: function() {
        const box = document.getElementById('dialogue-box');
        box.classList.remove('active');
        this.activeNPC = null;
    }
};
