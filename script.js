const app = {
    state: {
        step: 1,
        totalSteps: 6,
        data: {
            crisis: [],
            time: "",         // Was "1 Hari"
            location: { type: "", climate: "" },
            socio: { source: "", dependents: 1 },
            resources: { skills: [], assets: [], community: "" }
        },
        result: null
    },

    init: function () {
        this.renderOptions();
        this.updateUI();
    },

    renderOptions: function () {
        // Render Crisis Options
        const crisisContainer = document.getElementById('crisis-options');
        UI_DATA.crisisOptions.forEach(opt => {
            const el = document.createElement('div');
            el.className = 'option-card';
            el.innerHTML = `<span class="icon">${opt.icon}</span><div class="label">${opt.label}</div>`;
            el.onclick = () => this.toggleSelection('crisis', opt.id, el, true);
            crisisContainer.appendChild(el);
        });

        // Render Time Options
        const timeContainer = document.getElementById('time-options');
        UI_DATA.timeOptions.forEach(opt => {
            const el = document.createElement('div');
            el.className = 'option-card';
            el.innerHTML = `<div class="label">${opt.label}</div>`;
            el.onclick = () => this.setSelection('time', opt.id, el, 'time-options');
            timeContainer.appendChild(el);
        });

        // Render Location Options
        this.renderGroup('location-type-options', UI_DATA.locationTypes, (val) => this.state.data.location.type = val);
        this.renderGroup('climate-options', UI_DATA.climates, (val) => this.state.data.location.climate = val);

        // Render Socio Options
        this.renderGroup('income-source-options', UI_DATA.incomeSources, (val) => this.state.data.socio.source = val);

        // Render Skills & Assets (Chips)
        this.renderChips('skills-options', UI_DATA.skills, 'skills');
        this.renderChips('assets-options', UI_DATA.assets, 'assets');

        // Render Community
        this.renderGroup('community-options', UI_DATA.communities, (val) => this.state.data.resources.community = val);
    },

    renderGroup: function (containerId, options, callback) {
        const container = document.getElementById(containerId);
        if (!container) return;
        options.forEach(opt => {
            const el = document.createElement('div');
            el.className = 'option-card';
            el.innerHTML = `<div class="label">${opt.label}</div>`;
            el.onclick = () => {
                Array.from(container.children).forEach(c => c.classList.remove('selected'));
                el.classList.add('selected');
                callback(opt.id);
            };
            container.appendChild(el);
        });
    },

    renderChips: function (containerId, options, key) {
        const container = document.getElementById(containerId);
        options.forEach(opt => {
            const el = document.createElement('div');
            el.className = 'chip';
            el.textContent = opt;
            el.onclick = () => {
                el.classList.toggle('selected');
                const idx = this.state.data.resources[key].indexOf(opt);
                if (idx === -1) this.state.data.resources[key].push(opt);
                else this.state.data.resources[key].splice(idx, 1);
            };
            container.appendChild(el);
        });
    },

    toggleSelection: function (key, value, element, isArray) {
        if (isArray) {
            const idx = this.state.data[key].indexOf(value);
            if (idx === -1) {
                this.state.data[key].push(value);
                element.classList.add('selected');
            } else {
                this.state.data[key].splice(idx, 1);
                element.classList.remove('selected');
            }
        }
    },

    setSelection: function (key, value, element, containerId) {
        this.state.data[key] = value;
        const container = document.getElementById(containerId);
        Array.from(container.children).forEach(c => c.classList.remove('selected'));
        element.classList.add('selected');
    },

    adjustDependents: function (delta) {
        let newVal = this.state.data.socio.dependents + delta;
        if (newVal < 1) newVal = 1;
        if (newVal > 20) newVal = 20;
        this.state.data.socio.dependents = newVal;
        document.getElementById('dependents-display').textContent = newVal;
    },

    validateStep: function () {
        const s = this.state.step;
        const d = this.state.data;
        let valid = true;
        let msg = "";

        if (s === 2 && d.crisis.length === 0) {
            valid = false; msg = "Pilih minimal satu ancaman krisis.";
        }
        if (s === 3 && d.time === "") {
            valid = false; msg = "Pilih perkiraan durasi krisis.";
        }
        if (s === 4 && (d.location.type === "" || d.location.climate === "")) {
            valid = false; msg = "Lengkapi data lokasi dan iklim.";
        }
        if (s === 5 && d.socio.source === "") {
            valid = false; msg = "Pilih sumber penghasilan utama.";
        }
        if (s === 6 && d.resources.community === "") {
            valid = false; msg = "Pilih kondisi komunitas sekitar.";
        }

        if (!valid) {
            alert("⚠️ " + msg);
            return false;
        }
        return true;
    },

    nextStep: function () {
        if (this.validateStep()) {
            if (this.state.step < this.state.totalSteps + 2) {
                this.state.step++;
                this.updateUI();
                return true;
            }
        }
        return false;
    },

    prevStep: function () {
        if (this.state.step > 1) {
            this.state.step--;
            this.updateUI();
        }
    },

    updateUI: function () {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

        if (this.state.step > 1 && this.state.step < 7) {
            document.getElementById('app-header').classList.remove('hidden');
            const pct = ((this.state.step - 1) / (this.state.totalSteps)) * 100;
            document.getElementById('progress-fill').style.width = `${pct}%`;
            document.getElementById('current-step').textContent = this.state.step - 1;
        } else {
            document.getElementById('app-header').classList.add('hidden');
        }

        const map = {
            1: 'screen-splash',
            2: 'screen-crisis',
            3: 'screen-time',
            4: 'screen-location',
            5: 'screen-socio',
            6: 'screen-resources',
            7: 'screen-generating',
            8: 'screen-result'
        };

        const activeId = map[this.state.step];
        if (activeId) document.getElementById(activeId).classList.add('active');
    },

    generatePlan: function () {
        if (!this.nextStep()) return; // Ensure Step 6 is valid before starting

        const genText = document.getElementById('generating-text');
        const msgs = ["Menganalisis Risiko...", "Mengkalkulasi Logistik...", "Menyusun Strategi..."];

        let i = 0;
        const interval = setInterval(() => {
            genText.textContent = msgs[i % msgs.length];
            i++;
        }, 500);

        setTimeout(() => {
            clearInterval(interval);
            try {
                this.createResult();
            } catch (e) {
                console.error("Error generating plan:", e);
                this.state.result = {
                    riskSummary: ["Gagal memproses detail risiko."],
                    priority24h: "Segera evakuasi.",
                    strategyFull: "Terjadi kesalahan sistem.",
                    foodAdvice: "Amankan stok pangan.",
                    waterAdvice: "Cari air bersih.",
                    puriAdvice: "Rebus semua air.",
                    roles: { Individu: "-", "Kepala Keluarga": "-", Komunitas: "-" },
                    avoidList: ["Jangan panik."],
                    checklist: ["Periksa kembali data input."]
                };
            } finally {
                this.nextStep(); // Force navigation to result result
                this.renderResult();
            }
        }, 1500); // 1.5 seconds is faster but enough to read "Analyzing"
    },

    // ----------------------------------------------------
    // CORE LOGIC: MANDATORY 8-SECTION FORMAT
    // ----------------------------------------------------
    createResult: function () {
        const d = this.state.data;
        const kb = KNOWLEDGE_BASE;

        // --- 1. RINGKASAN RISIKO UTAMA ---
        let riskSummary = [];
        d.crisis.forEach(c => {
            if (kb.crisis[c]) riskSummary.push(`<b>${c}:</b> ${kb.crisis[c].risk}`);
        });
        // Location risk
        if (d.location.type) {
            riskSummary.push(`<b>Lokasi (${d.location.type}):</b> ${kb.location_advice[d.location.type]?.food || "Risiko spesifik lokasi."}`);
        }

        // --- 2. PRIORITAS 24 JAM PERTAMA ---
        let priority24h = kb.timeline[d.time]?.priority_24h || "Evaluasi keselamatan diri dan keluarga.";

        // --- 3. STRATEGI BERTAHAN SESUAI SKENARIO WAKTU ---
        let strategyTime = kb.timeline[d.time]?.strategy || "Bertahan hidup dengan resourse yang ada.";
        let strategyLoc = kb.location_advice[d.location.type]?.strategy || "";
        let strategyFull = `${strategyTime} ${strategyLoc}`;

        // --- 4. PANGAN PENGGANTI & SUMBER ENERGI ---
        let foodSources = kb.food_sources; // Get all
        let foodAdvice = `Prioritaskan: ${foodSources.Karbohidrat.slice(0, 2).join(", ")}.`;

        // --- 5. AIR & SANITASI ---
        let waterAdvice = kb.water_sanitation.Sumber[d.location.climate === 'Hujan' ? 'Hujan' : 'Sumur'] || kb.water_sanitation.Sumber.Hujan;
        let puriAdvice = kb.water_sanitation.Purifikasi.join(", ");

        // --- 6. PERAN INDIVIDU & KOMUNITAS ---
        let roles = kb.roles;

        // --- 7. HAL YANG HARUS DIHINDARI (DO NOT DO) ---
        let avoidList = [];
        d.crisis.forEach(c => {
            if (kb.crisis[c]) avoidList.push(kb.crisis[c].avoid);
        });

        // --- 8. CHECKLIST PRAKTIS ---
        let checklist = [];
        d.crisis.forEach(c => {
            if (kb.crisis[c]?.checklist) checklist.push(...kb.crisis[c].checklist);
        });
        // Add skill based items
        d.resources.skills.forEach(s => {
            checklist.push(`Siapkan alat untuk skill ${s}`);
        });

        this.state.result = {
            riskSummary,
            priority24h,
            strategyFull,
            foodAdvice,
            waterAdvice,
            puriAdvice,
            roles,
            avoidList,
            checklist
        };
    },

    renderResult: function () {
        const res = this.state.result;
        const d = this.state.data;
        const container = document.getElementById('report-content'); // New Container in index.html

        // Helper to create sections
        const createSection = (num, title, content) => {
            return `
                <div class="report-section">
                    <div class="section-header">
                        <span class="sec-num">${num}</span>
                        <h3>${title}</h3>
                    </div>
                    <div class="section-body">
                        ${content}
                    </div>
                </div>
            `;
        };

        let html = "";

        // 1. RISIKO
        html += createSection(1, "RINGKASAN RISIKO UTAMA", `
            <ul class="risk-list">${res.riskSummary.map(r => `<li>${r}</li>`).join('')}</ul>
        `);

        // 2. PRIORITAS 24 JAM
        html += createSection(2, "PRIORITAS 24 JAM PERTAMA", `
            <div class="highlight-box alert">🚨 ${res.priority24h}</div>
        `);

        // 3. STRATEGI
        html += createSection(3, "STRATEGI BERTAHAN", `
            <p>${res.strategyFull}</p>
            <div class="highlight-box info">⏳ <strong>Fase:</strong> ${d.time}</div>
        `);

        // 4. PANGAN
        html += createSection(4, "PANGAN & ENERGI", `
            <p><strong>Saran Pangan:</strong> ${res.foodAdvice}</p>
            <p><strong>Energi:</strong> ${KNOWLEDGE_BASE.food_sources.Energi.join(", ")}</p>
        `);

        // 5. AIR & SANITASI
        html += createSection(5, "AIR & SANITASI", `
            <p><strong>Sumber Teraman:</strong> ${res.waterAdvice}</p>
            <p><strong>Metode Purifikasi:</strong> ${res.puriAdvice}</p>
        `);

        // 6. PERAN
        html += createSection(6, "PERAN INDIVIDU & KOMUNITAS", `
            <ul>
                <li><strong>Individu:</strong> ${res.roles.Individu}</li>
                <li><strong>Kepala Keluarga:</strong> ${res.roles['Kepala Keluarga']}</li>
                <li><strong>Komunitas:</strong> ${res.roles.Komunitas}</li>
            </ul>
        `);

        // 7. AVOID
        html += createSection(7, "HAL YANG HARUS DIHINDARI", `
            <ul class="avoid-list">${res.avoidList.map(a => `<li>⛔ ${a}</li>`).join('')}</ul>
        `);

        // 8. CHECKLIST
        html += createSection(8, "CHECKLIST PRAKTIS", `
            <ul class="checklist-box">${res.checklist.map(c => `<li><input type="checkbox"> ${c}</li>`).join('')}</ul>
        `);

        container.innerHTML = html;

        // Update Badges
        document.getElementById('result-badges').innerHTML = `
            <span class="badge">${d.time}</span>
            <span class="badge">${d.location.type}</span>
        `;
    },

    // Print logic needs to be updated too, but focusing on Screen View first for now.
    // The browser print function will print the current view.
};

window.onload = function () {
    app.init();
};
