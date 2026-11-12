// Application complète d'apprentissage du Coréen :
// Hangeul, Ardoise de Tracé, Grammaire, Connecteurs, Politesse, Conjugaison, Vocabulaire,
// Dialogues, Nombres/Heures/Prix, Prononciation Micro, Flashcards, Chrono 60s & Checklist A1

const STORAGE_KEY = "korean_academy_progress_v4";

let userState = {
  completedExercises: 0,
  correctAnswers: 0,
  bestSprintScore: 0,
  romanMode: "visible", // 'visible' | 'hover' | 'hidden'
  currentLevel: "a1",   // 'a1' | 'a2'
  bookmarkedIds: [],    // IDs marqués d'une étoile ⭐
  weakIds: [],          // IDs où l'utilisateur s'est trompé
  checkedMilestones: [], // Paliers de la Checklist Niveau 1 validés
  dailyQuests: {
    date: "",
    completedIds: [],
    xp: 0
  }
};

const ALL_HANGUL_MAP = {};
const ALL_HANGUL_LIST = [];
const ALL_VOCAB_MAP = {};
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
      const cleanKr = w.kr.includes("→")
        ? w.kr.split("→")[1].trim()
        : w.kr.replace(/\(.*?\)/g, "").split("/")[0].trim();
      const item = {
        id: `${cat.id}_${idx}`,
        categoryTitle: cat.title,
        ...w,
        audioKr: cleanKr
      };
      ALL_VOCAB_MAP[item.id] = item;
      ALL_VOCAB_LIST.push(item);
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

function speakKorean(text, rate = 0.88, onEndCallback = null) {
  if (!("speechSynthesis" in window)) {
    if (onEndCallback) onEndCallback();
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ko-KR";
    if (koreanVoice) utter.voice = koreanVoice;
    utter.rate = rate;
    if (onEndCallback) {
      utter.onend = onEndCallback;
      utter.onerror = onEndCallback;
    }
    window.speechSynthesis.speak(utter);
  } catch (e) {
    if (onEndCallback) onEndCallback();
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
// 2. SAUVEGARDE, MODE ROMANISATION & SYSTÈME SRS (FAVORIS / ERREURS)
// ==========================================
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      userState = { ...userState, ...JSON.parse(raw) };
    }
  } catch (e) {}
  applyRomanMode(userState.romanMode || "visible");
  switchLevel(userState.currentLevel || "a1", false);
  updateStatsHeader();
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
  } catch (e) {}
  updateStatsHeader();
}

function setRomanMode(mode) {
  userState.romanMode = mode;
  applyRomanMode(mode);
  saveState();
}

function applyRomanMode(mode) {
  document.body.setAttribute("data-roman", mode);
  document.querySelectorAll(".roman-opt-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.rmode === mode);
  });
}

function getReviewPoolIds() {
  return Array.from(new Set([...userState.bookmarkedIds, ...userState.weakIds]));
}

function toggleBookmark(itemId, event) {
  if (event) event.stopPropagation();
  const idx = userState.bookmarkedIds.indexOf(itemId);
  if (idx === -1) {
    userState.bookmarkedIds.push(itemId);
  } else {
    userState.bookmarkedIds.splice(idx, 1);
  }
  saveState();
  renderHangulModule();
  filterAndRenderVocabCards();
}

function recordMistakeItem(itemId) {
  if (!itemId) return;
  if (!userState.weakIds.includes(itemId)) {
    userState.weakIds.push(itemId);
    saveState();
  }
}

function clearMistakeItem(itemId) {
  if (!itemId) return;
  const idx = userState.weakIds.indexOf(itemId);
  if (idx !== -1) {
    userState.weakIds.splice(idx, 1);
    saveState();
  }
}

function updateStatsHeader() {
  const elEx = document.getElementById("stat-exercises");
  const elAns = document.getElementById("stat-answers");
  const elWeakCount = document.getElementById("stat-weak-count");
  const elPracticePill = document.getElementById("nav-weak-pill");
  const elWeakCardCount = document.getElementById("trainer-weak-count-label");
  const elSprintBest = document.getElementById("trainer-sprint-best-label");
  const elAnkiFav = document.getElementById("anki-fav-count");

  const reviewCount = getReviewPoolIds().length;
  if (elEx) elEx.textContent = userState.completedExercises;
  if (elAns) elAns.textContent = userState.correctAnswers;
  if (elWeakCount) elWeakCount.textContent = reviewCount;
  if (elAnkiFav) elAnkiFav.textContent = reviewCount;
  if (elPracticePill) {
    elPracticePill.textContent = reviewCount > 0 ? `${reviewCount} à revoir` : "";
    elPracticePill.style.display = reviewCount > 0 ? "inline-block" : "none";
  }
  if (elWeakCardCount) {
    elWeakCardCount.textContent = `${reviewCount} élément(s) enregistré(s)`;
  }
  if (elSprintBest) {
    elSprintBest.textContent = `Record personnel : ${userState.bestSprintScore || 0} pts`;
  }
}

function switchLevel(lvl, navigateToDefault = true) {
  userState.currentLevel = lvl;

  // Toggle active buttons in sidebar
  const btnA1 = document.getElementById("level-btn-a1");
  const btnA2 = document.getElementById("level-btn-a2");
  if (btnA1) btnA1.classList.toggle("active", lvl === "a1");
  if (btnA2) btnA2.classList.toggle("active", lvl === "a2");

  // Toggle nav groups
  const navA1 = document.getElementById("nav-group-a1");
  const navA2 = document.getElementById("nav-group-a2");
  if (navA1) navA1.style.display = lvl === "a1" ? "block" : "none";
  if (navA2) navA2.style.display = lvl === "a2" ? "block" : "none";

  // Update badges & indicators
  const badge = document.getElementById("level-active-badge");
  if (badge) {
    badge.textContent = lvl === "a1" ? "Niveau 1" : "Niveau 2";
    badge.style.color = lvl === "a1" ? "#60a5fa" : "#c084fc";
  }

  const topIcon = document.getElementById("topbar-level-icon");
  const topText = document.getElementById("topbar-level-text");
  if (topIcon) topIcon.textContent = lvl === "a1" ? "🌱" : "🚀";
  if (topText) topText.textContent = lvl === "a1" ? "Niveau 1 : Fondations A1" : "Niveau 2 : Intermédiaire A2";

  saveState();

  if (navigateToDefault) {
    switchTab(lvl === "a1" ? "hangul" : "grammar_a2");
  }
}

function toggleLevel() {
  const next = userState.currentLevel === "a2" ? "a1" : "a2";
  switchLevel(next, true);
}

function switchTab(tabId) {
  if (sprintInterval) clearInterval(sprintInterval);

  // Sync active level if tab belongs to A1 or A2
  const a2Tabs = ["grammar_a2", "irregulars", "hanja", "rpg", "stories", "daily_anki"];
  const targetLevel = a2Tabs.includes(tabId) ? "a2" : "a1";
  if (userState.currentLevel !== targetLevel) {
    switchLevel(targetLevel, false);
  }

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
  document.getElementById("hangul-sub-stroke").style.display = subId === "stroke" ? "block" : "none";
  if (subId === "stroke") {
    drawCanvasWatermark();
  }
}

// ==========================================
// 3. RENDU DU MODULE 1 : HANGEUL, RÈGLES & ARDOISE D'ÉCRITURE
// ==========================================
function renderHangulModule() {
  const categories = [
    {
      title: "1. Voyelles simples (8 lettres)",
      desc: "Cliquez sur une lettre pour entendre le son et afficher l'aide de prononciation détaillée. Cliquez sur ☆ pour l'ajouter à vos révisions.",
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
  if (!container) return;

  container.innerHTML = categories
    .map((cat) => {
      const cards = cat.items
        .map((it) => {
          const isStarred = userState.bookmarkedIds.includes(it.id);
          const isWeak = userState.weakIds.includes(it.id);
          return `
            <div class="hangul-card ${isStarred || isWeak ? "weak-marked" : ""}" onclick="openLetterDetail('${it.id}')">
              <button class="star-btn card-star-pos ${isStarred ? "starred" : ""}" title="Ajouter/Retirer des favoris à réviser" onclick="toggleBookmark('${it.id}', event)">
                ${isStarred ? "⭐" : "☆"}
              </button>
              <div class="kr-big">${it.char}</div>
              <div class="kr-syllable">Syllabe : ${it.syllable}</div>
              <span class="roman-tag">${it.roman}</span>
              <div class="sound-hint">${it.frenchSound}</div>
            </div>
          `;
        })
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

  const rulesContainer = document.getElementById("reading-rules-container");
  if (rulesContainer) {
    rulesContainer.innerHTML = READING_RULES.map((rule) => {
      const bullets = rule.details.map((d) => `<li>${d}</li>`).join("");
      const exCards = rule.examples
        .map(
          (ex) => `
          <div class="rule-ex-box">
            <div>
              <div style="font-family:var(--font-kr); font-size:1.3rem; font-weight:800;">
                ${ex.kr} <span class="roman-text" style="font-size:0.85rem; color:#60a5fa; font-weight:600;">${ex.read}</span>
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
// 3B. ARDOISE D'ÉCRITURE & ORDRE DES TRAITS (CANVAS)
// ==========================================
let currentStrokeIdx = 0;
let isDrawing = false;

function initStrokeOrderStudio() {
  const selectorEl = document.getElementById("stroke-char-selector");
  if (!selectorEl) return;

  selectorEl.innerHTML = STROKE_ORDER_DATA.map(
    (item, idx) =>
      `<button class="jamo-btn ${idx === currentStrokeIdx ? "active" : ""}" onclick="selectStrokeLetter(${idx})">${item.char}</button>`
  ).join("");

  setupWritingCanvasEvents();
  selectStrokeLetter(0, false);
}

function selectStrokeLetter(idx, autoSpeak = true) {
  currentStrokeIdx = idx;
  const item = STROKE_ORDER_DATA[idx];
  if (!item) return;

  document.querySelectorAll("#stroke-char-selector .jamo-btn").forEach((btn, bIdx) => {
    btn.classList.toggle("active", bIdx === idx);
  });

  document.getElementById("stroke-info-title").textContent = `Lettre ${item.char} (${item.strokes} trait${item.strokes > 1 ? "s" : ""})`;
  document.getElementById("stroke-steps-list").innerHTML = item.steps.map((s) => `<li>${s}</li>`).join("");
  document.getElementById("stroke-handwriting-tip").textContent = item.handwritingTip;
  document.getElementById("sample-print-char").textContent = `${item.char} (${item.syllable})`;
  document.getElementById("sample-hand-char").textContent = `${item.char} (${item.syllable})`;

  clearWritingCanvas();
  if (autoSpeak) speakKorean(item.syllable, 0.85);
}

function setupWritingCanvasEvents() {
  const canvas = document.getElementById("writing-canvas");
  if (!canvas || canvas.dataset.bound) return;
  canvas.dataset.bound = "1";
  const ctx = canvas.getContext("2d");

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function startDraw(e) {
    e.preventDefault();
    isDrawing = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function moveDraw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getPos(e);
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#3b82f6";
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function endDraw() {
    isDrawing = false;
  }

  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", moveDraw);
  window.addEventListener("mouseup", endDraw);
  canvas.addEventListener("touchstart", startDraw, { passive: false });
  canvas.addEventListener("touchmove", moveDraw, { passive: false });
  window.addEventListener("touchend", endDraw);
}

function drawCanvasWatermark() {
  const canvas = document.getElementById("writing-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Lignes guides en croix
  ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  // Modèle en filigrane
  const item = STROKE_ORDER_DATA[currentStrokeIdx];
  if (item) {
    ctx.font = "900 155px 'Noto Sans KR', sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.11)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(item.char, canvas.width / 2, canvas.height / 2 + 6);
  }
}

function clearWritingCanvas() {
  drawCanvasWatermark();
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
      `<button class="jamo-btn ${idx === labState.choIdx ? "active" : ""}" onclick="selectLabJamo('cho', ${idx})">${c.char} <small class="roman-text">${c.roman}</small></button>`
  ).join("");

  jungEl.innerHTML = JUNGSEONG_LIST.map(
    (v, idx) =>
      `<button class="jamo-btn ${idx === labState.jungIdx ? "active" : ""}" onclick="selectLabJamo('jung', ${idx})">${v.char} <small class="roman-text">${v.roman}</small></button>`
  ).join("");

  const commonJongIndices = [0, 1, 4, 7, 8, 16, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27];
  jongEl.innerHTML = commonJongIndices
    .map((idx) => {
      const j = JONGSEONG_LIST[idx];
      const label = j.char ? `${j.char} <small class="roman-text">-${j.roman}</small>` : "Aucun";
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
  document.getElementById("lab-formula-text").innerHTML = `${parts.join(" + ")} = ${syllableChar} <span class="roman-text">[${romanFull}]</span>`;
  if (autoPlay) speakKorean(syllableChar, 0.85);
}

function playCurrentLabSyllable(rate = 0.85) {
  speakKorean(document.getElementById("lab-big-char").textContent, rate);
}

// ==========================================
// 5. MODULE 2 : GRAMMAIRE FONDAMENTALE & DÉCODEUR POLITESSE
// ==========================================
function renderGrammarModule() {
  const container = document.getElementById("grammar-lessons-container");
  if (!container) return;

  container.innerHTML = GRAMMAR_LESSONS.map((lesson) => {
    const keyPointsHtml = lesson.keyPoints.map((kp) => `<li>${kp}</li>`).join("");

    const examplesHtml = lesson.examples
      .map((ex) => {
        const cleanSpeak = ex.kr.includes("→") ? ex.kr.split("→")[1].split("/")[0].trim() : ex.kr.split("(")[0].trim();
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

  // Rendu du tableau comparatif des 3 niveaux de politesse
  const polBody = document.getElementById("politeness-table-body");
  if (polBody) {
    polBody.innerHTML = POLITENESS_COMPARISONS.map(
      (row) => `
      <tr>
        <td style="font-weight:700; color:#34d399;">${row.meaning}</td>
        <td>
          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
            <div>
              <div style="font-family:var(--font-kr); font-weight:800; font-size:1.05rem;">${row.formal.kr}</div>
              <div class="roman-text" style="font-size:0.76rem; color:var(--text-secondary);">${row.formal.roman}</div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="speakKorean('${row.formal.kr.split('/')[0].trim()}', 0.85)">🔊</button>
          </div>
        </td>
        <td>
          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
            <div>
              <div style="font-family:var(--font-kr); font-weight:800; font-size:1.05rem; color:#60a5fa;">${row.polite.kr}</div>
              <div class="roman-text" style="font-size:0.76rem; color:var(--text-secondary);">${row.polite.roman}</div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="speakKorean('${row.polite.kr.split('/')[0].trim()}', 0.85)">🔊</button>
          </div>
        </td>
        <td>
          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
            <div>
              <div style="font-family:var(--font-kr); font-weight:800; font-size:1.05rem; color:#fbbf24;">${row.casual.kr}</div>
              <div class="roman-text" style="font-size:0.76rem; color:var(--text-secondary);">${row.casual.roman}</div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="speakKorean('${row.casual.kr.split('/')[0].replace(/\(.*?\)/g, '').trim()}', 0.85)">🔊</button>
          </div>
        </td>
      </tr>
    `
    ).join("");
  }
}

// ==========================================
// 6. MODULE 3 : ATELIER DE CONJUGAISON (PRÉSENT, PASSÉ, FUTUR, ENVIE)
// ==========================================
function renderConjugationModule() {
  const container = document.getElementById("conjugation-list-container");
  if (!container) return;

  container.innerHTML = CONJUGATION_VERBS.map((v) => {
    const tenses = [
      { label: "Présent Poli (-아요/어요)", data: v.present },
      { label: "Passé Poli (-았/었어요)", data: v.past },
      { label: "Futur (-(으)ㄹ 거예요)", data: v.future },
      { label: "Envie (-고 싶어요)", data: v.want }
    ];

    const tensesHtml = tenses
      .map((t) => {
        const canSpeak = !t.data.kr.startsWith("—");
        return `
          <div class="conj-tense-box">
            <div>
              <div class="conj-tense-label">${t.label}</div>
              <div class="conj-tense-kr">${t.data.kr}</div>
              <div class="roman-text" style="font-size:0.78rem; color:var(--text-secondary);">[${t.data.roman}]</div>
              <div style="font-size:0.82rem; color:#34d399; font-weight:600; margin-top:2px;">${t.data.fr}</div>
            </div>
            ${
              canSpeak
                ? `<button class="btn btn-secondary btn-sm" onclick="speakKorean('${t.data.kr}', 0.85)">🔊</button>`
                : ""
            }
          </div>
        `;
      })
      .join("");

    return `
      <div class="conj-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
          <div>
            <span class="level-badge">${v.ruleGroup}</span>
            <h3 style="font-size:1.3rem; font-weight:800;">
              <span style="font-family:var(--font-kr); color:#fbbf24;">${v.infinitive}</span>
              <span style="font-size:1rem; color:var(--text-secondary); font-weight:600;">(radical : ${v.stem}-)</span>
              — ${v.meaning}
            </h3>
            <p style="font-size:0.88rem; color:var(--text-secondary); margin-top:4px;">💡 ${v.ruleNote}</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="speakKorean('${v.infinitive}', 0.85)">🔊 Infinitif</button>
        </div>
        <div class="conj-tenses-grid">${tensesHtml}</div>
      </div>
    `;
  }).join("");
}

// ==========================================
// 7. MODULE 4 : VOCABULAIRE THÉMATIQUE
// ==========================================
let currentVocabFilter = "all";

function renderVocabModule() {
  const tabsEl = document.getElementById("vocab-category-tabs");
  if (!tabsEl) return;

  tabsEl.innerHTML = [
    `<button class="subtab-btn ${currentVocabFilter === "all" ? "active" : ""}" onclick="setVocabCategory('all')">Tous (${ALL_VOCAB_LIST.length})</button>`,
    `<button class="subtab-btn ${currentVocabFilter === "starred" ? "active" : ""}" onclick="setVocabCategory('starred')">⭐ Mes Favoris & Erreurs</button>`,
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
  if (!container) return;

  const reviewIds = getReviewPoolIds();

  const categoriesToShow =
    currentVocabFilter === "all" || currentVocabFilter === "starred"
      ? VOCAB_CATEGORIES
      : VOCAB_CATEGORIES.filter((c) => c.id === currentVocabFilter);

  const html = categoriesToShow
    .map((cat) => {
      const filteredWords = cat.words
        .map((w, idx) => ({ ...w, id: `${cat.id}_${idx}` }))
        .filter((w) => {
          if (currentVocabFilter === "starred" && !reviewIds.includes(w.id)) return false;
          if (!query) return true;
          return (
            w.kr.toLowerCase().includes(query) ||
            w.roman.toLowerCase().includes(query) ||
            w.fr.toLowerCase().includes(query) ||
            w.note.toLowerCase().includes(query)
          );
        });

      if (filteredWords.length === 0) return "";

      const cardsHtml = filteredWords
        .map((w) => {
          const cleanAudio = w.kr.includes("→")
            ? w.kr.split("→")[1].trim()
            : w.kr.replace(/\(.*?\)/g, "").split("/")[0].trim();
          const isStarred = userState.bookmarkedIds.includes(w.id);
          const isWeak = userState.weakIds.includes(w.id);

          return `
            <div class="vocab-item-card ${isStarred || isWeak ? "weak-marked" : ""}">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                  <div>
                    <div class="voc-kr">${w.kr}</div>
                    <div class="voc-roman">[${w.roman}]</div>
                  </div>
                  <div style="display:flex; align-items:center; gap:6px;">
                    <button class="star-btn ${isStarred ? "starred" : ""}" title="Ajouter aux favoris à réviser" onclick="toggleBookmark('${w.id}', event)">
                      ${isStarred ? "⭐" : "☆"}
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="speakKorean('${cleanAudio.replace(/'/g, "\\'")}', 0.88)" title="Écouter">🔊</button>
                    <button class="btn btn-secondary btn-sm" onclick="speakKorean('${cleanAudio.replace(/'/g, "\\'")}', 0.52)" title="Lent">🐢</button>
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

  container.innerHTML =
    html ||
    `<div style="padding:32px; text-align:center; color:var(--text-secondary); background:var(--bg-surface); border-radius:12px;">Aucun mot trouvé pour ce filtre. Cliquez sur ☆ sur n'importe quel mot pour l'ajouter à vos favoris !</div>`;
}

// ==========================================
// 8. MODULE 5 : MINI-DIALOGUES RÉELS INTERACTIFS
// ==========================================
let hideDialogueTranslations = false;

function toggleDialogueTranslations() {
  hideDialogueTranslations = !hideDialogueTranslations;
  const btn = document.getElementById("toggle-dlg-fr-btn");
  if (btn) {
    btn.textContent = hideDialogueTranslations
      ? "👁️ Afficher les traductions françaises"
      : "🙈 Masquer les traductions françaises (Tester ma compréhension)";
  }
  document.querySelectorAll(".dlg-fr").forEach((el) => {
    el.style.display = hideDialogueTranslations ? "none" : "block";
  });
}

function renderDialoguesModule() {
  const container = document.getElementById("dialogues-container");
  if (!container) return;

  container.innerHTML = REAL_DIALOGUES.map((dlg) => {
    const linesHtml = dlg.lines
      .map(
        (line, lIdx) => `
        <div class="dialogue-line" id="dlg-line-${dlg.id}-${lIdx}">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
            <div>
              <div class="dlg-speaker">${line.speaker}</div>
              <div class="dlg-kr">${line.kr}</div>
              <div class="roman-text" style="font-size:0.84rem; color:#60a5fa;">${line.roman}</div>
              <div class="dlg-fr" style="display:${hideDialogueTranslations ? "none" : "block"};">→ ${line.fr}</div>
            </div>
            <div style="display:flex; gap:6px; flex-shrink:0;">
              <button class="btn btn-primary btn-sm" onclick="speakKorean('${line.kr.replace(/'/g, "\\'")}', 0.88)">🔊</button>
              <button class="btn btn-secondary btn-sm" onclick="speakKorean('${line.kr.replace(/'/g, "\\'")}', 0.55)">🐢</button>
            </div>
          </div>
          <div class="dlg-grammar">🔍 <strong>Analyse :</strong> ${line.grammarNote}</div>
        </div>
      `
      )
      .join("");

    const quizOpts = dlg.quiz.options
      .map(
        (opt, oIdx) => `
        <button class="btn btn-secondary btn-sm" style="justify-content:flex-start; text-align:left; width:100%; margin-top:6px;" onclick="checkDialogueQuiz('${dlg.id}', ${oIdx})">
          ${opt}
        </button>
      `
      )
      .join("");

    return `
      <div class="dialogue-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
          <div>
            <span class="level-badge">${dlg.level}</span>
            <h2 style="font-size:1.3rem; font-weight:800;">${dlg.title}</h2>
            <p style="font-size:0.9rem; color:var(--text-secondary);">${dlg.situation}</p>
          </div>
          <button class="btn btn-emerald btn-sm" onclick="playFullDialogue('${dlg.id}')">
            ▶ Écouter tout le dialogue
          </button>
        </div>

        <div class="dialogue-lines">${linesHtml}</div>

        <div style="background:var(--bg-elevated); border:1px solid var(--border-light); border-radius:12px; padding:16px;">
          <div style="font-size:0.8rem; font-weight:800; color:#fbbf24; text-transform:uppercase; margin-bottom:4px;">
            ❓ Question de compréhension
          </div>
          <div style="font-weight:700; margin-bottom:8px;">${dlg.quiz.question}</div>
          <div>${quizOpts}</div>
          <div id="dlg-quiz-fb-${dlg.id}" style="margin-top:10px; font-size:0.88rem; display:none;"></div>
        </div>
      </div>
    `;
  }).join("");
}

function playFullDialogue(dlgId) {
  const dlg = REAL_DIALOGUES.find((d) => d.id === dlgId);
  if (!dlg) return;

  let idx = 0;
  function playNext() {
    document.querySelectorAll(".dialogue-line").forEach((el) => el.classList.remove("playing"));
    if (idx >= dlg.lines.length) return;
    const lineEl = document.getElementById(`dlg-line-${dlg.id}-${idx}`);
    if (lineEl) lineEl.classList.add("playing");
    const lineText = dlg.lines[idx].kr;
    idx++;
    speakKorean(lineText, 0.86, () => {
      setTimeout(playNext, 350);
    });
  }
  playNext();
}

function checkDialogueQuiz(dlgId, chosenIdx) {
  const dlg = REAL_DIALOGUES.find((d) => d.id === dlgId);
  if (!dlg) return;
  const isOk = chosenIdx === dlg.quiz.correctIndex;
  playFeedbackTone(isOk);
  const fb = document.getElementById(`dlg-quiz-fb-${dlgId}`);
  if (fb) {
    fb.style.display = "block";
    fb.style.color = isOk ? "#34d399" : "#fb7185";
    fb.innerHTML = isOk ? `✅ ${dlg.quiz.explanation}` : `❌ Pas tout à fait ! ${dlg.quiz.explanation}`;
  }
}

// ==========================================
// 9. MODULE 6 : CONVERTISSEUR & GÉNÉRATEUR HEURES, PRIX EN WONS & COMPTEURS
// ==========================================
const NATIVE_HOURS = ["", "한", "두", "세", "네", "다섯", "여섯", "일곱", "여덟", "아홉", "열", "열한", "열두"];
const NATIVE_HOURS_ROMAN = ["", "han", "du", "se", "ne", "da-seot", "yeo-seot", "il-gop", "yeo-deol", "a-hop", "yeol", "yeol-han", "yeol-du"];
const SINO_DIGITS = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
const SINO_DIGITS_ROMAN = ["", "il", "i", "sam", "sa", "o", "yuk", "chil", "pal", "gu"];

function numberToSinoKorean(n) {
  if (n === 0) return { kr: "영", roman: "yeong" };
  let kr = "";
  let romanParts = [];

  const man = Math.floor(n / 10000);
  const remMan = n % 10000;
  const cheon = Math.floor(remMan / 1000);
  const remCheon = remMan % 1000;
  const baek = Math.floor(remCheon / 100);
  const remBaek = remCheon % 100;
  const sip = Math.floor(remBaek / 10);
  const unit = remBaek % 10;

  if (man > 0) {
    if (man === 1) {
      kr += "만 ";
      romanParts.push("man");
    } else {
      const sub = numberToSinoKorean(man);
      kr += `${sub.kr}만 `;
      romanParts.push(`${sub.roman}-man`);
    }
  }
  if (cheon > 0) {
    kr += (cheon === 1 ? "" : SINO_DIGITS[cheon]) + "천";
    romanParts.push((cheon === 1 ? "" : SINO_DIGITS_ROMAN[cheon] + "-") + "cheon");
  }
  if (baek > 0) {
    kr += (baek === 1 ? "" : SINO_DIGITS[baek]) + "백";
    romanParts.push((baek === 1 ? "" : SINO_DIGITS_ROMAN[baek] + "-") + "baek");
  }
  if (sip > 0) {
    kr += (sip === 1 ? "" : SINO_DIGITS[sip]) + "십";
    romanParts.push((sip === 1 ? "" : SINO_DIGITS_ROMAN[sip] + "-") + "sip");
  }
  if (unit > 0) {
    kr += SINO_DIGITS[unit];
    romanParts.push(SINO_DIGITS_ROMAN[unit]);
  }

  return { kr: kr.trim(), roman: romanParts.join(" ") };
}

function updateTimeConverter(autoSpeak = false) {
  const h = parseInt(document.getElementById("input-hour")?.value || "2", 10);
  const m = parseInt(document.getElementById("input-minute")?.value || "30", 10);

  const hKr = `${NATIVE_HOURS[h]} 시`;
  const hRom = `${NATIVE_HOURS_ROMAN[h]} si`;

  let mKr = "";
  let mRom = "";
  if (m > 0) {
    const sinoM = numberToSinoKorean(m);
    mKr = ` ${sinoM.kr} 분`;
    mRom = ` ${sinoM.roman} bun`;
    if (m === 30) {
      mKr += " (ou 반)";
      mRom += " (ou ban)";
    }
  }

  const displayTime = `${String(h).padStart(2, "0")}h${String(m).padStart(2, "0")}`;
  const fullKrSpeak = m === 0 ? hKr : `${hKr} ${numberToSinoKorean(m).kr} 분`;

  document.getElementById("gen-time-digits").textContent = displayTime;
  document.getElementById("gen-time-kr").textContent = `${hKr}${mKr}`;
  document.getElementById("gen-time-roman").textContent = `[${hRom}${mRom}]`;
  document.getElementById("gen-time-kr").dataset.speak = fullKrSpeak;

  if (autoSpeak) speakKorean(fullKrSpeak, 0.85);
}

function randomizeTimeGenerator() {
  const randomH = Math.floor(Math.random() * 12) + 1;
  const minsPool = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const randomM = minsPool[Math.floor(Math.random() * minsPool.length)];
  document.getElementById("input-hour").value = randomH;
  document.getElementById("input-minute").value = randomM;
  updateTimeConverter(true);
}

function updateWonConverter(autoSpeak = false) {
  const val = parseInt(document.getElementById("input-won")?.value || "15000", 10);
  const sino = numberToSinoKorean(val);
  const fullKr = `${sino.kr} 원`;
  const fullRom = `${sino.roman} won`;

  document.getElementById("gen-won-digits").textContent = `${val.toLocaleString("fr-FR")} ₩`;
  document.getElementById("gen-won-kr").textContent = fullKr;
  document.getElementById("gen-won-roman").textContent = `[${fullRom}]`;
  document.getElementById("gen-won-kr").dataset.speak = fullKr;

  if (autoSpeak) speakKorean(fullKr, 0.85);
}

function randomizeWonGenerator() {
  const samplePrices = [1500, 3000, 4500, 8000, 10000, 12000, 15000, 24000, 35000, 50000, 100000];
  const picked = samplePrices[Math.floor(Math.random() * samplePrices.length)];
  document.getElementById("input-won").value = picked;
  updateWonConverter(true);
}

// ==========================================
// 10. MODULE 7 : CHECKLIST PROGRESSION NIVEAU 1 (OBJECTIF A1)
// ==========================================
function renderChecklistModule() {
  const container = document.getElementById("checklist-items-container");
  if (!container) return;

  const doneCount = userState.checkedMilestones.length;
  const totalCount = LEVEL1_CHECKLIST.length;
  const pct = Math.round((doneCount / totalCount) * 100);

  const barEl = document.getElementById("checklist-progress-bar");
  const labelEl = document.getElementById("checklist-progress-label");
  if (barEl) barEl.style.width = `${pct}%`;
  if (labelEl) labelEl.textContent = `${doneCount} / ${totalCount} paliers validés (${pct}%)`;

  container.innerHTML = LEVEL1_CHECKLIST.map((item) => {
    const isDone = userState.checkedMilestones.includes(item.id);
    return `
      <div class="checklist-item ${isDone ? "done" : ""}">
        <div style="display:flex; align-items:center; gap:14px;">
          <button class="chk-box-btn" onclick="toggleChecklistItem('${item.id}')">
            ${isDone ? "✓" : ""}
          </button>
          <div>
            <div style="font-weight:800; font-size:1.02rem;">${item.title}</div>
            <div style="font-size:0.85rem; color:var(--text-secondary);">${item.desc}</div>
          </div>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="switchTab('${item.tab}')">Ouvrir →</button>
      </div>
    `;
  }).join("");
}

function toggleChecklistItem(chkId) {
  const idx = userState.checkedMilestones.indexOf(chkId);
  if (idx === -1) {
    userState.checkedMilestones.push(chkId);
    playFeedbackTone(true);
  } else {
    userState.checkedMilestones.splice(idx, 1);
  }
  saveState();
  renderChecklistModule();
}

// ==========================================
// 11. AUTOMATE CLAVIER HANGEUL VIRTUEL (JAMO → SYLLABES UNICODE)
// ==========================================
const CHO_CHARS = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const JUNG_CHARS = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
const JONG_CHARS = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

const COMPOUND_VOWELS = {
  "ㅗㅏ": "ㅘ", "ㅗㅐ": "ㅙ", "ㅗㅣ": "ㅚ",
  "ㅜㅓ": "ㅝ", "ㅜㅔ": "ㅞ", "ㅜㅣ": "ㅟ",
  "ㅡㅣ": "ㅢ"
};

let hangulJamoBuffer = [];

function composeJamoSequence(jamos) {
  let result = "";
  let state = 0;
  let cho = -1, jung = -1, jong = 0;

  function flush() {
    if (state === 1 && cho !== -1) {
      result += CHO_CHARS[cho];
    } else if (state >= 2 && cho !== -1 && jung !== -1) {
      result += String.fromCodePoint(0xac00 + cho * 21 * 28 + jung * 28 + jong);
    }
    state = 0;
    cho = -1;
    jung = -1;
    jong = 0;
  }

  for (let i = 0; i < jamos.length; i++) {
    const ch = jamos[i];
    if (ch === " ") {
      flush();
      result += " ";
      continue;
    }

    const isVowel = JUNG_CHARS.includes(ch);
    const isCons = CHO_CHARS.includes(ch);

    if (isCons) {
      if (state === 0) {
        cho = CHO_CHARS.indexOf(ch);
        state = 1;
      } else if (state === 1) {
        flush();
        cho = CHO_CHARS.indexOf(ch);
        state = 1;
      } else if (state === 2) {
        const jIdx = JONG_CHARS.indexOf(ch);
        if (jIdx > 0) {
          jong = jIdx;
          state = 3;
        } else {
          flush();
          cho = CHO_CHARS.indexOf(ch);
          state = 1;
        }
      } else if (state === 3) {
        flush();
        cho = CHO_CHARS.indexOf(ch);
        state = 1;
      }
    } else if (isVowel) {
      if (state === 0) {
        result += ch;
      } else if (state === 1) {
        jung = JUNG_CHARS.indexOf(ch);
        state = 2;
      } else if (state === 2) {
        const curV = JUNG_CHARS[jung];
        const combined = COMPOUND_VOWELS[curV + ch];
        if (combined) {
          jung = JUNG_CHARS.indexOf(combined);
        } else {
          flush();
          result += ch;
        }
      } else if (state === 3) {
        const prevJongChar = JONG_CHARS[jong];
        const newChoIdx = CHO_CHARS.indexOf(prevJongChar);
        if (newChoIdx !== -1) {
          jong = 0;
          flush();
          cho = newChoIdx;
          jung = JUNG_CHARS.indexOf(ch);
          state = 2;
        } else {
          flush();
          result += ch;
        }
      }
    }
  }
  flush();
  return result;
}

function pressVirtualKey(jamo) {
  if (!trainerSession || trainerSession.checked) return;
  if (jamo === "BACKSPACE") {
    hangulJamoBuffer.pop();
  } else if (jamo === "CLEAR") {
    hangulJamoBuffer = [];
  } else {
    hangulJamoBuffer.push(jamo);
  }
  const composed = composeJamoSequence(hangulJamoBuffer);
  trainerSession.selectedValue = composed;
  const disp = document.getElementById("dictation-live-text");
  if (disp) disp.textContent = composed || "…";
  const btn = document.getElementById("trainer-submit-btn");
  if (btn) btn.disabled = composed.length === 0;
}

function renderVirtualKeyboardHtml() {
  const row1 = [
    { k: "ㅂ", r: "b" }, { k: "ㅈ", r: "j" }, { k: "ㄷ", r: "d" }, { k: "ㄱ", r: "g" }, { k: "ㅅ", r: "s" },
    { k: "ㅛ", r: "yo" }, { k: "ㅕ", r: "yeo" }, { k: "ㅑ", r: "ya" }, { k: "ㅐ", r: "ae" }, { k: "ㅔ", r: "e" }
  ];
  const row2 = [
    { k: "ㅁ", r: "m" }, { k: "ㄴ", r: "n" }, { k: "ㅇ", r: "-/ng" }, { k: "ㄹ", r: "r/l" }, { k: "ㅎ", r: "h" },
    { k: "ㅗ", r: "o" }, { k: "ㅓ", r: "eo" }, { k: "ㅏ", r: "a" }, { k: "ㅣ", r: "i" }
  ];
  const row3 = [
    { k: "ㅋ", r: "k" }, { k: "ㅌ", r: "t" }, { k: "ㅊ", r: "ch" }, { k: "ㅍ", r: "p" },
    { k: "ㅠ", r: "yu" }, { k: "ㅜ", r: "u" }, { k: "ㅡ", r: "eu" },
    { k: "ㄲ", r: "kk" }, { k: "ㄸ", r: "tt" }, { k: "ㅃ", r: "pp" }, { k: "ㅆ", r: "ss" }, { k: "ㅉ", r: "jj" }
  ];

  const makeRow = (arr) =>
    arr
      .map(
        (item) =>
          `<button type="button" class="kr-key" onclick="pressVirtualKey('${item.k}')">${item.k}<small class="roman-text">${item.r}</small></button>`
      )
      .join("");

  return `
    <div class="kr-keyboard">
      <div class="kr-kb-row">${makeRow(row1)}</div>
      <div class="kr-kb-row">${makeRow(row2)}</div>
      <div class="kr-kb-row">${makeRow(row3)}</div>
      <div class="kr-kb-row" style="margin-top:8px;">
        <button type="button" class="btn btn-secondary btn-sm" onclick="pressVirtualKey('BACKSPACE')">⌫ Effacer 1 lettre</button>
        <button type="button" class="btn btn-secondary btn-sm" onclick="pressVirtualKey('CLEAR')">🗑️ Tout vider</button>
      </div>
    </div>
  `;
}

// ==========================================
// 12. RECONNAISSANCE VOCALE AU MICRO (SPEECH RECOGNITION KO-KR)
// ==========================================
let activeRecognizer = null;

function triggerMicListening(targetKr) {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const statusEl = document.getElementById("mic-live-status");
  const btnEl = document.getElementById("mic-btn-circle");

  if (!SpeechRec) {
    if (statusEl) {
      statusEl.innerHTML = `<span style="color:#fbbf24;">⚠️ Votre navigateur ne supporte pas la reconnaissance vocale Web Speech (utilisez Chrome ou Edge). Vous pouvez valider manuellement ci-dessous !</span>`;
    }
    trainerSession.selectedValue = targetKr;
    document.getElementById("trainer-submit-btn").disabled = false;
    return;
  }

  try {
    if (activeRecognizer) activeRecognizer.abort();
    activeRecognizer = new SpeechRec();
    activeRecognizer.lang = "ko-KR";
    activeRecognizer.interimResults = false;
    activeRecognizer.maxAlternatives = 3;

    if (btnEl) btnEl.classList.add("listening");
    if (statusEl) statusEl.textContent = "🎙️ Écoute en cours... Parlez en coréen maintenant !";

    activeRecognizer.onresult = (event) => {
      if (btnEl) btnEl.classList.remove("listening");
      const transcripts = [];
      for (let i = 0; i < event.results[0].length; i++) {
        transcripts.push(event.results[0][i].transcript.trim());
      }
      const heard = transcripts[0] || "";
      const normalize = (s) => s.replace(/[\s.,?!]/g, "");
      const matched = transcripts.some((t) => normalize(t) === normalize(targetKr) || normalize(t).includes(normalize(targetKr)));

      trainerSession.selectedValue = matched ? targetKr : heard;
      if (statusEl) {
        statusEl.innerHTML = matched
          ? `<span style="color:#34d399; font-weight:800;">🎉 Entendu : « ${heard} » — Prononciation parfaite !</span>`
          : `<span style="color:#fbbf24; font-weight:700;">Entendu : « ${heard || "..."} » (Attendu : ${targetKr}). Vous pouvez réessayer ou vérifier !</span>`;
      }
      document.getElementById("trainer-submit-btn").disabled = false;
    };

    activeRecognizer.onerror = (err) => {
      if (btnEl) btnEl.classList.remove("listening");
      if (statusEl) {
        statusEl.innerHTML = `<span style="color:#fbbf24;">Micro non détecté ou silence (${err.error}). Cliquez à nouveau sur 🎙️ ou passez à la vérification.</span>`;
      }
      trainerSession.selectedValue = targetKr;
      document.getElementById("trainer-submit-btn").disabled = false;
    };

    activeRecognizer.start();
  } catch (e) {
    if (btnEl) btnEl.classList.remove("listening");
  }
}

// ==========================================
// 13. DÉFI LECTURE CHRONO 60 SECONDES & FLASHCARDS RECTO-VERSO
// ==========================================
let sprintInterval = null;
let sprintState = null;

function startSpeedSprint() {
  if (sprintInterval) clearInterval(sprintInterval);
  sprintState = {
    timeLeft: 60,
    score: 0,
    streak: 0,
    currentQ: null
  };

  document.getElementById("trainer-menu").style.display = "none";
  document.getElementById("trainer-active-area").style.display = "block";
  document.getElementById("trainer-submit-btn").style.display = "none";
  document.getElementById("trainer-feedback").className = "feedback-banner";

  sprintInterval = setInterval(() => {
    if (!sprintState) return;
    sprintState.timeLeft--;
    const timerEl = document.getElementById("sprint-timer-val");
    if (timerEl) timerEl.textContent = `${sprintState.timeLeft}s`;
    const pct = Math.round(((60 - sprintState.timeLeft) / 60) * 100);
    document.getElementById("trainer-progress-bar").style.width = `${pct}%`;

    if (sprintState.timeLeft <= 0) {
      clearInterval(sprintInterval);
      sprintInterval = null;
      finishSpeedSprint();
    }
  }, 1000);

  nextSprintQuestion();
}

function nextSprintQuestion() {
  if (!sprintState) return;
  const useVocab = Math.random() > 0.45;
  const pool = useVocab ? ALL_VOCAB_LIST : ALL_HANGUL_LIST;
  const target = pool[Math.floor(Math.random() * pool.length)];
  const others = shuffle(pool.filter((x) => x.id !== target.id)).slice(0, 3);
  const options = shuffle([target, ...others]);

  sprintState.currentQ = { useVocab, target, options };
  document.getElementById("trainer-step-counter").innerHTML = `⏱️ <strong id="sprint-timer-val" style="color:#fbbf24;">${sprintState.timeLeft}s</strong> | Score : <strong style="color:#34d399;">${sprintState.score}</strong>`;

  const displayKr = useVocab ? target.audioKr : target.syllable;
  const choicesHtml = options
    .map((opt) => {
      const label = useVocab ? opt.fr : `${opt.roman} (${opt.char})`;
      return `<button class="choice-card" onclick="answerSprint('${opt.id}')"><div style="font-size:1.1rem; font-weight:800;">${label}</div></button>`;
    })
    .join("");

  document.getElementById("trainer-question-body").innerHTML = `
    <div style="text-align:center;">
      <div style="font-size:0.8rem; font-weight:800; color:#fbbf24; text-transform:uppercase;">⚡ Sprint Lecture Rapide 60s</div>
      <div style="font-family:var(--font-kr); font-size:3.5rem; font-weight:900; margin:12px 0;">${displayKr}</div>
    </div>
    <div class="choices-grid">${choicesHtml}</div>
  `;
}

function answerSprint(chosenId) {
  if (!sprintState || !sprintState.currentQ) return;
  const isOk = chosenId === sprintState.currentQ.target.id;
  playFeedbackTone(isOk);
  if (isOk) {
    sprintState.score += 10;
    userState.correctAnswers++;
  } else {
    recordMistakeItem(sprintState.currentQ.target.id);
  }
  nextSprintQuestion();
}

function finishSpeedSprint() {
  const finalScore = sprintState ? sprintState.score : 0;
  if (finalScore > (userState.bestSprintScore || 0)) {
    userState.bestSprintScore = finalScore;
  }
  userState.completedExercises++;
  saveState();

  document.getElementById("trainer-question-body").innerHTML = `
    <div style="text-align:center; padding:24px 0;">
      <div style="font-size:3.5rem; margin-bottom:10px;">⚡</div>
      <h2 style="font-size:1.8rem; font-weight:800; margin-bottom:6px;">Temps écoulé ! Score : ${finalScore} pts</h2>
      <p style="color:#fbbf24; font-weight:700; margin-bottom:20px;">Record personnel : ${userState.bestSprintScore} pts</p>
      <div style="display:flex; justify-content:center; gap:12px;">
        <button class="btn btn-amber" onclick="startSpeedSprint()">🔄 Rejouer le Chrono 60s</button>
        <button class="btn btn-secondary" onclick="exitPracticeSession()">Retour aux modes</button>
      </div>
    </div>
  `;
}

// MODE FLASHCARDS RECTO-VERSO
let flashcardDeck = [];
let flashcardIdx = 0;
let flashcardFlipped = false;

function startFlashcards() {
  const combined = [
    ...ALL_HANGUL_LIST.map((h) => ({
      id: h.id,
      front: `${h.char} (${h.syllable})`,
      audio: h.syllable,
      backTitle: h.roman,
      backSub: h.frenchSound,
      backNote: h.mnemonic
    })),
    ...ALL_VOCAB_LIST.map((v) => ({
      id: v.id,
      front: v.kr,
      audio: v.audioKr,
      backTitle: v.fr,
      backSub: `[${v.roman}]`,
      backNote: v.note
    }))
  ];
  flashcardDeck = shuffle(combined).slice(0, 15);
  flashcardIdx = 0;
  flashcardFlipped = false;

  document.getElementById("trainer-menu").style.display = "none";
  document.getElementById("trainer-active-area").style.display = "block";
  document.getElementById("trainer-submit-btn").style.display = "none";
  document.getElementById("trainer-feedback").className = "feedback-banner";
  renderCurrentFlashcard();
}

function renderCurrentFlashcard() {
  if (flashcardIdx >= flashcardDeck.length) {
    userState.completedExercises++;
    saveState();
    document.getElementById("trainer-question-body").innerHTML = `
      <div style="text-align:center; padding:24px 0;">
        <div style="font-size:3rem;">🃏</div>
        <h2 style="margin:10px 0;">Paquet de 15 Flashcards terminé !</h2>
        <div style="display:flex; justify-content:center; gap:12px; margin-top:18px;">
          <button class="btn btn-primary" onclick="startFlashcards()">🔄 Nouveau paquet</button>
          <button class="btn btn-secondary" onclick="exitPracticeSession()">Retour aux modes</button>
        </div>
      </div>
    `;
    return;
  }

  const card = flashcardDeck[flashcardIdx];
  const pct = Math.round((flashcardIdx / flashcardDeck.length) * 100);
  document.getElementById("trainer-progress-bar").style.width = `${pct}%`;
  document.getElementById("trainer-step-counter").textContent = `Carte ${flashcardIdx + 1} / ${flashcardDeck.length}`;

  if (!flashcardFlipped) {
    speakKorean(card.audio, 0.86);
  }

  document.getElementById("trainer-question-body").innerHTML = `
    <div style="font-size:0.8rem; font-weight:700; color:#c084fc; text-transform:uppercase; margin-bottom:8px;">
      🃏 Flashcards Recto-Verso (Cliquez sur la carte pour la retourner)
    </div>
    <div class="flashcard-stage" onclick="flipCurrentFlashcard()">
      <div style="font-family:var(--font-kr); font-size:3rem; font-weight:900;">${card.front}</div>
      ${
        flashcardFlipped
          ? `
          <div style="margin-top:16px; padding-top:16px; border-top:1px dashed var(--border-light); width:100%;">
            <div style="font-size:1.4rem; font-weight:800; color:#34d399;">${card.backTitle}</div>
            <div style="color:#60a5fa; font-weight:600; margin-top:4px;">${card.backSub}</div>
            <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:8px;">💡 ${card.backNote}</div>
          </div>
        `
          : `<div style="font-size:0.85rem; color:var(--text-secondary); margin-top:14px;">👆 Cliquez pour révéler la réponse</div>`
      }
    </div>
    <div style="display:flex; justify-content:center; gap:12px; margin-top:18px; flex-wrap:wrap;">
      <button class="btn btn-secondary" onclick="speakKorean('${card.audio.replace(/'/g, "\\'")}', 0.85)">🔊 Réécouter</button>
      <button class="btn btn-amber" onclick="rateFlashcard(false)">❌ Difficile (Ajouter à mes révisions)</button>
      <button class="btn btn-emerald" onclick="rateFlashcard(true)">✅ Connu (Carte suivante →)</button>
    </div>
  `;
}

function flipCurrentFlashcard() {
  flashcardFlipped = !flashcardFlipped;
  renderCurrentFlashcard();
}

function rateFlashcard(known) {
  const card = flashcardDeck[flashcardIdx];
  if (!known) {
    recordMistakeItem(card.id);
  } else {
    userState.correctAnswers++;
    saveState();
  }
  flashcardIdx++;
  flashcardFlipped = false;
  renderCurrentFlashcard();
}

// ==========================================
// 14. CENTRE D'EXERCICES PRINCIPAL (MODES CLASSIQUES + MICRO + EXAMEN A1)
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
  if (sprintInterval) {
    clearInterval(sprintInterval);
    sprintInterval = null;
  }
  document.getElementById("trainer-submit-btn").style.display = "inline-flex";

  let questions = [];

  if (mode === "weak_review") {
    const reviewIds = getReviewPoolIds();
    if (reviewIds.length === 0) {
      alert("Vous n'avez encore aucun élément dans vos Favoris (⭐) ou Erreurs ! Cliquez sur ☆ sur une carte ou lancez une série normale.");
      return;
    }

    reviewIds.forEach((id) => {
      if (ALL_HANGUL_MAP[id]) {
        const item = ALL_HANGUL_MAP[id];
        const others = shuffle(ALL_HANGUL_LIST.filter((x) => x.id !== item.id)).slice(0, 3);
        questions.push({
          qType: "hangul_read",
          itemId: item.id,
          badge: "Révision Ciblée • Hangeul",
          title: `Comment se prononce le caractère « ${item.char} » (bloc ${item.syllable}) ?`,
          item,
          options: shuffle([item, ...others])
        });
      } else if (ALL_VOCAB_MAP[id]) {
        const word = ALL_VOCAB_MAP[id];
        const others = shuffle(ALL_VOCAB_LIST.filter((w) => w.id !== word.id)).slice(0, 3);
        questions.push({
          qType: "vocab_kr_to_fr",
          itemId: word.id,
          badge: `Révision Ciblée • ${word.categoryTitle}`,
          word,
          options: shuffle([word, ...others])
        });
      }
    });
    questions = shuffle(questions).slice(0, 12);
  } else if (mode === "mic_speaking") {
    questions = shuffle(MIC_CHALLENGES).slice(0, 6).map((mc) => ({
      qType: "mic_challenge",
      badge: "🎤 Prononciation Orale au Micro",
      mc
    }));
  } else if (mode === "hangul_basic" || mode === "hangul_all") {
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
          itemId: item.id,
          badge: "Hangeul • Écoute & Reconnaissance",
          title: "Écoutez le son et choisissez le caractère Hangeul correspondant :",
          item,
          options
        });
      } else {
        questions.push({
          qType: "hangul_read",
          itemId: item.id,
          badge: "Hangeul • Lecture phonétique",
          title: `Comment se prononce le caractère « ${item.char} » (bloc ${item.syllable}) ?`,
          item,
          options
        });
      }
    });
  } else if (mode === "dictation") {
    questions = shuffle(DICTATION_WORDS)
      .slice(0, 8)
      .map((dw) => ({
        qType: "dictation_kb",
        badge: "Dictée & Écriture au Clavier Hangeul",
        dw
      }));
  } else if (mode === "conjugation") {
    const usableVerbs = CONJUGATION_VERBS.filter((v) => !v.want.kr.startsWith("—"));
    const tenseKeys = [
      { key: "present", name: "Présent poli (-아요/어요/해요)" },
      { key: "past", name: "Passé poli (-았어요/었어요/했어요)" },
      { key: "future", name: "Futur (-(으)ㄹ 거예요)" },
      { key: "want", name: "Envie / Vouloir (-고 싶어요)" }
    ];

    shuffle(usableVerbs)
      .slice(0, 8)
      .forEach((verb, idx) => {
        const t = tenseKeys[idx % tenseKeys.length];
        const correctForm = verb[t.key].kr;
        const wrongForms = tenseKeys
          .filter((tk) => tk.key !== t.key)
          .map((tk) => verb[tk.key].kr);

        questions.push({
          qType: "conj_quiz",
          badge: `Conjugaison • ${t.name}`,
          verb,
          tenseLabel: t.name,
          correct: correctForm,
          targetData: verb[t.key],
          options: shuffle([correctForm, ...wrongForms])
        });
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
        itemId: word.id,
        badge: `Vocabulaire • ${word.categoryTitle}`,
        word,
        options
      });
    });
  } else if (mode === "exam_a1") {
    // Examen Blanc Complet Niveau 1 (12 questions couvrant Hangeul, Vocabulaire, Particules, Conjugaison & Syntaxe)
    const hSample = shuffle(ALL_HANGUL_LIST).slice(0, 3).map((item) => ({
      qType: "hangul_read",
      itemId: item.id,
      badge: "Examen A1 • Partie 1 : Hangeul",
      title: `Comment se prononce « ${item.char} » (${item.syllable}) ?`,
      item,
      options: shuffle([item, ...shuffle(ALL_HANGUL_LIST.filter((x) => x.id !== item.id)).slice(0, 3)])
    }));
    const gSample = shuffle(GRAMMAR_EXERCISES.filter((q) => q.type === "fill_particle")).slice(0, 3).map((q) => ({
      qType: "grammar_fill",
      badge: "Examen A1 • Partie 2 : Particules",
      ...q,
      shuffledOptions: shuffle(q.options)
    }));
    const sSample = shuffle(GRAMMAR_EXERCISES.filter((q) => q.type === "sentence_order")).slice(0, 2).map((q) => ({
      qType: "sentence_order",
      badge: "Examen A1 • Partie 3 : Syntaxe S-O-V",
      ...q,
      bank: shuffle([...q.blocks, ...(q.distractors || [])])
    }));
    const vSample = shuffle(ALL_VOCAB_LIST).slice(0, 4).map((word) => ({
      qType: "vocab_kr_to_fr",
      itemId: word.id,
      badge: "Examen A1 • Partie 4 : Vocabulaire",
      word,
      options: shuffle([word, ...shuffle(ALL_VOCAB_LIST.filter((w) => w.id !== word.id)).slice(0, 3)])
    }));
    questions = [...hSample, ...gSample, ...sSample, ...vSample];
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
  if (sprintInterval) {
    clearInterval(sprintInterval);
    sprintInterval = null;
  }
  trainerSession = null;
  document.getElementById("trainer-active-area").style.display = "none";
  document.getElementById("trainer-menu").style.display = "block";
  updateStatsHeader();
}

function renderTrainerStep() {
  if (!trainerSession) return;
  const { questions, index } = trainerSession;

  if (index >= questions.length) {
    renderTrainerSummary();
    return;
  }

  const q = questions[index];
  trainerSession.selectedValue = null;
  trainerSession.builtBlocks = [];
  trainerSession.checked = false;
  hangulJamoBuffer = [];

  const pct = Math.round((index / questions.length) * 100);
  document.getElementById("trainer-progress-bar").style.width = `${pct}%`;
  document.getElementById("trainer-step-counter").textContent = `Question ${index + 1} / ${questions.length}`;

  const container = document.getElementById("trainer-question-body");

  if (q.qType === "mic_challenge") {
    speakKorean(q.mc.kr, 0.85);
    container.innerHTML = `
      <div style="font-size:0.8rem; font-weight:700; color:#c084fc; text-transform:uppercase; margin-bottom:6px;">${q.badge}</div>
      <h3 style="font-size:1.25rem; margin-bottom:14px;">Écoutez puis prononcez cette expression à voix haute :</h3>
      <div style="background:var(--bg-elevated); border:1px solid var(--border-light); border-radius:14px; padding:22px; text-align:center;">
        <div style="font-family:var(--font-kr); font-size:2.4rem; font-weight:900;">${q.mc.kr}</div>
        <div class="roman-text" style="color:#60a5fa; font-size:0.95rem; margin-top:4px;">[${q.mc.roman}]</div>
        <div style="color:#34d399; font-weight:700; font-size:1.05rem; margin-top:4px;">« ${q.mc.fr} »</div>
        <div style="font-size:0.84rem; color:var(--text-secondary); margin-top:8px;">💡 ${q.mc.tip}</div>
        <div style="display:flex; justify-content:center; gap:10px; margin-top:14px;">
          <button class="btn btn-primary btn-sm" onclick="speakKorean('${q.mc.kr}', 0.88)">🔊 Écouter modèle</button>
          <button class="btn btn-secondary btn-sm" onclick="speakKorean('${q.mc.kr}', 0.52)">🐢 Lent</button>
        </div>
      </div>

      <div style="text-align:center; margin-top:22px;">
        <button id="mic-btn-circle" class="mic-record-btn" onclick="triggerMicListening('${q.mc.kr}')" title="Cliquer et parler en coréen">🎙️</button>
        <div id="mic-live-status" style="margin-top:12px; font-size:0.9rem; color:var(--text-secondary);">
          Cliquez sur le micro 🎙️ et prononcez <strong>${q.mc.kr}</strong>
        </div>
      </div>
    `;
  } else if (q.qType === "hangul_listen") {
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
  } else if (q.qType === "dictation_kb") {
    speakKorean(q.dw.kr, 0.82);
    container.innerHTML = `
      <div style="font-size:0.8rem; font-weight:700; color:#c084fc; text-transform:uppercase; margin-bottom:6px;">${q.badge}</div>
      <h3 style="font-size:1.25rem; margin-bottom:8px;">Écrivez en Hangeul le mot correspondant à :</h3>
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; background:var(--bg-elevated); padding:14px 18px; border-radius:12px;">
        <div>
          <div style="font-size:1.35rem; font-weight:800; color:#34d399;">« ${q.dw.fr} »</div>
          <div style="font-size:0.84rem; color:var(--text-secondary);">Indice décomposition : ${q.dw.hint}</div>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-primary btn-sm" onclick="speakKorean('${q.dw.kr}', 0.85)">🔊 Écouter</button>
          <button class="btn btn-secondary btn-sm" onclick="speakKorean('${q.dw.kr}', 0.5)">🐢 Lent</button>
        </div>
      </div>

      <div class="dictation-input-box">
        <span id="dictation-live-text">…</span>
      </div>
      <div style="font-size:0.8rem; color:var(--text-secondary); text-align:center;">
        Cliquez sur les lettres coréennes ci-dessous : les syllabes s'assemblent automatiquement !
      </div>
      ${renderVirtualKeyboardHtml()}
    `;
  } else if (q.qType === "conj_quiz") {
    const choicesHtml = q.options
      .map(
        (opt) => `
        <button class="choice-card" id="tchoice-${opt}" onclick="selectTrainerChoice('${opt}', '${opt}')">
          <div style="font-family:var(--font-kr); font-size:1.45rem; font-weight:800;">${opt}</div>
        </button>
      `
      )
      .join("");

    container.innerHTML = `
      <div style="font-size:0.8rem; font-weight:700; color:#c084fc; text-transform:uppercase; margin-bottom:6px;">${q.badge}</div>
      <h3 style="font-size:1.25rem; margin-bottom:12px;">Conjuguez le verbe suivant au <strong>${q.tenseLabel}</strong> :</h3>
      <div style="background:var(--bg-elevated); border:1px solid var(--border-light); border-radius:12px; padding:18px; text-align:center;">
        <div style="font-family:var(--font-kr); font-size:2rem; font-weight:900; color:#fbbf24;">${q.verb.infinitive}</div>
        <div style="color:#34d399; font-weight:700;">Sens : « ${q.verb.meaning} » (Radical : ${q.verb.stem}-)</div>
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
        <div class="roman-text" style="color:#60a5fa; font-size:0.9rem; margin-top:4px;">[${q.word.roman}]</div>
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
          <div class="roman-text" style="font-size:0.8rem; color:var(--text-secondary); margin-top:3px;">${opt.roman}</div>
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

  if (q.qType === "mic_challenge") {
    const norm = (s) => (s || "").replace(/[\s.,?!]/g, "");
    isCorrect = norm(trainerSession.selectedValue) === norm(q.mc.kr);
    explanationText = `<strong>${q.mc.kr}</strong> [${q.mc.roman}] — ${q.mc.fr}.<br>💡 ${q.mc.tip}`;
    speakKorean(q.mc.kr, 0.88);
  } else if (q.qType === "hangul_listen" || q.qType === "hangul_read") {
    isCorrect = trainerSession.selectedValue === q.item.id;
    explanationText = `<strong>${q.item.char} (${q.item.syllable})</strong> se prononce « <strong>${q.item.roman}</strong> » — ${q.item.frenchSound}.`;
    const correctEl = document.getElementById(`tchoice-${q.item.id}`);
    const selEl = document.getElementById(`tchoice-${trainerSession.selectedValue}`);
    if (correctEl) correctEl.classList.add("correct");
    if (!isCorrect && selEl) selEl.classList.add("wrong");
    speakKorean(q.item.syllable, 0.88);
  } else if (q.qType === "dictation_kb") {
    const typed = (trainerSession.selectedValue || "").trim();
    isCorrect = typed === q.dw.kr;
    explanationText = `Mot attendu : <strong style="font-family:var(--font-kr); font-size:1.2rem;">${q.dw.kr}</strong> [${q.dw.roman}] = <strong>${q.dw.fr}</strong> (${q.dw.hint}).`;
    speakKorean(q.dw.kr, 0.88);
  } else if (q.qType === "conj_quiz") {
    isCorrect = trainerSession.selectedValue === q.correct;
    explanationText = `<strong>${q.verb.infinitive} → ${q.correct}</strong> [${q.targetData.roman}] (${q.targetData.fr}).<br>💡 ${q.verb.ruleNote}`;
    const correctEl = document.getElementById(`tchoice-${q.correct}`);
    const selEl = document.getElementById(`tchoice-${trainerSession.selectedValue}`);
    if (correctEl) correctEl.classList.add("correct");
    if (!isCorrect && selEl) selEl.classList.add("wrong");
    speakKorean(q.correct, 0.88);
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
    if (trainerSession.mode === "weak_review" && q.itemId) {
      clearMistakeItem(q.itemId);
    }
    saveState();
  } else {
    if (q.itemId) {
      recordMistakeItem(q.itemId);
    }
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
        Vos erreurs éventuelles ont été automatiquement ajoutées à votre carnet « Mes Points Faibles & Favoris ».
      </p>
      <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
        <button class="btn btn-primary" onclick="startPracticeSession('${mode}')">🔄 Refaire une série</button>
        <button class="btn btn-secondary" onclick="exitPracticeSession()">Choisir un autre mode</button>
      </div>
    </div>
  `;

  const btn = document.getElementById("trainer-submit-btn");
  btn.style.display = "none";
  setTimeout(() => {
    if (btn) btn.style.display = "inline-flex";
  }, 100);
}

// ==========================================
// 10. UTILITAIRES & MODULES DU NIVEAU 2 (A2)
// ==========================================

function escapeJsString(str) {
  if (!str) return "";
  return String(str)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ");
}

// ------------------------------------------
// MODULE A2-1 : GRAMMAIRE A2 & POLITESSE
// ------------------------------------------
function filterGrammarA2(subId) {
  document.querySelectorAll("#grammar-a2-subtabs .subtab-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.sub === subId);
  });
  renderLevel2Grammar(subId);
  if (subId === "politeness") {
    const el = document.getElementById("grammar-a2-politeness-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
}

function renderLevel2Grammar(filter = "all") {
  const container = document.getElementById("grammar-a2-cards-container");
  if (!container || !LEVEL2_GRAMMAR) return;

  let items = LEVEL2_GRAMMAR;
  if (filter === "ability") items = items.filter((g) => g.id === "l2_g1");
  else if (filter === "obligation") items = items.filter((g) => g.id === "l2_g2");
  else if (filter === "continuous") items = items.filter((g) => g.id === "l2_g3");

  container.innerHTML = items
    .map((g) => {
      const keyPointsHtml = (g.keyPoints || [])
        .map((kp) => `<li>${kp}</li>`)
        .join("");

      const examplesHtml = (g.examples || [])
        .map((ex) => {
          return `
          <div class="ex-item-card" style="margin-bottom:8px;">
            <div class="ex-head">
              <div class="ex-kr">${ex.kr}</div>
              <div class="ex-actions">
                <button class="audio-btn-circle" title="Vitesse normale" onclick="speakKorean('${escapeJsString(ex.kr)}', 0.88)">🔊</button>
                <button class="audio-btn-circle audio-slow-btn" title="Vitesse lente" onclick="speakKorean('${escapeJsString(ex.kr)}', 0.6)">🐢</button>
              </div>
            </div>
            <div class="ex-roman">${ex.roman}</div>
            <div class="ex-fr">${ex.fr}</div>
          </div>
        `;
        })
        .join("");

      return `
        <div class="grammar-card-a2">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px; gap:8px;">
            <div>
              <span class="level-badge" style="background:var(--accent-purple-soft); color:#c084fc;">${g.level || "Niveau A2"}</span>
              <h2 style="font-size:1.35rem; font-weight:800; margin-top:6px;">${g.title}</h2>
              <p style="color:var(--text-secondary); font-size:0.92rem;">${g.subtitle}</p>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="speakKorean('${escapeJsString(g.title.split('—')[0].trim())}', 0.85)">🔊 Audio Règle</button>
          </div>

          <div class="formula-banner">
            <div class="formula-title">Formule & Construction</div>
            <div class="formula-body">${g.formula}</div>
          </div>

          <p style="color:var(--text-primary); font-size:0.93rem; line-height:1.55; margin-bottom:12px;">${g.explanation}</p>

          <ul class="keypoints-list">
            ${keyPointsHtml}
          </ul>

          <div style="margin-top:16px;">
            <div style="font-size:0.8rem; font-weight:800; text-transform:uppercase; color:var(--text-secondary); margin-bottom:10px;">
              Exemples d'application en contexte :
            </div>
            <div class="examples-list">
              ${examplesHtml}
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  // Politeness Table
  const pBody = document.getElementById("politeness-table-body");
  if (pBody && POLITENESS_COMPARISONS) {
    pBody.innerHTML = POLITENESS_COMPARISONS.map((p) => {
      const conceptText = p.concept || p.meaning || "";
      const frText = p.fr || "";
      const banmalKr = (p.casual && p.casual.kr) || p.banmal || "";
      const banmalRom = (p.casual && p.casual.roman) || "";
      const haeyoKr = (p.polite && p.polite.kr) || p.haeyoche || "";
      const haeyoRom = (p.polite && p.polite.roman) || "";
      const formalKr = (p.formal && p.formal.kr) || p.hasipsioche || "";
      const formalRom = (p.formal && p.formal.roman) || "";

      return `
        <tr>
          <td>
            <strong style="color:var(--text-primary); font-size:0.95rem;">${conceptText}</strong>
            ${frText ? `<br><small style="color:var(--text-muted);">${frText}</small>` : ""}
          </td>
          <td>
            <div style="display:flex; align-items:center; gap:6px;">
              <span class="verb-kr" style="color:#f59e0b;">${banmalKr}</span>
              <button class="audio-btn-circle" style="width:24px; height:24px; font-size:0.7rem;" onclick="speakKorean('${escapeJsString(banmalKr)}', 0.88)">🔊</button>
            </div>
            ${banmalRom ? `<div class="ex-roman">${banmalRom}</div>` : ""}
          </td>
          <td>
            <div style="display:flex; align-items:center; gap:6px;">
              <span class="verb-kr" style="color:#60a5fa;">${haeyoKr}</span>
              <button class="audio-btn-circle" style="width:24px; height:24px; font-size:0.7rem;" onclick="speakKorean('${escapeJsString(haeyoKr)}', 0.88)">🔊</button>
            </div>
            ${haeyoRom ? `<div class="ex-roman">${haeyoRom}</div>` : ""}
          </td>
          <td>
            <div style="display:flex; align-items:center; gap:6px;">
              <span class="verb-kr" style="color:#34d399;">${formalKr}</span>
              <button class="audio-btn-circle" style="width:24px; height:24px; font-size:0.7rem;" onclick="speakKorean('${escapeJsString(formalKr)}', 0.88)">🔊</button>
            </div>
            ${formalRom ? `<div class="ex-roman">${formalRom}</div>` : ""}
          </td>
        </tr>
      `;
    }).join("");
  }
}

// ------------------------------------------
// MODULE A2-2 : ATELIER DES VERBES IRRÉGULIERS
// ------------------------------------------
function renderIrregularsModule() {
  const container = document.getElementById("irregulars-container");
  if (!container || !IRREGULAR_VERBS) return;

  container.innerHTML = IRREGULAR_VERBS.map((irreg) => {
    const rowsHtml = irreg.verbs
      .map((v) => {
        return `
        <tr>
          <td>
            <span class="verb-kr">${v.infinitive}</span>
            <div class="ex-roman">${v.roman}</div>
          </td>
          <td>
            <span class="verb-kr verb-hl">${v.present}</span>
            <button class="audio-btn-circle" style="width:24px; height:24px; font-size:0.7rem; margin-left:4px;" onclick="speakKorean('${escapeJsString(v.present)}', 0.88)">🔊</button>
          </td>
          <td>
            <span class="verb-kr" style="color:#60a5fa;">${v.past}</span>
            <button class="audio-btn-circle" style="width:24px; height:24px; font-size:0.7rem; margin-left:4px;" onclick="speakKorean('${escapeJsString(v.past)}', 0.88)">🔊</button>
          </td>
          <td>
            <div style="font-weight:600; color:var(--text-primary);">${v.fr}</div>
            ${v.note ? `<div style="font-size:0.78rem; color:var(--text-secondary); margin-top:2px;">${v.note}</div>` : ""}
          </td>
        </tr>
      `;
      })
      .join("");

    return `
      <div class="irregular-card">
        <div class="irregular-badge-row">
          <div class="irregular-char-badge">${irreg.type.slice(0, 1)}</div>
          <div>
            <h2 style="font-size:1.25rem; font-weight:800; margin-bottom:2px;">${irreg.type}</h2>
            <div style="font-size:0.82rem; color:var(--text-muted);">Transformation phonétique essentielle</div>
          </div>
        </div>

        <div class="irregular-rule-box">
          ${irreg.rule}
        </div>

        <div style="overflow-x:auto;">
          <table class="verbs-table">
            <thead>
              <tr>
                <th>Infinitif</th>
                <th>Présent (-아요/어요)</th>
                <th>Passé (-았/었어요)</th>
                <th>Traduction & Remarques</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }).join("");
}

// ------------------------------------------
// MODULE A2-3 : EXPLORATEUR DE RACINES HANJA
// ------------------------------------------
let currentHanjaIndex = 0;

function renderHanjaModule() {
  if (!HANJA_ROOTS || HANJA_ROOTS.length === 0) return;

  const selector = document.getElementById("hanja-roots-selector");
  if (selector) {
    selector.innerHTML = HANJA_ROOTS.map((root, idx) => {
      const activeClass = idx === currentHanjaIndex ? "active" : "";
      return `
        <button class="hanja-root-btn ${activeClass}" onclick="selectHanjaRoot(${idx})">
          <span class="hanja-char-big">${root.hanja}</span>
          <div style="text-align:left; line-height:1.2;">
            <div style="font-weight:700; font-size:0.88rem;">${root.hangul} (${root.roman})</div>
            <div style="font-size:0.72rem; color:var(--text-secondary);">${root.meaning}</div>
          </div>
        </button>
      `;
    }).join("");
  }

  const current = HANJA_ROOTS[currentHanjaIndex];
  if (!current) return;

  const hero = document.getElementById("hanja-active-hero");
  if (hero) {
    hero.innerHTML = `
      <div class="hanja-hero-card">
        <div class="hanja-hero-char">${current.hanja}</div>
        <div class="hanja-hero-info">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
            <h2>${current.hangul} [${current.roman}] — ${current.meaning}</h2>
            <button class="audio-btn-circle" onclick="speakKorean('${escapeJsString(current.hangul)}', 0.88)">🔊</button>
          </div>
          <div class="hanja-hero-mnemonic">
            💡 <strong>Astuce mnémotechnique :</strong> ${current.mnemonic}
          </div>
        </div>
      </div>
    `;
  }

  const wordsContainer = document.getElementById("hanja-words-container");
  if (wordsContainer) {
    wordsContainer.innerHTML = current.words
      .map((w) => {
        return `
        <div class="hanja-word-card">
          <div class="hanja-word-head">
            <div>
              <div class="hanja-word-kr">${w.kr}</div>
              <div class="ex-roman">${w.roman}</div>
            </div>
            <button class="audio-btn-circle" onclick="speakKorean('${escapeJsString(w.kr)}', 0.88)">🔊</button>
          </div>
          <div class="hanja-word-breakdown">
            🧩 ${w.breakdown}
          </div>
          <div class="hanja-word-meaning">${w.fr}</div>
        </div>
      `;
      })
      .join("");
  }
}

function selectHanjaRoot(idx) {
  currentHanjaIndex = idx;
  renderHanjaModule();
  const current = HANJA_ROOTS[idx];
  if (current) speakKorean(current.hangul, 0.88);
}

// ------------------------------------------
// MODULE A2-4 : RPG & AVENTURES À SÉOUL
// ------------------------------------------
let currentRpgQuestIndex = 0;
let currentRpgStepIndex = 0;
let currentRpgScore = 0;
let rpgStepAnswered = false;

function renderRpgModule() {
  if (!SEOUL_QUESTS || SEOUL_QUESTS.length === 0) return;

  const selector = document.getElementById("rpg-quests-selector");
  if (selector) {
    selector.innerHTML = SEOUL_QUESTS.map((q, idx) => {
      const activeClass = idx === currentRpgQuestIndex ? "active" : "";
      return `
        <button class="rpg-tab-btn ${activeClass}" onclick="initRpgQuest(${idx})">
          <span style="font-size:1.8rem;">${q.avatar || "🇰🇷"}</span>
          <div style="text-align:left;">
            <div style="font-weight:800; font-size:0.92rem;">${q.title}</div>
            <div style="font-size:0.75rem; color:var(--text-secondary);">${q.place}</div>
          </div>
        </button>
      `;
    }).join("");
  }

  renderRpgStep();
}

function initRpgQuest(questIdx) {
  currentRpgQuestIndex = questIdx;
  currentRpgStepIndex = 0;
  currentRpgScore = 0;
  rpgStepAnswered = false;
  renderRpgModule();
}

function renderRpgStep() {
  const arena = document.getElementById("rpg-active-arena");
  const quest = SEOUL_QUESTS[currentRpgQuestIndex];
  if (!arena || !quest) return;

  const steps = quest.steps || [];
  if (currentRpgStepIndex >= steps.length) {
    // End of quest summary
    const maxScore = steps.length * 10;
    const isMaster = currentRpgScore >= maxScore * 0.7;
    arena.innerHTML = `
      <div style="text-align:center; padding:28px 12px;">
        <div style="font-size:3.5rem; margin-bottom:12px;">${isMaster ? "🎉" : "💪"}</div>
        <h2 style="font-size:1.6rem; font-weight:800; margin-bottom:6px;">
          ${isMaster ? "Aventure réussie avec brio !" : "Bonne tentative !"}
        </h2>
        <p style="color:var(--text-secondary); margin-bottom:16px;">
          Votre score d'étiquette coréenne : <strong style="color:var(--accent-emerald); font-size:1.2rem;">${currentRpgScore} / ${maxScore} pts</strong>
        </p>
        <p style="font-size:0.92rem; color:var(--text-muted); max-width:540px; margin:0 auto 24px;">
          ${isMaster
            ? "Félicitations ! Vous avez su utiliser les formules de politesse adaptées et respecter les coutumes de Séoul."
            : "N'hésitez pas à recommencer pour mémoriser les formules les plus naturelles et polies."}
        </p>
        <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="initRpgQuest(${currentRpgQuestIndex})">🔄 Rejouer cette situation</button>
          <button class="btn btn-secondary" onclick="initRpgQuest(${(currentRpgQuestIndex + 1) % SEOUL_QUESTS.length})">Aventure suivante →</button>
        </div>
      </div>
    `;
    return;
  }

  const step = steps[currentRpgStepIndex];
  rpgStepAnswered = false;

  const choicesHtml = step.options
    .map((opt, optIdx) => {
      let krText = opt.text;
      let frText = "";
      if (opt.text.includes("(") && opt.text.endsWith(")")) {
        const parts = opt.text.split("(");
        krText = parts[0].trim();
        frText = parts.slice(1).join("(").replace(/\)$/, "").trim();
      }
      return `
      <button class="rpg-choice-card" id="rpg-opt-${optIdx}" onclick="handleRpgChoice(${optIdx})">
        <div class="rpg-opt-kr">${krText}</div>
        ${frText ? `<div class="rpg-opt-fr">(${frText})</div>` : ""}
      </button>
    `;
    })
    .join("");

  arena.innerHTML = `
    <div class="rpg-header-bar">
      <div>
        <span class="level-badge" style="background:var(--accent-emerald-soft); color:#34d399;">${quest.place}</span>
        <h3 style="font-size:1.2rem; font-weight:800; margin-top:4px;">${quest.title}</h3>
      </div>
      <div style="text-align:right;">
        <span style="font-size:0.85rem; color:var(--text-secondary); font-weight:700;">Étape ${currentRpgStepIndex + 1} / ${steps.length}</span>
        <div style="font-size:0.88rem; color:var(--accent-emerald); font-weight:800;" id="rpg-live-score">Score : ${currentRpgScore} pts</div>
      </div>
    </div>

    <div class="rpg-npc-container">
      <div class="rpg-npc-avatar">${quest.avatar || "👤"}</div>
      <div class="rpg-npc-bubble">
        <div class="rpg-npc-name">${quest.npc}</div>
        <div class="rpg-npc-line">${step.npcSay}</div>
        <button class="btn btn-secondary btn-sm" style="margin-top:6px; font-size:0.75rem;" onclick="speakKorean('${escapeJsString(step.npcSay.split('(')[0].trim())}', 0.88)">
          🔊 Écouter
        </button>
      </div>
    </div>

    <div style="margin:18px 0 10px;">
      <h4 style="font-size:1rem; font-weight:700; color:var(--text-primary); margin-bottom:12px;">👉 ${step.prompt}</h4>
      <div class="rpg-choices-list" id="rpg-choices-box">
        ${choicesHtml}
      </div>
    </div>

    <div class="rpg-feedback-box" id="rpg-step-feedback"></div>
  `;
}

function handleRpgChoice(choiceIdx) {
  if (rpgStepAnswered) return;
  rpgStepAnswered = true;

  const quest = SEOUL_QUESTS[currentRpgQuestIndex];
  const step = quest.steps[currentRpgStepIndex];
  const chosen = step.options[choiceIdx];

  const optBtn = document.getElementById(`rpg-opt-${choiceIdx}`);
  if (optBtn) {
    optBtn.classList.add(chosen.correct ? "selected-correct" : "selected-wrong");
  }

  // Disable other buttons
  step.options.forEach((_, idx) => {
    const b = document.getElementById(`rpg-opt-${idx}`);
    if (b) b.disabled = true;
  });

  if (chosen.correct) {
    currentRpgScore += chosen.score || 10;
    userState.correctAnswers++;
  }
  playFeedbackTone(chosen.correct);
  speakKorean(chosen.text.split("(")[0].trim(), 0.88);

  const fbBox = document.getElementById("rpg-step-feedback");
  if (fbBox) {
    fbBox.className = `rpg-feedback-box show`;
    fbBox.style.border = chosen.correct
      ? "1px solid var(--accent-emerald)"
      : "1px solid var(--accent-rose)";
    fbBox.innerHTML = `
      <div style="font-weight:800; font-size:1rem; margin-bottom:4px; color:${chosen.correct ? "#34d399" : "#fb7185"};">
        ${chosen.correct ? "✅ Excellente réponse !" : "⚠️ Attention aux nuances :"}
      </div>
      <div style="font-size:0.92rem; color:var(--text-primary); margin-bottom:12px; line-height:1.45;">
        ${chosen.feedback}
      </div>
      <button class="btn btn-primary" onclick="nextRpgStep()">
        ${currentRpgStepIndex + 1 < quest.steps.length ? "Étape suivante →" : "Voir le bilan de la quête 🏆"}
      </button>
    `;
  }

  const liveScore = document.getElementById("rpg-live-score");
  if (liveScore) liveScore.textContent = `Score : ${currentRpgScore} pts`;
  saveState();
}

function nextRpgStep() {
  currentRpgStepIndex++;
  renderRpgStep();
}

// ------------------------------------------
// MODULE A2-5 : LECTEUR D'HISTOIRES AVEC SURVOL MAGIQUE
// ------------------------------------------
let currentStoryIndex = 0;
let showStoryFrench = true;

function renderHoverStoriesModule() {
  if (!HOVER_STORIES || HOVER_STORIES.length === 0) return;

  const selector = document.getElementById("story-selector-row");
  if (selector) {
    selector.innerHTML = HOVER_STORIES.map((st, idx) => {
      const activeClass = idx === currentStoryIndex ? "active" : "";
      return `
        <button class="story-card-btn ${activeClass}" onclick="selectStory(${idx})">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--accent-primary); font-weight:800;">Histoire ${idx + 1}</div>
          <div style="font-family:var(--font-kr); font-size:1.1rem; font-weight:700; margin:3px 0;">${st.title}</div>
          <div style="font-size:0.78rem; color:var(--text-secondary);">${st.subtitle}</div>
        </button>
      `;
    }).join("");
  }

  renderActiveStory();
}

function selectStory(idx) {
  currentStoryIndex = idx;
  renderHoverStoriesModule();
}

function toggleStoryTranslation() {
  showStoryFrench = !showStoryFrench;
  document.querySelectorAll(".story-sentence-fr").forEach((el) => {
    el.style.display = showStoryFrench ? "block" : "none";
  });
  const btn = document.getElementById("btn-toggle-story-fr");
  if (btn) btn.textContent = showStoryFrench ? "🙈 Masquer la traduction" : "👁️ Afficher la traduction";
}

function renderActiveStory() {
  const container = document.getElementById("story-active-reader");
  const story = HOVER_STORIES[currentStoryIndex];
  if (!container || !story) return;

  const sentencesHtml = story.sentences
    .map((s, sIdx) => {
      const tokensHtml = s.tokens
        .map((tok, tIdx) => {
          return `
          <span class="story-token" 
                data-sentence="${sIdx}" 
                data-token="${tIdx}" 
                onmouseenter="inspectStoryToken(${sIdx}, ${tIdx})"
                onclick="inspectStoryToken(${sIdx}, ${tIdx}, true)">
            <span>${tok.kr}</span>
            <span class="story-token-roman roman-text">${tok.rom}</span>
          </span>
        `;
        })
        .join("");

      return `
        <div class="story-sentence-block">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
            <div class="story-tokens-row">${tokensHtml}</div>
            <div style="display:flex; gap:6px; flex-shrink:0;">
              <button class="audio-btn-circle" title="Vitesse normale" onclick="speakKorean('${escapeJsString(s.tokens.map((t) => t.kr).join(' '))}', 0.88)">🔊</button>
              <button class="audio-btn-circle audio-slow-btn" title="Vitesse lente" onclick="speakKorean('${escapeJsString(s.tokens.map((t) => t.kr).join(' '))}', 0.6)">🐢</button>
            </div>
          </div>
          <div class="story-sentence-fr">${s.fullFr}</div>
        </div>
      `;
    })
    .join("");

  const quizzes = !story.quiz
    ? []
    : Array.isArray(story.quiz)
    ? story.quiz
    : [story.quiz];

  const quizHtml = quizzes
    .map((q, qIdx) => {
      const qTitle = q.question || q.q || "Question de compréhension";
      const optsList = q.options || q.opts || [];
      const opts = optsList
        .map(
          (o, oIdx) => `
        <button class="choice-btn" id="squiz-${qIdx}-${oIdx}" onclick="answerStoryQuiz(${qIdx}, ${oIdx})">
          ${o}
        </button>
      `
        )
        .join("");

      return `
        <div class="rule-card" style="margin-top:16px;">
          <h4 style="font-size:0.95rem; font-weight:700; margin-bottom:10px;">❓ ${qTitle}</h4>
          <div style="display:flex; flex-direction:column; gap:8px;">${opts}</div>
          <div class="feedback-banner" id="squiz-fb-${qIdx}" style="margin-top:8px;"></div>
        </div>
      `;
    })
    .join("");

  const firstToken = story.sentences[0]?.tokens[0] || { kr: "한국어", rom: "han-guk-eo", role: "Sujet", fr: "La langue coréenne" };

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:18px;">
      <div>
        <h2 style="font-family:var(--font-kr); font-size:1.6rem; font-weight:900; margin-bottom:4px;">${story.title}</h2>
        <p style="color:var(--text-secondary); font-size:0.92rem;">${story.subtitle}</p>
      </div>
      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        <button class="btn btn-primary" onclick="speakKorean('${escapeJsString(story.audioFull)}', 0.85)">
          🔊 Écouter l'histoire complète
        </button>
        <button class="btn btn-secondary" id="btn-toggle-story-fr" onclick="toggleStoryTranslation()">
          ${showStoryFrench ? "🙈 Masquer la traduction" : "👁️ Afficher la traduction"}
        </button>
      </div>
    </div>

    <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:12px;">
      💡 <strong>Astuce survol magique :</strong> Passez la souris ou cliquez sur n'importe quel mot coréen pour voir son analyse grammaticale détaillée ci-dessous.
    </div>

    <div>${sentencesHtml}</div>

    <!-- CARTE INSPECTEUR DE JETON -->
    <div class="story-inspector-card" id="story-inspector">
      <div>
        <div style="font-size:0.75rem; text-transform:uppercase; color:var(--accent-primary); font-weight:800; margin-bottom:4px;">
          🔍 Inspecteur Grammatical
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-family:var(--font-kr); font-size:1.4rem; font-weight:800;" id="insp-kr">
            ${firstToken.kr}
          </span>
          <span class="roman-text" style="color:var(--text-secondary);" id="insp-rom">
            [${firstToken.rom}]
          </span>
          <span class="level-badge" style="background:var(--accent-purple-soft); color:#c084fc;" id="insp-role">
            ${firstToken.role}
          </span>
        </div>
        <div style="font-size:0.92rem; color:var(--text-primary); margin-top:4px;" id="insp-fr">
          ${firstToken.fr}
        </div>
      </div>
      <button class="btn btn-secondary btn-sm" id="insp-audio-btn" onclick="speakKorean('${escapeJsString(firstToken.kr)}', 0.88)">
        🔊 Prononcer ce mot
      </button>
    </div>

    <div style="margin-top:26px;">
      <h3 style="font-size:1.15rem; font-weight:800; margin-bottom:8px;">Quiz de Compréhension :</h3>
      ${quizHtml}
    </div>
  `;
}

function inspectStoryToken(sentenceIdx, tokenIdx, playAudio = false) {
  const story = HOVER_STORIES[currentStoryIndex];
  if (!story) return;
  const token = story.sentences[sentenceIdx]?.tokens[tokenIdx];
  if (!token) return;

  const elKr = document.getElementById("insp-kr");
  const elRom = document.getElementById("insp-rom");
  const elRole = document.getElementById("insp-role");
  const elFr = document.getElementById("insp-fr");
  const btnAudio = document.getElementById("insp-audio-btn");

  if (elKr) elKr.textContent = token.kr;
  if (elRom) elRom.textContent = `[${token.rom}]`;
  if (elRole) elRole.textContent = token.role;
  if (elFr) elFr.textContent = token.fr;
  if (btnAudio) btnAudio.onclick = () => speakKorean(token.kr, 0.88);

  if (playAudio) {
    speakKorean(token.kr, 0.88);
  }
}

function answerStoryQuiz(qIdx, oIdx) {
  const story = HOVER_STORIES[currentStoryIndex];
  if (!story || !story.quiz) return;
  const quizzes = Array.isArray(story.quiz) ? story.quiz : [story.quiz];
  const q = quizzes[qIdx];
  if (!q) return;

  const correctIndex = q.correct !== undefined ? q.correct : 0;
  const isCorrect = oIdx === correctIndex;
  const optsList = q.options || q.opts || [];
  const explText = q.explanation || q.expl || "";

  optsList.forEach((_, idx) => {
    const btn = document.getElementById(`squiz-${qIdx}-${idx}`);
    if (btn) {
      if (idx === correctIndex) btn.classList.add("correct");
      if (idx === oIdx && !isCorrect) btn.classList.add("wrong");
    }
  });

  const fb = document.getElementById(`squiz-fb-${qIdx}`);
  if (fb) {
    fb.className = `feedback-banner show ${isCorrect ? "ok" : "err"}`;
    fb.innerHTML = `
      <div style="font-weight:700; color:${isCorrect ? "#34d399" : "#fb7185"};">
        ${isCorrect ? "✅ Bravo, excellente compréhension !" : "❌ Mauvaise réponse, relisez bien la phrase."}
      </div>
      <div style="font-size:0.86rem; color:var(--text-secondary); margin-top:2px;">${explText}</div>
    `;
  }
  playFeedbackTone(isCorrect);
  if (isCorrect) {
    userState.correctAnswers++;
    saveState();
  }
}

// ------------------------------------------
// MODULE A2-6 : QUÊTES DU JOUR & EXPORT ANKI
// ------------------------------------------
function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function initDailyQuestsState() {
  const today = getTodayString();
  if (!userState.dailyQuests || userState.dailyQuests.date !== today) {
    userState.dailyQuests = {
      date: today,
      completedIds: [],
      xp: 0
    };
    saveState();
  }
}

function renderDailyQuestsModule() {
  initDailyQuestsState();

  const container = document.getElementById("daily-quests-container");
  const dateLabel = document.getElementById("daily-quest-date-label");
  const xpTotal = document.getElementById("daily-xp-total");

  if (dateLabel) {
    const opts = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    dateLabel.textContent = new Date().toLocaleDateString("fr-FR", opts);
  }

  if (xpTotal) {
    xpTotal.textContent = `${userState.dailyQuests.xp || 0} XP`;
  }

  if (container && DAILY_QUESTS_DEF) {
    container.innerHTML = DAILY_QUESTS_DEF.map((q) => {
      const isDone = userState.dailyQuests.completedIds.includes(q.id);
      return `
        <div class="daily-quest-item ${isDone ? "completed" : ""}" onclick="toggleDailyQuest('${q.id}', event)">
          <div class="daily-quest-left">
            <input type="checkbox" ${isDone ? "checked" : ""} style="width:18px; height:18px; accent-color:var(--accent-emerald); cursor:pointer;">
            <span class="daily-quest-icon">${q.icon}</span>
            <div>
              <div class="daily-quest-title">${q.title}</div>
              <div style="font-size:0.75rem; color:var(--text-secondary); cursor:pointer;" onclick="event.stopPropagation(); switchTab('${q.tab}')">
                Aller au module →
              </div>
            </div>
          </div>
          <div class="daily-quest-xp">+${q.xp} XP</div>
        </div>
      `;
    }).join("");
  }
}

function toggleDailyQuest(questId, event) {
  if (event) event.stopPropagation();
  initDailyQuestsState();

  const q = DAILY_QUESTS_DEF.find((it) => it.id === questId);
  if (!q) return;

  const idx = userState.dailyQuests.completedIds.indexOf(questId);
  if (idx === -1) {
    userState.dailyQuests.completedIds.push(questId);
    userState.dailyQuests.xp = (userState.dailyQuests.xp || 0) + q.xp;
    playFeedbackTone(true);
  } else {
    userState.dailyQuests.completedIds.splice(idx, 1);
    userState.dailyQuests.xp = Math.max(0, (userState.dailyQuests.xp || 0) - q.xp);
  }
  saveState();
  renderDailyQuestsModule();
}

function exportAnkiCsv(type) {
  let cards = [];
  let filename = "coreen_anki_deck.csv";

  if (type === "weak_and_favs") {
    const ids = getReviewPoolIds();
    ids.forEach((id) => {
      if (ALL_VOCAB_MAP[id]) {
        const it = ALL_VOCAB_MAP[id];
        cards.push({
          front: it.kr,
          back: `${it.fr} [${it.roman}]`,
          tag: `Coreen::Favoris::${it.categoryTitle || "Vocabulaire"}`
        });
      } else if (ALL_HANGUL_MAP[id]) {
        const it = ALL_HANGUL_MAP[id];
        cards.push({
          front: it.char,
          back: `Son : [${it.sound}] | Français : « ${it.frLike} » | Nom : ${it.name}`,
          tag: "Coreen::Hangeul"
        });
      }
    });

    if (cards.length === 0) {
      alert("Vous n'avez pas encore marqué de cartes en favoris (☆) ou fait d'erreurs ! Exportation de l'ensemble du vocabulaire débutant en cours...");
      type = "all_vocab";
    } else {
      filename = "coreen_mes_favoris_anki.csv";
    }
  }

  if (type === "all_vocab") {
    ALL_VOCAB_LIST.forEach((it) => {
      cards.push({
        front: it.kr,
        back: `${it.fr} [${it.roman}]${it.note ? ` (${it.note})` : ""}`,
        tag: `Coreen::Vocabulaire::${it.categoryTitle || "General"}`
      });
    });
    filename = "coreen_vocabulaire_complet_anki.csv";
  } else if (type === "hanja") {
    if (HANJA_ROOTS) {
      HANJA_ROOTS.forEach((root) => {
        cards.push({
          front: `${root.hanja} (${root.hangul})`,
          back: `Sens : ${root.meaning} [${root.roman}] | Mnémotechnique : ${root.mnemonic}`,
          tag: "Coreen::Hanja::Racines"
        });
        root.words.forEach((w) => {
          cards.push({
            front: w.kr,
            back: `${w.fr} [${w.roman}] | Racine : ${root.hanja} | Décomposition : ${w.breakdown}`,
            tag: `Coreen::Hanja::${root.hangul}`
          });
        });
      });
    }
    filename = "coreen_racines_hanja_anki.csv";
  }

  if (cards.length === 0) {
    alert("Aucune carte à exporter.");
    return;
  }

  // Format CSV standard Anki avec délimiteur point-virgule et entête
  const header = "Recto;Verso;Tags\n";
  const rows = cards
    .map((c) => {
      const cleanFront = `"${c.front.replace(/"/g, '""')}"`;
      const cleanBack = `"${c.back.replace(/"/g, '""')}"`;
      const cleanTag = `"${c.tag.replace(/"/g, '""')}"`;
      return `${cleanFront};${cleanBack};${cleanTag}`;
    })
    .join("\n");

  const csvContent = "\uFEFF" + header + rows; // UTF-8 BOM
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Initialisation globale
window.addEventListener("DOMContentLoaded", () => {
  initDataIndices();
  loadState();
  initSpeechSynthesis();
  renderHangulModule();
  initSyllableLab();
  initStrokeOrderStudio();
  renderGrammarModule();
  renderConjugationModule();
  renderVocabModule();
  renderDialoguesModule();
  updateTimeConverter(false);
  updateWonConverter(false);
  renderChecklistModule();

  // Initialisation des modules Niveau 2
  renderLevel2Grammar();
  renderIrregularsModule();
  renderHanjaModule();
  renderRpgModule();
  renderHoverStoriesModule();
  renderDailyQuestsModule();
});
