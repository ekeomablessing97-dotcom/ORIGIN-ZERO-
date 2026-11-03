window.NexusDevice = {
    isOpen: false,

    init: function() {
        this.createDOM();
        this.bindEvents();
    },

    createDOM: function() {
        const overlay = document.createElement('div');
        overlay.id = 'nexus-overlay';
        overlay.innerHTML = `
            <div class="nexus-header">
                <span class="nexus-title">NEXUS WRIST OS // v2.94 [SECTOR 7]</span>
                <button class="nexus-close-btn" id="nexus-close">CLOSE</button>
            </div>
            <div class="nexus-body">
                <div class="nexus-sidebar">
                    <button class="nexus-tab-btn active" data-target="pane-missions">Missions</button>
                    <button class="nexus-tab-btn" data-target="pane-map">Interactive Map</button>
                    <button class="nexus-tab-btn" data-target="pane-messages">Messages</button>
                    <button class="nexus-tab-btn" data-target="pane-evidence">Evidence</button>
                    <button class="nexus-tab-btn" data-target="pane-contacts">Contacts</button>
                    <button class="nexus-tab-btn" data-target="pane-inventory">Inventory</button>
                    <button class="nexus-tab-btn" data-target="pane-database">Database</button>
                    <button class="nexus-tab-btn" data-target="pane-settings">Settings</button>
                </div>
                <div class="nexus-content-panel">
                    <div id="pane-missions" class="nexus-pane active">
                        <h3>Active Missions</h3>
                        <div id="nexus-missions-list"></div>
                    </div>
                    <div id="pane-map" class="nexus-pane">
                        <h3>Neo-Lagos Regional Map (2094)</h3>
                        <p>Current Sector: Sector 7 - Central Business & Tech Hub</p>
                        <p>Connected Zones: Mainland Expressway, Marina Coastal Node, Eko Atlantic Link.</p>
                    </div>
                    <div id="pane-messages" class="nexus-pane">
                        <h3>Encrypted Transmissions</h3>
                        <p><strong>From: [Unknown Sender / Architect Node]</strong></p>
                        <p>"The signal returns through the static. Do not trust the official broadcast from Abuja."</p>
                    </div>
                    <div id="pane-evidence" class="nexus-pane">
                        <h3>Investigative Evidence & Logs</h3>
                        <div id="nexus-evidence-list"></div>
                    </div>
                    <div id="pane-contacts" class="nexus-pane">
                        <h3>Secure Contacts</h3>
                        <p>• Dr. Imani Adeyemi (Senior Researcher)</p>
                        <p>• Kene Nwosu (Systems Engineer)</p>
                    </div>
                    <div id="pane-inventory" class="nexus-pane">
                        <h3>Wrist Device Storage</h3>
                        <div id="nexus-inventory-list"></div>
                    </div>
                    <div id="pane-database" class="nexus-pane">
                        <h3>Discovery Database</h3>
                        <p>• History of the 2088 Grid Interruption</p>
                        <p>• Architectural blueprints of Neo-Lagos megastructures.</p>
                    </div>
                    <div id="pane-settings" class="nexus-pane">
                        <h3>NEXUS System Settings</h3>
                        <p>Operative Level: <span id="nexus-level">1</span> (XP: <span id="nexus-xp">0</span>)</p>
                        <p>Encryption Protocol: AES-2094 Active</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'nexus-toggle-btn';
        toggleBtn.innerText = 'NEXUS [N]';
        document.body.appendChild(toggleBtn);
    },

    bindEvents: function() {
        const overlay = document.getElementById('nexus-overlay');
        const toggleBtn = document.getElementById('nexus-toggle-btn');
        const closeBtn = document.getElementById('nexus-close');
        const tabs = document.querySelectorAll('.nexus-tab-btn');
        const panes = document.querySelectorAll('.nexus-pane');

        const toggleNexus = () => {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.refreshDynamicContent();
                overlay.classList.add('active');
            } else {
                overlay.classList.remove('active');
            }
        };

        toggleBtn.addEventListener('click', toggleNexus);
        closeBtn.addEventListener('click', toggleNexus);

        window.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'n') {
                toggleNexus();
            }
        });

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                panes.forEach(p => p.classList.remove('active'));

                tab.classList.add('active');
                const targetPane = document.getElementById(tab.getAttribute('data-target'));
                if (targetPane) targetPane.classList.add('active');
            });
        });
    },

    refreshDynamicContent: function() {
        const mList = document.getElementById('nexus-missions-list');
        if (mList) {
            mList.innerHTML = GameState.missions.map(m => `
                <p><strong>${m.title}</strong><br>Status: ${m.status}<br>${m.desc}</p><br>
            `).join('');
        }

        const eList = document.getElementById('nexus-evidence-list');
        if (eList) {
            eList.innerHTML = GameState.evidenceLog.map(e => `<p>• ${e}</p>`).join('');
        }

        const iList = document.getElementById('nexus-inventory-list');
        if (iList) {
            iList.innerHTML = GameState.inventory.map(i => `<p>• ${i}</p>`).join('');
        }

        document.getElementById('nexus-level').innerText = GameState.level;
        document.getElementById('nexus-xp').innerText = GameState.experience;
    }
};

window.addEventListener('DOMContentLoaded', () => {
    NexusDevice.init();
});
