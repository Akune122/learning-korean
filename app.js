// Application complète d'apprentissage du Coréen : Hangeul, Règles de lecture, Grammaire, Vocabulaire & Exercices

const STORAGE_KEY = "korean_academy_progress_v2";

let userState = {
  completedExercises: 0,
  correctAnswers: 0,
  masteredHangul: []
};

const ALL_HANGUL_MAP = {};
const ALL_HANGUL_LIST = [];
const ALL_VOCAB_LIST = [];

function initDataIndices() {
  const hGroups = [
    ...HANGUL_DATA.vowelsBasic,
    ...HANGUL_DATA.vowelsComplex,
    ...HANGUL_DATA.consonantsBasic,
    ...HANGUL_DATA.consonantsAdvanced
  ];
  hGroups.forEach((it) => {
    ALL_HANGUL_MAP[it.id] = it;
    ALL_HANGUL_LIST.push(it);
  });

  VOCAB_CATEGORIES.forEach((cat) => {
    cat.words.forEach((w, idx) => {
      // Pour l'audio des mots contenant " → " ou " / ", lire la forme coréenne propre
      const cleanKr = w.kr.includes("→")
        ? w.kr.split("→")[1].trim()
        : w.kr.replace(/\(.*?\)/g, "").split("/")[0].trim();
      ALL_VOCAB_LIST.push({
        id: `${cat.id}_${idx}`,
        categoryTitle: cat.title,
        ...w,
        audioKr: cleanKr
      });
    });
  });
}

// ==========================================
// 1. AUDIO CORÉEN (WEB SPEECH API) & SONS UI
// ==========================================
let koreanVoice = null;
let audioCtx = null;

function initSpeechSynthesis() {
  if (!("speechSynthesis" in window)) {
    updateVoiceStatus(false, "Synthèse vocale non supportée");
    return;
  }

  function pickVoice() {
    const voices = window.speechSynthesis.getVoices();
    const koVoices = voices.filter(
      (v) => v.lang.toLowerCase().includes("ko") || v.name.toLowerCase().includes("korean")
    );
    if (koVoices.length > 0) {
      koreanVoice =
        koVoices.find((v) => v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("SunHi")) ||
        koVoices[0];
      updateVoiceStatus(true, `Audio : ${koreanVoice.name}`);
    } else if (voices.length > 0) {
      updateVoiceStatus(true, "Audio Coréen (ko-KR) actif");
    }
  }

  pickVoice();
  window.speechSynthesis.onvoiceschanged = pickVoice;
}

function updateVoiceStatus(ok, label) {
  const dot = document.getElementById("voice-dot");
  const text = document.getElementById("voice-label");
  if (dot) dot.style.background = ok ? "var(--accent-emerald)" : "var(--accent-amber)";
  if (text) text.textContent = label;
}

function speakKorean(text, rate = 0.88) {
  if (!("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ko-KR";
    if (koreanVoice) utter.voice = koreanVoice;
    utter.rate = rate;
    window.speechSynthesis.speak(utter);
  } catch (e) {
    console.warn("Erreur audio :", e);
  }
}

function playFeedbackTone(isSuccess) {
  try {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioCtx();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    if (isSuccess) {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    } else {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.2);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    }
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  } catch (e) {}
}

// ==========================================
// 2. SAUVEGARDE & NAVIGATION
// ==========================================
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) userState = { ...userState, ...JSON.parse(raw) };
  } catch (e) {}
  updateStatsHeader();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
  } catch (e) {}
  updateStatsHeader();
}

function updateStatsHeader() {
  const elEx = document.getElementById("stat-exercises");
  const elAns = document.getElementById("stat-answers");
  if (elEx) elEx.textContent = userState.completedExercises;
  if (elAns) elAns.textContent = userState.correctAnswers;
}

function switchTab(tabId) {
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });
  document.querySelectorAll(".view-section").forEach((sec) => {
    sec.classList.toggle("active", sec.id === `view-${tabId}`);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function switchHangulSubtab(subId) {
  document.querySelectorAll("#hangul-subtabs .subtab-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.sub === subId);
  });
  document.getElementById("hangul-sub-chars").style.display = subId === "chars" ? "block" : "none";
  document.getElementById("hangul-sub-rules").style.display = subId === "rules" ? "block" : "none";
  document.getElementById("hangul-sub-lab").style.display = subId === "lab" ? "block" : "none";
}

// ==========================================
// 3. RENDU DU MODULE 1 : HANGEUL & RÈGLES DE LECTURE
// ==========================================
function renderHangulModule() {
  const categories = [
    {
      title: "1. Voyelles simples (8 lettres)",
      desc: "Cliquez sur une lettre pour entendre le son et afficher l'aide de prononciation détaillée.",
      items: HANGUL_DATA.vowelsBasic
    },
    {
      title: "2. Voyelles composées en Y & W (8 lettres)",
      desc: "Un trait de plus ajoute le son « y » ; la fusion de deux voyelles crée le son « w ».",
      items: HANGUL_DATA.vowelsComplex
    },
    {
      title: "3. Consonnes de base (10 lettres)",
      desc: "Prononcées ici avec la voyelle ㅏ (a) pour entendre leur vrai son phonétique.",
      items: HANGUL_DATA.consonantsBasic
    },
    {
      title: "4. Consonnes aspirées (soufflées) & doubles (tendues) (9 lettres)",
      desc: "Comparez le souffle d'air (ㅋ, ㅌ, ㅍ, ㅊ) et la tension glottale (ㄲ, ㄸ, ㅃ, ㅆ, ㅉ).",
      items: HANGUL_DATA.consonantsAdvanced
    }
  ];

  const container = document.getElementById("hangul-categories-container");
  container.innerHTML = categories
    .map((cat) => {
      const cards = cat.items
        .map(
          (it) => `
          <div class="hangul-card" onclick="openLetterDetail('${it.id}')">
            <div class="kr-big">${it.char}</div>
            <div class="kr-syllable">Syllabe : ${it.syllable}</div>
            <span class="roman-tag">${it.roman}</span>
            <div class="sound-hint">${it.frenchSound}</div>
          </div>
        `
        )
        .join("");

      return `
        <div class="category-block">
          <div class="category-title">${cat.title}</div>
          <div class="category-desc">${cat.desc}</div>
          <div class="hangul-grid">${cards}</div>
        </div>
      `;
    })
    .join("");

  // Rendu des règles de lecture avancées (Batchim & Liaisons)
  const rulesContainer = document.getElementById("reading-rules-container");
  rulesContainer.innerHTML = READING_RULES.map((rule) => {
    const bullets = rule.details.map((d) => `<li>${d}</li>`).join("");
    const exCards = rule.examples
      .map(
        (ex) => `
        <div class="rule-ex-box">
          <div>
            <div style="font-family:var(--font-kr); font-size:1.3rem; font-weight:800;">
              ${ex.kr} <span style="font-size:0.85rem; color:#60a5fa; font-weight:600;">${ex.read}</span>
            </div>
            <div style="font-size:0.82rem; color:var(--text-secondary); margin-top:2px;">${ex.fr}</div>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="speakKorean('${ex.kr}', 0.8)">🔊</button>
        </div>
      `
      )
      .join("");

    return `
      <div class="rule-card">
        <h3>${rule.title}</h3>
        <div class="rule-summary">${rule.summary}</div>
        <ul class="rule-list">${bullets}</ul>
        <div class="rule-examples-grid">${exCards}</div>
      </div>
    `;
  }).join("");
}

function openLetterDetail(itemId) {
  const item = ALL_HANGUL_MAP[itemId];
  if (!item) return;

  speakKorean(item.syllable, 0.88);

  const modal = document.getElementById("detail-modal-backdrop");
  const body = document.getElementById("detail-modal-body");

  body.innerHTML = `
    <div style="display:flex; align-items:center; gap:20px; margin-bottom:20px;">
      <div style="width:96px; height:96px; border-radius:16px; background:var(--bg-elevated); border:2px solid var(--accent-primary); display:flex; flex-direction:column; align-items:center; justify-content:center;">
        <span style="font-family:var(--font-kr); font-size:3rem; font-weight:900; line-height:1;">${item.char}</span>
        <span style="font-size:0.78rem; color:var(--text-secondary); margin-top:4px;">bloc : ${item.syllable}</span>
      </div>
      <div>
        <div style="font-size:1.35rem; font-weight:800; color:#60a5fa;">Son : « ${item.roman} »</div>
        ${item.name ? `<div style="font-size:0.84rem; color:var(--text-secondary); margin-top:2px;">Nom coréen : <strong>${item.name}</strong></div>` : ""}
        <div style="display:flex; gap:8px; margin-top:10px;">
          <button class="btn btn-primary btn-sm" onclick="speakKorean('${item.syllable}', 0.88)">🔊 Normal (${item.syllable})</button>
          <button class="btn btn-secondary btn-sm" onclick="speakKorean('${item.syllable}', 0.5)">🐢 Lent</button>
        </div>
      </div>
    </div>

    <div style="background:var(--bg-elevated); border-left:3px solid var(--accent-emerald); padding:12px 14px; border-radius:8px; margin-bottom:10px;">
      <div style="font-size:0.74rem; text-transform:uppercase; color:var(--text-secondary); font-weight:700;">🇫🇷 Équivalent en Français</div>
      <div style="font-weight:700; margin-top:2px;">${item.frenchSound}</div>
    </div>

    <div style="background:var(--bg-elevated); border-left:3px solid var(--accent-primary); padding:12px 14px; border-radius:8px; margin-bottom:10px;">
      <div style="font-size:0.74rem; text-transform:uppercase; color:var(--text-secondary); font-weight:700;">👄 Position de la bouche & Astuce</div>
      <div style="font-size:0.9rem; margin-top:2px;">${item.mouthTip}</div>
    </div>

    <div style="background:var(--bg-elevated); border-left:3px solid var(--accent-amber); padding:12px 14px; border-radius:8px; margin-bottom:14px;">
      <div style="font-size:0.74rem; text-transform:uppercase; color:var(--text-secondary); font-weight:700;">💡 Moyen mnémotechnique</div>
      <div style="font-size:0.9rem; margin-top:2px;">${item.mnemonic}</div>
    </div>

    <div style="background:var(--bg-elevated); border:1px solid var(--border-light); padding:12px 16px; border-radius:10px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <div style="font-size:0.74rem; text-transform:uppercase; color:var(--text-secondary); font-weight:700;">Mot d'exemple</div>
        <div style="font-size:1.1rem; font-weight:800; margin-top:2px;">
          <span style="font-family:var(--font-kr); color:#34d399;">${item.example.word}</span>
          <span style="font-size:0.85rem; color:var(--text-secondary);">(${item.example.roman})</span> — ${item.example.meaning}
        </div>
      </div>
      <button class="btn btn-secondary btn-sm" onclick="speakKorean('${item.example.word}', 0.85)">🔊 Écouter</button>
    </div>
  `;

  modal.classList.add("open");
}

function closeLetterDetail(event) {
  if (event && event.target !== document.getElementById("detail-modal-backdrop")) return;
  document.getElementById("detail-modal-backdrop").classList.remove("open");
}

// ==========================================
// 4. LABORATOIRE DE SYLLABES
// ==========================================
let labState = { choIdx: 11, jungIdx: 0, jongIdx: 0 };

function initSyllableLab() {
  const choEl = document.getElementById("lab-choseong");
  const jungEl = document.getElementById("lab-jungseong");
  const jongEl = document.getElementById("lab-jongseong");
  if (!choEl) return;

  choEl.innerHTML = CHOSEONG_LIST.map(
    (c, idx) =>
      `<button class="jamo-btn ${idx === labState.choIdx ? "active" : ""}" onclick="selectLabJamo('cho', ${idx})">${c.char} <small>${c.roman}</small></button>`
  ).join("");

  jungEl.innerHTML = JUNGSEONG_LIST.map(
    (v, idx) =>
      `<button class="jamo-btn ${idx === labState.jungIdx ? "active" : ""}" onclick="selectLabJamo('jung', ${idx})">${v.char} <small>${v.roman}</small></button>`
  ).join("");

  const commonJongIndices = [0, 1, 4, 7, 8, 16, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27];
  jongEl.innerHTML = commonJongIndices
    .map((idx) => {
      const j = JONGSEONG_LIST[idx];
      const label = j.char ? `${j.char} <small>-${j.roman}</small>` : "Aucun";
      return `<button class="jamo-btn ${idx === labState.jongIdx ? "active" : ""}" onclick="selectLabJamo('jong', ${idx})">${label}</button>`;
    })
    .join("");

  updateSyllableLabDisplay(false);
}

function selectLabJamo(part, idx) {
  if (part === "cho") labState.choIdx = idx;
  if (part === "jung") labState.jungIdx = idx;
  if (part === "jong") labState.jongIdx = idx;
  initSyllableLab();
  updateSyllableLabDisplay(true);
}

function updateSyllableLabDisplay(autoPlay = true) {
  const codePoint = 0xac00 + labState.choIdx * 21 * 28 + labState.jungIdx * 28 + labState.jongIdx;
  const syllableChar = String.fromCodePoint(codePoint);
  const cho = CHOSEONG_LIST[labState.choIdx];
  const jung = JUNGSEONG_LIST[labState.jungIdx];
  const jong = JONGSEONG_LIST[labState.jongIdx];

  const choRoman = cho.char === "ㅇ" ? "" : cho.roman.split("/")[0];
  const romanFull = `${choRoman}${jung.roman}${jong.roman ? "-" + jong.roman : ""}`;
  const parts = [cho.char, jung.char];
  if (jong.char) parts.push(jong.char);

  document.getElementById("lab-big-char").textContent = syllableChar;
  document.getElementById("lab-formula-text").textContent = `${parts.join(" + ")} = ${syllableChar} [${romanFull}]`;
  if (autoPlay) speakKorean(syllableChar, 0.85);
}

function playCurrentLabSyllable(rate = 0.85) {
  speakKorean(document.getElementById("lab-big-char").textContent, rate);
}

// ==========================================
// 5. RENDU DU MODULE 2 : GRAMMAIRE FONDAMENTALE
// ==========================================
function renderGrammarModule() {
  const container = document.getElementById("grammar-lessons-container");
  container.innerHTML = GRAMMAR_LESSONS.map((lesson) => {
    const keyPointsHtml = lesson.keyPoints.map((kp) => `<li>${kp}</li>`).join("");

    const examplesHtml = lesson.examples
      .map((ex) => {
        const cleanSpeak = ex.kr.includes("→") ? ex.kr.split("→")[1].split("/")[0].trim() : ex.kr;
        const chips = ex.breakdown
          .map(
            (b) => `
            <div class="b-chip">
              <span class="b-kr">${b.part}</span>
              <span class="b-role">(${b.role})</span> : ${b.meaning}
            </div>
          `
          )
          .join("");

        return `
          <div class="example-sentence-box">
            <div class="ex-top-row">
              <div>
                <div class="ex-kr">${ex.kr}</div>
                <div class="ex-roman">${ex.roman}</div>
                <div class="ex-fr">→ ${ex.fr}</div>
              </div>
              <div style="display:flex; gap:6px;">
                <button class="btn btn-primary btn-sm" onclick="speakKorean('${cleanSpeak.replace(/'/g, "\\'")}', 0.88)">🔊 Écouter</button>
                <button class="btn btn-secondary btn-sm" onclick="speakKorean('${cleanSpeak.replace(/'/g, "\\'")}', 0.55)">🐢 Lent</button>
              </div>
            </div>
            <div class="breakdown-chips">${chips}</div>
          </div>
        `;
      })
      .join("");

    return `
      <article class="grammar-card">
        <div class="grammar-header">
          <div>
            <span class="level-badge">${lesson.level}</span>
            <h2 style="font-size:1.3rem; font-weight:800;">${lesson.title}</h2>
            <p style="color:var(--text-secondary); font-size:0.9rem;">${lesson.subtitle}</p>
          </div>
          <button class="btn btn-emerald btn-sm" onclick="switchTab('practice'); startPracticeSession('grammar')">
            🎯 S'entraîner
          </button>
        </div>

        <div class="grammar-formula">📌 Formule : ${lesson.formula}</div>
        <div class="grammar-explanation">${lesson.explanation}</div>

        <div class="grammar-keypoints">
          <div style="font-size:0.8rem; font-weight:800; color:#34d399; text-transform:uppercase; margin-bottom:6px;">
            À retenir absolument
          </div>
          <ul>${keyPointsHtml}</ul>
        </div>

        <div style="font-size:0.85rem; font-weight:700; color:var(--text-secondary); margin-bottom:6px;">
          Exemples décomposés mot à mot :
        </div>
        ${examplesHtml}
      </article>
    `;
  }).join("");
}

// ==========================================
// 6. RENDU DU MODULE 3 : VOCABULAIRE THÉMATIQUE
// ==========================================
let currentVocabFilter = "all";

function renderVocabModule() {
  const tabsEl = document.getElementById("vocab-category-tabs");
  tabsEl.innerHTML = [
    `<button class="subtab-btn ${currentVocabFilter === "all" ? "active" : ""}" onclick="setVocabCategory('all')">Tous les thèmes (${ALL_VOCAB_LIST.length})</button>`,
    ...VOCAB_CATEGORIES.map(
      (c) =>
        `<button class="subtab-btn ${currentVocabFilter === c.id ? "active" : ""}" onclick="setVocabCategory('${c.id}')">${c.icon} ${c.title.split(".")[1].trim()}</button>`
    )
  ].join("");

  filterAndRenderVocabCards();
}

function setVocabCategory(catId) {
  currentVocabFilter = catId;
  renderVocabModule();
}

function filterAndRenderVocabCards() {
  const query = (document.getElementById("vocab-search")?.value || "").toLowerCase().trim();
  const container = document.getElementById("vocab-cards-container");

  const categoriesToShow =
    currentVocabFilter === "all"
      ? VOCAB_CATEGORIES
      : VOCAB_CATEGORIES.filter((c) => c.id === currentVocabFilter);

  container.innerHTML = categoriesToShow
    .map((cat) => {
      const filteredWords = cat.words.filter(
        (w) =>
          !query ||
          w.kr.toLowerCase().includes(query) ||
          w.roman.toLowerCase().includes(query) ||
          w.fr.toLowerCase().includes(query) ||
          w.note.toLowerCase().includes(query)
      );

      if (filteredWords.length === 0) return "";

      const cardsHtml = filteredWords
        .map((w) => {
          const cleanAudio = w.kr.includes("→")
            ? w.kr.split("→")[1].trim()
            : w.kr.replace(/\(.*?\)/g, "").split("/")[0].trim();

          return `
            <div class="vocab-item-card">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                  <div>
                    <div class="voc-kr">${w.kr}</div>
                    <div class="voc-roman">[${w.roman}]</div>
                  </div>
                  <div style="display:flex; gap:6px;">
                    <button class="btn btn-primary btn-sm" onclick="speakKorean('${cleanAudio.replace(/'/g, "\\'")}', 0.88)" title="Écouter">🔊</button>
                    <button class="btn btn-secondary btn-sm" onclick="speakKorean('${cleanAudio.replace(/'/g, "\\'")}', 0.52)" title="Écouter lentement">🐢</button>
                  </div>
                </div>
                <div class="voc-fr">${w.fr}</div>
              </div>
              <div class="voc-note">💡 ${w.note}</div>
            </div>
          `;
        })
        .join("");

      return `
        <div class="category-block">
          <div class="category-title">${cat.icon} ${cat.title}</div>
          <div class="category-desc">${cat.description}</div>
          <div class="vocab-list">${cardsHtml}</div>
        </div>
      `;
    })
    .join("");
}

// ==========================================
// 7. CENTRE D'EXERCICES CIBLÉS (HANGEUL, GRAMMAIRE, PHRASES, VOCABULAIRE)
// ==========================================
let trainerSession = null;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startPracticeSession(mode) {
  let questions = [];

  if (mode === "hangul_basic" || mode === "hangul_all") {
    const pool =
      mode === "hangul_basic"
        ? [...HANGUL_DATA.vowelsBasic, ...HANGUL_DATA.consonantsBasic]
        : ALL_HANGUL_LIST;

    const picked = shuffle(pool).slice(0, 10);
    picked.forEach((item, idx) => {
      const others = shuffle(pool.filter((x) => x.id !== item.id)).slice(0, 3);
      const options = shuffle([item, ...others]);

      if (idx % 2 === 0) {
        questions.push({
          qType: "hangul_listen",
          badge: "Hangeul • Écoute & Reconnaissance",
          title: "Écoutez le son et choisissez le caractère Hangeul correspondant :",
          item,
          options
        });
      } else {
        questions.push({
          qType: "hangul_read",
          badge: "Hangeul • Lecture phonétique",
          title: `Comment se prononce le caractère « ${item.char} » (bloc ${item.syllable}) ?`,
          item,
          options
        });
      }
    });
  } else if (mode === "grammar") {
    const fillQs = GRAMMAR_EXERCISES.filter((q) => q.type === "fill_particle");
    questions = shuffle(fillQs).map((q) => ({
      qType: "grammar_fill",
      badge: `Grammaire • ${q.category}`,
      ...q,
      shuffledOptions: shuffle(q.options)
    }));
  } else if (mode === "sentences") {
    const orderQs = GRAMMAR_EXERCISES.filter((q) => q.type === "sentence_order");
    const fillQs = GRAMMAR_EXERCISES.filter((q) => q.type === "fill_particle").slice(0, 3);
    questions = [
      ...orderQs.map((q) => ({
        qType: "sentence_order",
        badge: `Syntaxe • ${q.category}`,
        ...q,
        bank: shuffle([...q.blocks, ...(q.distractors || [])])
      })),
      ...fillQs.map((q) => ({
        qType: "grammar_fill",
        badge: `Grammaire • ${q.category}`,
        ...q,
        shuffledOptions: shuffle(q.options)
      }))
    ];
  } else if (mode === "vocab") {
    const picked = shuffle(ALL_VOCAB_LIST).slice(0, 10);
    picked.forEach((word, idx) => {
      const others = shuffle(ALL_VOCAB_LIST.filter((w) => w.id !== word.id)).slice(0, 3);
      const options = shuffle([word, ...others]);
      questions.push({
        qType: idx % 2 === 0 ? "vocab_kr_to_fr" : "vocab_fr_to_kr",
        badge: `Vocabulaire • ${word.categoryTitle}`,
        word,
        options
      });
    });
  }

  trainerSession = {
    mode,
    questions,
    index: 0,
    score: 0,
    selectedValue: null,
    builtBlocks: [],
    checked: false
  };

  document.getElementById("trainer-menu").style.display = "none";
  document.getElementById("trainer-active-area").style.display = "block";
  renderTrainerStep();
}

function exitPracticeSession() {
  trainerSession = null;
  document.getElementById("trainer-active-area").style.display = "none";
  document.getElementById("trainer-menu").style.display = "block";
}

function renderTrainerStep() {
  if (!trainerSession) return;
  const { questions, index, score } = trainerSession;

  if (index >= questions.length) {
    renderTrainerSummary();
    return;
  }

  const q = questions[index];
  trainerSession.selectedValue = null;
  trainerSession.builtBlocks = [];
  trainerSession.checked = false;

  const pct = Math.round((index / questions.length) * 100);
  document.getElementById("trainer-progress-bar").style.width = `${pct}%`;
  document.getElementById("trainer-step-counter").textContent = `Question ${index + 1} / ${questions.length}`;

  const container = document.getElementById("trainer-question-body");

  if (q.qType === "hangul_listen") {
    speakKorean(q.item.syllable, 0.85);
    const choicesHtml = q.options
      .map(
        (opt) => `
        <button class="choice-card" id="tchoice-${opt.id}" onclick="selectTrainerChoice('${opt.id}', '${opt.syllable}')">
          <div style="font-family:var(--font-kr); font-size:2.2rem; font-weight:900;">${opt.char}</div>
          <div style="font-size:0.82rem; color:var(--text-secondary);">Syllabe : ${opt.syllable}</div>
        </button>
      `
      )
      .join("");

    container.innerHTML = `
      <div style="font-size:0.8rem; font-weight:700; color:#c084fc; text-transform:uppercase; margin-bottom:6px;">${q.badge}</div>
      <h3 style="font-size:1.3rem; margin-bottom:18px;">${q.title}</h3>
      <div style="display:flex; justify-content:center; gap:12px; margin-bottom:20px;">
        <button class="btn btn-primary" onclick="speakKorean('${q.item.syllable}', 0.88)">🔊 Écouter le son</button>
        <button class="btn btn-secondary" onclick="speakKorean('${q.item.syllable}', 0.5)">🐢 Écouter lentement</button>
      </div>
      <div class="choices-grid">${choicesHtml}</div>
    `;
  } else if (q.qType === "hangul_read") {
    speakKorean(q.item.syllable, 0.85);
    const choicesHtml = q.options
      .map(
        (opt) => `
        <button class="choice-card" id="tchoice-${opt.id}" onclick="selectTrainerChoice('${opt.id}', null)">
          <div style="font-size:1.2rem; font-weight:800; color:#60a5fa;">${opt.roman}</div>
          <div style="font-size:0.83rem; color:var(--text-secondary); margin-top:4px;">${opt.frenchSound}</div>
        </button>
      `
      )
      .join("");

    container.innerHTML = `
      <div style="font-size:0.8rem; font-weight:700; color:#c084fc; text-transform:uppercase; margin-bottom:6px;">${q.badge}</div>
      <h3 style="font-size:1.3rem; margin-bottom:16px;">${q.title}</h3>
      <div style="text-align:center; margin-bottom:18px;">
        <div style="display:inline-block; background:var(--bg-elevated); border:2px solid var(--accent-primary); border-radius:16px; padding:16px 32px; cursor:pointer;" onclick="speakKorean('${q.item.syllable}', 0.85)">
          <div style="font-family:var(--font-kr); font-size:3.2rem; font-weight:900;">${q.item.char}</div>
          <div style="font-size:0.8rem; color:#60a5fa;">🔊 Cliquer pour écouter (${q.item.syllable})</div>
        </div>
      </div>
      <div class="choices-grid">${choicesHtml}</div>
    `;
  } else if (q.qType === "grammar_fill") {
    speakKorean(q.audioFull, 0.85);
    const choicesHtml = q.shuffledOptions
      .map(
        (opt) => `
        <button class="choice-card" id="tchoice-${opt}" onclick="selectTrainerChoice('${opt}', '${opt}')">
          <div style="font-family:var(--font-kr); font-size:1.5rem; font-weight:800;">${opt}</div>
        </button>
      `
      )
      .join("");

    container.innerHTML = `
      <div style="font-size:0.8rem; font-weight:700; color:#c084fc; text-transform:uppercase; margin-bottom:6px;">${q.badge}</div>
      <h3 style="font-size:1.25rem; margin-bottom:6px;">Complétez correctement la phrase :</h3>
      <p style="color:#34d399; font-weight:700; font-size:1.05rem; margin-bottom:18px;">« ${q.promptFr} »</p>

      <div style="background:var(--bg-elevated); border:1px solid var(--border-light); border-radius:12px; padding:20px; text-align:center; font-family:var(--font-kr); font-size:1.65rem; font-weight:800;">
        ${q.sentenceBefore}<span id="blank-slot" style="display:inline-block; min-width:70px; border-bottom:3px solid var(--accent-primary); color:#60a5fa; padding:0 8px;">___</span>${q.sentenceAfter}
      </div>

      <div class="choices-grid">${choicesHtml}</div>
    `;
  } else if (q.qType === "sentence_order") {
    speakKorean(q.audioFull, 0.85);
    container.innerHTML = `
      <div style="font-size:0.8rem; font-weight:700; color:#c084fc; text-transform:uppercase; margin-bottom:6px;">${q.badge}</div>
      <h3 style="font-size:1.2rem; margin-bottom:8px;">${q.promptFr}</h3>
      <div style="margin-bottom:12px;">
        <button class="btn btn-secondary btn-sm" onclick="speakKorean('${q.audioFull}', 0.85)">🔊 Écouter un indice audio</button>
        <button class="btn btn-secondary btn-sm" onclick="speakKorean('${q.audioFull}', 0.5)">🐢 Lent</button>
      </div>

      <div style="font-size:0.82rem; color:var(--text-secondary);">Votre phrase (cliquez sur un mot pour le retirer) :</div>
      <div class="sentence-slot" id="sentence-built-slot"></div>

      <div style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:8px;">Briques disponibles :</div>
      <div class="word-bank" id="sentence-word-bank"></div>
    `;
    renderSentenceOrderState();
  } else if (q.qType === "vocab_kr_to_fr") {
    speakKorean(q.word.audioKr, 0.85);
    const choicesHtml = q.options
      .map(
        (opt) => `
        <button class="choice-card" id="tchoice-${opt.id}" onclick="selectTrainerChoice('${opt.id}', null)">
          <div style="font-size:1.05rem; font-weight:700;">${opt.fr}</div>
        </button>
      `
      )
      .join("");

    container.innerHTML = `
      <div style="font-size:0.8rem; font-weight:700; color:#c084fc; text-transform:uppercase; margin-bottom:6px;">${q.badge}</div>
      <h3 style="font-size:1.25rem; margin-bottom:16px;">Que signifie cette expression coréenne ?</h3>
      <div style="background:var(--bg-elevated); border:1px solid var(--border-light); border-radius:14px; padding:20px; text-align:center; margin-bottom:16px;">
        <div style="font-family:var(--font-kr); font-size:2rem; font-weight:900;">${q.word.kr}</div>
        <div style="color:#60a5fa; font-size:0.9rem; margin-top:4px;">[${q.word.roman}]</div>
        <div style="margin-top:10px;">
          <button class="btn btn-primary btn-sm" onclick="speakKorean('${q.word.audioKr.replace(/'/g, "\\'")}', 0.88)">🔊 Écouter</button>
          <button class="btn btn-secondary btn-sm" onclick="speakKorean('${q.word.audioKr.replace(/'/g, "\\'")}', 0.52)">🐢 Lent</button>
        </div>
      </div>
      <div class="choices-grid">${choicesHtml}</div>
    `;
  } else if (q.qType === "vocab_fr_to_kr") {
    const choicesHtml = q.options
      .map(
        (opt) => `
        <button class="choice-card" id="tchoice-${opt.id}" onclick="selectTrainerChoice('${opt.id}', '${opt.audioKr.replace(/'/g, "\\'")}')">
          <div style="font-family:var(--font-kr); font-size:1.35rem; font-weight:800;">${opt.kr}</div>
          <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:3px;">${opt.roman}</div>
        </button>
      `
      )
      .join("");

    container.innerHTML = `
      <div style="font-size:0.8rem; font-weight:700; color:#c084fc; text-transform:uppercase; margin-bottom:6px;">${q.badge}</div>
      <h3 style="font-size:1.25rem; margin-bottom:8px;">Comment dit-on en coréen :</h3>
      <div style="font-size:1.35rem; font-weight:800; color:#34d399; margin-bottom:18px;">« ${q.word.fr} »</div>
      <div class="choices-grid">${choicesHtml}</div>
    `;
  }

  const fb = document.getElementById("trainer-feedback");
  fb.className = "feedback-banner";
  fb.innerHTML = "";

  const btn = document.getElementById("trainer-submit-btn");
  btn.textContent = "Vérifier la réponse";
  btn.disabled = true;
  btn.onclick = () => checkTrainerStep();
}

function selectTrainerChoice(val, audioToSpeak) {
  if (!trainerSession || trainerSession.checked) return;
  trainerSession.selectedValue = val;
  if (audioToSpeak) speakKorean(audioToSpeak, 0.88);

  const blankSlot = document.getElementById("blank-slot");
  if (blankSlot) blankSlot.textContent = val;

  document.querySelectorAll("#trainer-question-body .choice-card").forEach((el) => {
    el.classList.toggle("selected", el.id === `tchoice-${val}`);
  });
  document.getElementById("trainer-submit-btn").disabled = false;
}

function renderSentenceOrderState() {
  const q = trainerSession.questions[trainerSession.index];
  const slotEl = document.getElementById("sentence-built-slot");
  const bankEl = document.getElementById("sentence-word-bank");

  slotEl.innerHTML = trainerSession.builtBlocks
    .map(
      (b, idx) =>
        `<button class="word-pill" style="background:var(--accent-primary-soft); border-color:var(--accent-primary);" onclick="removeSentenceBlock(${idx})">${b}</button>`
    )
    .join("");

  const remaining = [...q.bank];
  trainerSession.builtBlocks.forEach((used) => {
    const pos = remaining.indexOf(used);
    if (pos !== -1) remaining.splice(pos, 1);
  });

  bankEl.innerHTML = remaining
    .map((b) => `<button class="word-pill" onclick="addSentenceBlock('${b}')">${b}</button>`)
    .join("");

  document.getElementById("trainer-submit-btn").disabled = trainerSession.builtBlocks.length === 0;
}

function addSentenceBlock(word) {
  if (!trainerSession || trainerSession.checked) return;
  speakKorean(word, 0.9);
  trainerSession.builtBlocks.push(word);
  renderSentenceOrderState();
}

function removeSentenceBlock(idx) {
  if (!trainerSession || trainerSession.checked) return;
  trainerSession.builtBlocks.splice(idx, 1);
  renderSentenceOrderState();
}

function checkTrainerStep() {
  if (!trainerSession || trainerSession.checked) return;
  trainerSession.checked = true;

  const q = trainerSession.questions[trainerSession.index];
  let isCorrect = false;
  let explanationText = "";

  if (q.qType === "hangul_listen" || q.qType === "hangul_read") {
    isCorrect = trainerSession.selectedValue === q.item.id;
    explanationText = `<strong>${q.item.char} (${q.item.syllable})</strong> se prononce « <strong>${q.item.roman}</strong> » — ${q.item.frenchSound}.`;
    const correctEl = document.getElementById(`tchoice-${q.item.id}`);
    const selEl = document.getElementById(`tchoice-${trainerSession.selectedValue}`);
    if (correctEl) correctEl.classList.add("correct");
    if (!isCorrect && selEl) selEl.classList.add("wrong");
    speakKorean(q.item.syllable, 0.88);
  } else if (q.qType === "grammar_fill") {
    isCorrect = trainerSession.selectedValue === q.correct;
    explanationText = `<strong>Phrase complète : ${q.audioFull}</strong><br>${q.explanation}`;
    const correctEl = document.getElementById(`tchoice-${q.correct}`);
    const selEl = document.getElementById(`tchoice-${trainerSession.selectedValue}`);
    if (correctEl) correctEl.classList.add("correct");
    if (!isCorrect && selEl) selEl.classList.add("wrong");
    speakKorean(q.audioFull, 0.88);
  } else if (q.qType === "sentence_order") {
    isCorrect = trainerSession.builtBlocks.join(" ") === q.blocks.join(" ");
    explanationText = `<strong>Ordre exact : ${q.blocks.join(" ")}</strong><br>${q.explanation}`;
    speakKorean(q.audioFull, 0.88);
  } else if (q.qType === "vocab_kr_to_fr" || q.qType === "vocab_fr_to_kr") {
    isCorrect = trainerSession.selectedValue === q.word.id;
    explanationText = `<strong>${q.word.kr}</strong> [${q.word.roman}] = <strong>${q.word.fr}</strong>.<br>💡 ${q.word.note}`;
    const correctEl = document.getElementById(`tchoice-${q.word.id}`);
    const selEl = document.getElementById(`tchoice-${trainerSession.selectedValue}`);
    if (correctEl) correctEl.classList.add("correct");
    if (!isCorrect && selEl) selEl.classList.add("wrong");
    speakKorean(q.word.audioKr, 0.88);
  }

  playFeedbackTone(isCorrect);
  if (isCorrect) {
    trainerSession.score++;
    userState.correctAnswers++;
    saveState();
  }

  const fb = document.getElementById("trainer-feedback");
  fb.className = `feedback-banner show ${isCorrect ? "ok" : "err"}`;
  fb.innerHTML = `
    <div style="font-weight:800; font-size:1.05rem; margin-bottom:4px; color:${isCorrect ? "#34d399" : "#fb7185"};">
      ${isCorrect ? "✅ Bonne réponse !" : "❌ Pas tout à fait — voici l'explication :"}
    </div>
    <div style="font-size:0.92rem; color:var(--text-primary); line-height:1.5;">${explanationText}</div>
  `;

  const btn = document.getElementById("trainer-submit-btn");
  btn.textContent = "Question suivante →";
  btn.disabled = false;
  btn.onclick = () => {
    trainerSession.index++;
    renderTrainerStep();
  };
}

function renderTrainerSummary() {
  userState.completedExercises++;
  saveState();

  const { score, questions, mode } = trainerSession;
  const pct = Math.round((score / questions.length) * 100);

  document.getElementById("trainer-progress-bar").style.width = "100%";
  document.getElementById("trainer-feedback").className = "feedback-banner";

  document.getElementById("trainer-question-body").innerHTML = `
    <div style="text-align:center; padding:24px 0;">
      <div style="font-size:3.5rem; margin-bottom:10px;">🎯</div>
      <h2 style="font-size:1.75rem; font-weight:800; margin-bottom:6px;">Série terminée : ${score} / ${questions.length} (${pct}%)</h2>
      <p style="color:var(--text-secondary); margin-bottom:24px;">
        Chaque erreur accompagnée de son explication grammaticale vous fait progresser concrètement.
      </p>
      <div style="display:flex; justify-content:center; gap:12px;">
        <button class="btn btn-primary" onclick="startPracticeSession('${mode}')">🔄 Refaire une série</button>
        <button class="btn btn-secondary" onclick="exitPracticeSession()">Choisir un autre thème</button>
      </div>
    </div>
  `;

  const btn = document.getElementById("trainer-submit-btn");
  btn.style.display = "none";
  setTimeout(() => {
    if (btn) btn.style.display = "inline-flex";
  }, 100);
}

// Initialisation globale
window.addEventListener("DOMContentLoaded", () => {
  initDataIndices();
  loadState();
  initSpeechSynthesis();
  renderHangulModule();
  initSyllableLab();
  renderGrammarModule();
  renderVocabModule();
});
