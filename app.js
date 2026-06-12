/**
 * FavoRead Core Application State
 */
const state = {
  currentView: "view-home",
  apiKey: "",
  couplings: [],
  selectedCouplingId: "",
  generationMode: "standalone",
  currentContent: null,
  studyModeActive: false,
  speechUtterance: null,
  speechSpeed: 1.0,
  vocabList: [],
  vocabQueue: [],
  currentVocabIndex: 0,
  stats: {
    totalRead: 0,
    totalCorrect: 0,
    totalQuizzes: 0,
    streak: 0,
    lastReadDate: ""
  }
};

const DOM = {
  tabs: document.querySelectorAll(".nav-tab"),
  views: document.querySelectorAll(".app-view"),
  apiKeyInput: document.getElementById("api-key"),
  
  // Coupling UI bindings
  settingCouplingSelect: document.getElementById("setting-coupling-select"),
  seriesHistoryPanel: document.getElementById("series-history-panel"),
  seriesHistoryText: document.getElementById("series-history-text"),
  seriesLibraryContainer: document.getElementById("series-library-container"),
  generatorSeriesChapter: document.getElementById("generator-series-chapter"),
  btnGenerateByTags: document.getElementById("btn-generate-by-tags"),
  
  btnSaveCoupling: document.getElementById("btn-save-coupling"),
  btnCancelCoupling: document.getElementById("btn-cancel-coupling"),
  btnAddCoupling: document.getElementById("btn-add-coupling"),
  couplingListContainer: document.getElementById("coupling-list-container"),
  couplingEditPanel: document.getElementById("coupling-edit-panel"),
  
  // Edit Form Fields
  editCoupleId: document.getElementById("edit-couple-id"),
  editCoupleRel: document.getElementById("edit-couple-rel"),
  editCoupleIntimacy: document.getElementById("edit-couple-intimacy"),
  editCharAName: document.getElementById("edit-char-a-name"),
  editCharADesc: document.getElementById("edit-char-a-desc"),
  editCharASpeech: document.getElementById("edit-char-a-speech"),
  editCharBName: document.getElementById("edit-char-b-name"),
  editCharBDesc: document.getElementById("edit-char-b-desc"),
  editCharBSpeech: document.getElementById("edit-char-b-speech"),
  
  // Generator options
  settingLevel: document.getElementById("setting-level"),
  settingType: document.getElementById("setting-type"),
  settingTrope: document.getElementById("setting-trope"),
  customTropeGroup: document.getElementById("custom-trope-group"),
  settingCustomTrope: document.getElementById("setting-custom-trope"),
  btnGenerate: document.getElementById("btn-generate"),
  genLoading: document.getElementById("gen-loading"),
  presetContainer: document.getElementById("preset-container"),
  
  // Reader View
  readerMetaLevel: document.getElementById("reader-meta-level"),
  readerMetaTrope: document.getElementById("reader-meta-trope"),
  readerMetaWpm: document.getElementById("reader-meta-wpm"),
  readerTitle: document.getElementById("reader-title"),
  btnAudioPlay: document.getElementById("btn-audio-play"),
  btnAudioStop: document.getElementById("btn-audio-stop"),
  audioSpeedSelect: document.getElementById("audio-speed-select"),
  btnModeEn: document.getElementById("btn-mode-en"),
  btnModeParallel: document.getElementById("btn-mode-parallel"),
  btnStudyMode: document.getElementById("btn-study-mode"),
  readerContentEnglish: document.getElementById("reader-content-english"),
  readerContentJapanese: document.getElementById("reader-content-japanese"),
  readerGrammarSection: document.getElementById("reader-grammar-section"),
  grammarContainer: document.getElementById("grammar-explanation-container"),
  readerQuizSection: document.getElementById("reader-quiz-section"),
  quizContainer: document.getElementById("quiz-container"),
  
  // Vocab View
  vocabBadgeCount: document.getElementById("vocab-badge-count"),
  vocabDeckActive: document.getElementById("vocab-deck-active"),
  vocabDeckEmpty: document.getElementById("vocab-deck-empty"),
  vocabCardCounter: document.getElementById("vocab-card-counter"),
  vocabCardWord: document.getElementById("vocab-card-word"),
  vocabCardPos: document.getElementById("vocab-card-pos"),
  vocabCardPosBack: document.getElementById("vocab-card-pos-back"),
  vocabCardLevel: document.getElementById("vocab-card-level"),
  vocabCardImportance: document.getElementById("vocab-card-importance"),
  vocabCardDef: document.getElementById("vocab-card-def"),
  vocabCardContext: document.getElementById("vocab-card-context"),
  vocabFlipperContainer: document.getElementById("vocab-flipper-container"),
  vocabFlipper: document.getElementById("vocab-flipper"),
  btnVocabForgot: document.getElementById("btn-vocab-forgot"),
  btnVocabKnow: document.getElementById("btn-vocab-know"),
  
  // Stats
  statsTotalRead: document.getElementById("stats-total-read"),
  statsTotalWords: document.getElementById("stats-total-words"),
  statsTotalCorrect: document.getElementById("stats-total-correct"),
  btnResetOnlyStats: document.getElementById("btn-reset-only-stats"),
  btnResetOnlyCouplings: document.getElementById("btn-reset-only-couplings"),
  
  // Global Popover
  globalVocabPopup: document.getElementById("global-vocab-popup"),
  popWord: document.getElementById("pop-word"),
  popPos: document.getElementById("pop-pos"),
  popLevel: document.getElementById("pop-level"),
  popImportance: document.getElementById("pop-importance"),
  popDef: document.getElementById("pop-def"),
  popContext: document.getElementById("pop-context"),
  popClose: document.getElementById("pop-close"),
  popBtnAddVocab: document.getElementById("pop-btn-add-vocab"),
  homeQuickCouplingsContainer: document.getElementById("home-quick-couplings-container"),
  bookshelfContainer: document.getElementById("bookshelf-container")
};

// Initialize Application
function init() {
  try {
    loadFromLocalStorage();
  } catch(e) {
    console.error("Failed to load from local storage", e);
    state.couplings = [];
    state.apiKey = "";
  }
  
  // Event listeners are critical and must be set up even if render fails
  try {
    setupEventListeners();
  } catch(e) {
    console.error("Failed to setup event listeners", e);
  }

  const safeRun = (fn, name) => {
    try { fn(); } catch(e) { console.error(`Failed to run ${name}`, e); }
  };

  safeRun(renderPresetList, "renderPresetList");
  safeRun(renderCouplingList, "renderCouplingList");
  safeRun(renderHomeQuickCouplings, "renderHomeQuickCouplings");
  safeRun(updateVocabBadge, "updateVocabBadge");
  safeRun(updateStatsUI, "updateStatsUI");
  safeRun(updateStreakUI, "updateStreakUI");
  safeRun(renderWelcomeDialog, "renderWelcomeDialog");
  safeRun(renderBookshelf, "renderBookshelf");
  
  try {
    if (window.PRESET_STORIES && window.PRESET_STORIES.length > 0) {
      loadContent(window.PRESET_STORIES[0], false); 
    }
  } catch(e) {
    console.error("Failed to load initial content", e);
  }
}

// 笏€笏€ LOCAL STORAGE & INITIAL SETUPS 笏€笏€
function loadFromLocalStorage() {
  // Check URL query parameters for API key sharing (?key=AIZa...)
  const urlParams = new URLSearchParams(window.location.search);
  const sharedKey = urlParams.get("apikey") || urlParams.get("key");
  if (sharedKey && sharedKey.toLowerCase().startsWith("aiza")) {
    localStorage.setItem("favo_api_key", sharedKey);
    // Remove the key from the URL query to keep it clean and hidden
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }

  // API Key
  state.apiKey = localStorage.getItem("favo_api_key") || "";
  if (DOM.apiKeyInput) {
    DOM.apiKeyInput.value = state.apiKey;
  }
  
  // Load Couplings
  const savedCouplings = localStorage.getItem("favo_couplings");
  if (savedCouplings) {
    try {
      const parsed = JSON.parse(savedCouplings);
      if (Array.isArray(parsed)) {
        state.couplings = parsed;
      } else {
        state.couplings = [];
      }
    } catch(e) {
      console.error("Error parsing couplings", e);
      state.couplings = [];
    }
  } else {
    state.couplings = [];
  }

  // Filter out any corrupted or legacy coupling entries
  if (Array.isArray(state.couplings)) {
    state.couplings = state.couplings.filter(c => c && c.partnerA && c.partnerB);
  } else {
    state.couplings = [];
  }

  // Auto-detect and fix corrupted text from legacy localStorage or legacy characters
  if (state.couplings.length > 0) {
    const serialized = JSON.stringify(state.couplings);
    const hasCorruption = serialized.includes("\ufffd") || 
                          serialized.includes("­") || 
                          serialized.includes("") ||
                          /[謾蜒縺ﾃ蜿]/.test(serialized) ||
                          state.couplings.some(c => c.relationship && (c.relationship.includes("ﾃ") || c.relationship.includes("蜿")));
    const hasLegacyCoupling = state.couplings.some(c => 
      c.partnerA.name === "Alex" || 
      c.partnerB.name === "Kurt" || 
      (c.id === "couple-default-1" && c.partnerA.name !== "Sorrento")
    );
    if (hasCorruption || hasLegacyCoupling) {
      console.warn("Corrupted legacy couplings or default characters detected. Auto-resetting to default.");
      state.couplings = [];
    }
  }

  // Populate default couplings if none saved
  if (state.couplings.length === 0) {
    state.couplings = [
      {
        id: "couple-default-1",
        relationship: "主従関係。世界各所を慰問する旅に出ている二人。",
        intimacy: "slowburn",
        partnerA: { 
          name: "Sorrento", 
          description: "海魔女（セイレーン）のソレント。ジュリアン・ソロの従者であり守護者。非常にシャイで照れ屋であり、自分から強引にリードすることはないが、心からジュリアン様を護ろうとする誠実な年下攻め。", 
          speechStyle: "基本は丁寧で実直な敬語口調。ジュリアン様に対して誠実かつ献身的に接するが、からかわれたり距離が近くなるとすぐに赤くなって照れてしまうシャイなトーン。" 
        },
        partnerB: { 
          name: "Julian", 
          description: "ジュリアン・ソロ。ソロ家を率いる若き貴公子。社交界に堪能で優雅で気品があり、恋愛や色ごとにも慣れている。シャイなソレントをからかったり翻弄したりする上品で余裕のある美しい年上受け。", 
          speechStyle: "気品に溢れた優雅な言葉遣い。ソレントを信頼し、彼の照れる反応を優しく楽しむ大人びた余裕のあるトーン。" 
        },
        episodes: []
      }
    ];
    saveToLocalStorage();
  }
  
  state.selectedCouplingId = localStorage.getItem("favo_selected_coupling_id") || (state.couplings[0] ? state.couplings[0].id : "");
  
  // Vocab list
  const savedVocab = localStorage.getItem("favo_vocab_list");
  if (savedVocab) {
    try {
      state.vocabList = JSON.parse(savedVocab);
    } catch(e) {
      console.error("Error parsing vocab list", e);
    }
  }
  
  // Stats & Streak
  const savedStats = localStorage.getItem("favo_stats");
  if (savedStats) {
    try {
      const parsedStats = JSON.parse(savedStats);
      state.stats = { ...state.stats, ...parsedStats };
    } catch(e) {
      console.error("Error parsing stats", e);
    }
  }
}

function saveToLocalStorage() {
  localStorage.setItem("favo_api_key", state.apiKey);
  localStorage.setItem("favo_couplings", JSON.stringify(state.couplings));
  localStorage.setItem("favo_selected_coupling_id", state.selectedCouplingId);
  localStorage.setItem("favo_vocab_list", JSON.stringify(state.vocabList));
  localStorage.setItem("favo_stats", JSON.stringify(state.stats));
}

// 笏笏 EVENT LISTENERS SETUP 笏笏
function setupEventListeners() {
  // View switches
  DOM.tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetView = tab.getAttribute("data-view");
      switchView(targetView);
    });
  });

  // Home CTA Buttons
  const btnHomeToReader = document.getElementById("btn-home-to-reader");
  if (btnHomeToReader) {
    btnHomeToReader.addEventListener("click", () => {
      switchView("view-reader");
    });
  }
  
  const btnHomeToGen = document.getElementById("btn-home-to-generator");
  if (btnHomeToGen) {
    btnHomeToGen.addEventListener("click", () => {
      switchView("view-generator");
    });
  }

  const btnHomeGoBookshelf = document.getElementById("btn-home-go-bookshelf");
  if (btnHomeGoBookshelf) {
    btnHomeGoBookshelf.addEventListener("click", () => {
      switchView("view-generator");
    });
  }

  // Welcome panel click to refresh dialogue
  const welcomePanel = document.getElementById("home-welcome-panel");
  if (welcomePanel) {
    welcomePanel.addEventListener("click", () => {
      renderWelcomeDialog();
    });
  }

  // Track API Key input changes
  DOM.apiKeyInput.addEventListener("input", (e) => {
    state.apiKey = e.target.value.trim();
    saveToLocalStorage();
  });

  // Audio Controls
  DOM.btnAudioPlay.addEventListener("click", startAudio);
  DOM.btnAudioStop.addEventListener("click", stopAudio);
  DOM.audioSpeedSelect.addEventListener("change", (e) => {
    state.speechSpeed = parseFloat(e.target.value);
    if (state.speechUtterance && window.speechSynthesis.speaking) {
      stopAudio();
      startAudio();
    }
  });

  // Display Mode Buttons
  DOM.btnModeEn.addEventListener("click", () => {
    DOM.btnModeEn.classList.add("active");
    DOM.btnModeParallel.classList.remove("active");
    DOM.readerContentJapanese.style.display = "none";
  });

  DOM.btnModeParallel.addEventListener("click", () => {
    DOM.btnModeParallel.classList.add("active");
    DOM.btnModeEn.classList.remove("active");
    DOM.readerContentJapanese.style.display = "block";
  });

  DOM.btnStudyMode.addEventListener("click", () => {
    state.studyModeActive = !state.studyModeActive;
    DOM.btnStudyMode.classList.toggle("active", state.studyModeActive);
    toggleStudyModeHighlights();
  });

  // Popup Close
  DOM.popClose.addEventListener("click", closePopover);
  DOM.popBtnAddVocab.addEventListener("click", savePopoverWordToVocab);

  // Close popup if clicking outside
  document.addEventListener("click", (e) => {
    if (!DOM.globalVocabPopup.contains(e.target) && !e.target.classList.contains("word-tap")) {
      closePopover();
    }
  });

  // Vocab Flashcard interactions
  DOM.vocabFlipperContainer.addEventListener("click", () => {
    DOM.vocabFlipperContainer.classList.toggle("flipped");
  });

  DOM.btnVocabKnow.addEventListener("click", () => {
    handleVocabResponse(true);
  });

  DOM.btnVocabForgot.addEventListener("click", () => {
    handleVocabResponse(false);
  });

  // Stats only reset
  DOM.btnResetOnlyStats.addEventListener("click", () => {
    if (confirm("学習データを初期化しますか？\n読了ストーリー数、クイズ正解率、および連続学習日数（ストリーク）の記録がゼロに戻ります。登録したカップリングや連載履歴は消えません。")) {
      state.stats = { totalRead: 0, totalCorrect: 0, totalQuizzes: 0, streak: 0, lastReadDate: "" };
      state.vocabList = [];

      saveToLocalStorage();
      updateVocabBadge();
      updateStatsUI();
      updateStreakUI();
      renderVocabDeck();
      alert("学習状況をリセットしました！");
    }
  });

// Couplings and stories reset
  DOM.btnResetOnlyCouplings.addEventListener("click", () => {
    if (confirm("すべてのカップリングと連載履歴を初期化しますか？\n登録したカスタムカップリング、連載中の履歴（あらすじ）が消去され、デフォルトの「年下（攻）×年上（受）」設定に戻します。学習日数や成績記録は消えません。")) {
      state.couplings = [
        {
          id: "couple-default-1",
          relationship: "主従関係。世界各所を慰問する旅に出ている二人。",
          intimacy: "slowburn",
          partnerA: { 
            name: "Sorrento", 
            description: "海魔女（セイレーン）のソレント。ジュリアン・ソロの従者であり守護者。非常にシャイで照れ屋であり、自分から強引にリードすることはないが、心からジュリアン様を護ろうとする誠実な年下攻め。", 
            speechStyle: "基本は丁寧で実直な敬語口調。ジュリアン様に対して誠実かつ献身的に接するが、からかわれたり距離が近くなるとすぐに赤くなって照れてしまうシャイなトーン。" 
          },
          partnerB: { 
            name: "Julian", 
            description: "ジュリアン・ソロ。ソロ家を率いる若き貴公子。社交界に堪能で優雅で気品があり、恋愛や色ごとにも慣れている。シャイなソレントをからかったり翻弄したりする上品で余裕のある美しい年上受け。", 
            speechStyle: "気品に溢れた優雅な言葉遣い。ソレントを信頼し、彼の照れる反応を優しく楽しむ大人びた余裕のあるトーン。" 
          },
          episodes: []
        }
      ];
      state.selectedCouplingId = state.couplings[0].id;

      saveToLocalStorage();
      renderCouplingList();
      renderBookshelf();
      renderHomeQuickCouplings();
      alert("カップリングおよび連載履歴を初期化し、デフォルトの設定に戻しました！");
    }
  });

  // ── COUPLING MANAGER EVENT BINDINGS ──

  // New Coupling Add Toggle
  DOM.btnAddCoupling.addEventListener("click", () => {
    openCouplingEditor();
  });

  DOM.btnCancelCoupling.addEventListener("click", () => {
    closeCouplingEditor();
  });

  DOM.btnSaveCoupling.addEventListener("click", handleSaveCoupling);

  if (DOM.btnGenerateByTags) {
    DOM.btnGenerateByTags.addEventListener("click", handleGenerateByTags);
  }
}

// Switch view helper
function switchView(viewId) {
  state.currentView = viewId;
  DOM.views.forEach(view => {
    view.classList.toggle("active", view.id === viewId);
  });
  
  DOM.tabs.forEach(tab => {
    const matches = tab.getAttribute("data-view") === viewId;
    tab.classList.toggle("active", matches);
  });

  window.scrollTo({ top: 0, behavior: "instant" });

  if (viewId !== "view-reader") {
    stopAudio();
  }
  if (viewId === "view-vocab") {
    renderVocabDeck();
  }
  if (viewId === "view-home") {
    updateStatsUI();
    updateStreakUI();
    renderWelcomeDialog();
    renderHomeQuickCouplings();
  }
  if (viewId === "view-generator") {
    renderBookshelf();
  }
}

// 属性タグによる生成用データベース
const ATTRIBUTE_DATABASE = {
  names: {
    seme: ["Leo", "Julian", "Ray", "Ryan", "Gavin", "Connor", "Ian", "Noah", "Ethan", "Oliver", "Lucas", "Liam", "Daniel", "Dylan", "Austin", "Tyler", "Evan", "Nathan", "Aiden", "Cole"],
    uke: ["Arthur", "Kevin", "Hugo", "Luke", "Sean", "Finn", "Theo", "Eliot", "Liam", "Oliver", "Noel", "Arlo", "Sasha", "Oscar", "Leon", "Felix", "Nico", "Jude", "Milo", "Toby"]
  },
  situations: {
    "sit-school": { label: "学園もの", phrase: "学園生活を舞台にした", intimacy: "slowburn" },
    "sit-uniform": { label: "制服", phrase: "お揃いの制服に身を包んだ", intimacy: "slowburn" },
    "sit-suit": { label: "スーツ", phrase: "スーツ姿でビシッと決めた", intimacy: "established" },
    "sit-office": { label: "オフィスもの", phrase: "オフィスでの日々の仕事に追われる", intimacy: "secret_lovers" },
    "sit-military": { label: "軍人", phrase: "規律厳しき軍隊や戦場を背景にした", intimacy: "established" },
    "sit-historical": { label: "時代物", phrase: "歴史とロマンが漂う情緒溢れる時代での", intimacy: "slowburn" },
    "sit-master-servant": { label: "主従関係", phrase: "絶対的な上下関係に縛られた主従関係の", intimacy: "secret_lovers" },
    "sit-butler": { label: "執事", phrase: "献身的に主に仕える執事と主人の関係の", intimacy: "slowburn" },
    "sit-owner": { label: "オーナー", phrase: "店や土地のオーナーと雇用関係にある", intimacy: "established" },
    "sit-gijinka": { label: "擬人化", phrase: "本来人ではない存在が人の姿を得て関わり合う", intimacy: "slowburn" },
    "sit-nonhuman": { label: "人外", phrase: "人間と人外の種族や常識を超えた", intimacy: "slowburn" }
  },
  features: {
    "feat-glasses": { label: "メガネ", desc: "知的なメガネをかけている。" },
    "feat-crossdress": { label: "女装", desc: "訳あって時に可憐な女装姿を見せる。" },
    "feat-age-gap": { label: "年の差", desc: "互いに大きな年齢差があり、それが独特の距離感を生んでいる。" },
    "feat-younger-seme": { label: "年下攻", desc: "年齢は下だが男気がありリードする年下攻め。" },
    "feat-older-uke": { label: "オジサン受", desc: "渋さと哀愁を漂わせる大人のオジサン受け。" },
    "feat-shota": { label: "ショタ", desc: "あどけない少年のような無垢な魅力を持つ。" },
    "feat-gekokujo": { label: "下克上", desc: "身分や社会的な立場での格差をひっくり返す下克上タイプ。" },
    "feat-reversable": { label: "リバ", desc: "状況に応じて攻めと受けの立ち位置が柔軟に入れ替わる関係。" }
  },
  personalities: {
    "rel-friend": { 
      label: "親友", 
      descSeme: "相手を何でも気兼ねなく相談できる唯一無二の親友として大切に思っている性格。", 
      descUke: "相手に絶大な信頼を寄せ、何でも相談できる親友として接している性格。", 
      speechSeme: "フランクで遠慮のない友達口調。「おい、○○」と親しげに呼ぶ。",
      speechUke: "素直に何でも話せる親友の口調。相手を「○○」と名前で呼ぶ。"
    },
    "rel-rival": { 
      label: "ライバル", 
      descSeme: "相手の実力を誰よりも認めつつ、絶対に負けたくないと闘志を燃やす負けず嫌いな性格。",
      descUke: "相手を最高の好敵手と認め、ライバルとして常に競い合おうとするプライドの高い性格。",
      speechSeme: "不敵で強気なライバル口調。「フッ、○○、負ける気はないからな」",
      speechUke: "プライドが高く競い合う口調。「フン、○○こそ、足元をすくわれないようにね」"
    },
    "rel-childhood": { 
      label: "幼馴染み", 
      descSeme: "幼い頃から相手と一緒に過ごし、誰よりも相手のすべてを知り尽くしている性格。",
      descUke: "昔からずっと隣にいるのが当たり前で、相手の前では無防備に甘えられる性格。",
      speechSeme: "少し照れくさそうな、幼馴染みならではの甘えと独占欲が入り混じる口調。",
      speechUke: "昔からの関係で無防備に接する安心しきった口調。"
    },
    "rel-tsundere": { 
      label: "ツンデレ", 
      descSeme: "本当は好意があるのに照れ隠しで冷たく接してしまい、後から一人で悶々と悩むツンデレな性格。",
      descUke: "素直になれず、照れ隠しでつい口を尖らせて反抗的な態度をとってしまう愛らしいツンデレ性格。",
      speechSeme: "「べ、別にお前のためだけにやったわけじゃない…！」とそっけない態度をとる。",
      speechUke: "「フン、勘違いしないでよね…！」と頬を染めて反論するツンデレ口調。"
    },
    "rel-oresama": { 
      label: "オレ様", 
      descSeme: "自信家で尊大、常に主導権を握りたがるオレ様タイプ。",
      descUke: "お高くとまって高飛車な態度を取りつつも、内面では深く愛されたいツンとしたオレ様系受け。",
      speechSeme: "傲慢で余裕に満ちた命令口調。「お前は黙って俺に従っていればいいんだよ」",
      speechUke: "強引さに呆れつつも従う、少し反抗的なオレ様いなし口調。"
    },
    "rel-supadari": { 
      label: "スパダリ", 
      descSeme: "容姿・スペック・包容力のすべてが完璧で、相手を溺愛するスーパーダーリン。",
      descUke: "容姿端麗で有能、かつパートナーに惜しみない甘やかしと溺愛を向ける頼もしいスパダリ系受け。",
      speechSeme: "優雅で余裕たっぷり、深い愛で相手を包み込むスパダリ敬語。「君のすべてを私に委ねて」",
      speechUke: "スパダリの完璧さに照れながらも甘える愛され口調。"
    },
    "rel-dog": { 
      label: "ワンコ", 
      descSeme: "人懐っこく真っ直ぐに懐き、相手への好意を全身の尻尾を振るように表現するワンコ系攻め。",
      descUke: "人懐っこく甘え上手で、相手の後ろを嬉しそうについて回る健気なワンコ系受け。",
      speechSeme: "「○○さん！ずっと待ってたんですよ！」と尻尾を振るような元気な敬語口調。",
      speechUke: "「よしよし」と頭を優しく撫でる口調。"
    },
    "rel-wet-noodle": { 
      label: "ヘタレ攻", 
      descSeme: "相手のことが好きすぎるあまり、肝心なところで弱気になってしまうヘタレな攻め。",
      descUke: "ヘタレな攻めに少し呆れつつも、母性本能をくすぐられて自分から受け入れる包容力のある性格。",
      speechSeme: "「う、嬉しくて緊張しちゃって…嫌われないかな」とオドオドしながらも離さない口調。",
      speechUke: "ヘタレさにため息をつきつつ、自分からリードしてあげる優しい口調。"
    },
    "rel-possessive": { 
      label: "独占欲", 
      descSeme: "他の誰にも触れさせたくない、相手を自分だけのものにしておきたいという非常に強い独占欲を持つ性格。",
      descUke: "相手への強い執着と嫉妬心から、自分だけのものとして閉じ込めておきたいほどの重い独占欲を持つ性格。",
      speechSeme: "「お前の目には俺だけが映っていればいいんだ」と低い声で囁く重い独占欲口調。",
      speechUke: "束縛に戸惑いつつも、深く愛されていることに悦びを感じる口調。"
    },
    "rel-yandere": { 
      label: "ヤンデレ", 
      descSeme: "愛が深すぎるあまりに精神的な危うさを見せ、相手への執着心が極限に達しているヤンデレ。",
      descUke: "相手からの重すぎる愛を受け止めつつ、自身も狂信的な依存と執着を向けているヤンデレ受け。",
      speechSeme: "「ねえ○○、僕以外の人間と話さないで…お願いだよ？」と冷徹な熱情を隠す口調。",
      speechUke: "「君が壊れてしまいそうで怖いよ」と気圧されながらも抱きとめる口調。"
    }
  },
  tones: {
    "tone-sweet": { label: "甘々", phrase: "終始お互いを甘やかし合い、砂糖を吐き出すように甘く甘美な日常。", intimacy: "established" },
    "tone-romcom": { label: "ラブコメ", phrase: "誤解やすれ違いを挟みつつも、にぎやかに愛を育むドタバタなラブコメディ。", intimacy: "slowburn" },
    "tone-cozy": { label: "ほのぼの", phrase: "お互いの温もりを感じながら穏やかに穏やかに過ぎていくほのぼのとした時間。", intimacy: "slowburn" },
    "tone-gag": { label: "ギャグ", phrase: "ボケとツッコミが絶えず、奇想天外な出来事に巻き込まれるテンポの良いギャグコメディ。", intimacy: "strangers" }
  }
};

function handleGenerateByTags() {
  const checkedTags = [];
  const checkboxes = document.querySelectorAll(".coupling-tag");
  checkboxes.forEach(cb => {
    if (cb.checked) {
      checkedTags.push(cb.value);
    }
  });

  const situationTags = checkedTags.filter(t => t.startsWith("sit-"));
  const commonFeatureTags = checkedTags.filter(t => t.startsWith("feat-"));
  const toneTags = checkedTags.filter(t => t.startsWith("tone-"));
  
  const semeFeatureTags = checkedTags.filter(t => t.startsWith("seme-feat-"));
  const ukeFeatureTags = checkedTags.filter(t => t.startsWith("uke-feat-"));
  
  const semePersonalityTags = checkedTags.filter(t => t.startsWith("seme-rel-"));
  const ukePersonalityTags = checkedTags.filter(t => t.startsWith("uke-rel-"));

  let nameA = "";
  let nameB = "";
  const semeNamePool = ATTRIBUTE_DATABASE.names.seme;
  const ukeNamePool = ATTRIBUTE_DATABASE.names.uke;
  nameA = semeNamePool[Math.floor(Math.random() * semeNamePool.length)];
  do {
    nameB = ukeNamePool[Math.floor(Math.random() * ukeNamePool.length)];
  } while (nameA === nameB);

  let sitTag = "";
  let sitPhrase = "";
  let currentIntimacy = "slowburn";
  
  if (situationTags.length > 0) {
    sitTag = situationTags[Math.floor(Math.random() * situationTags.length)];
    const sitInfo = ATTRIBUTE_DATABASE.situations[sitTag];
    sitPhrase = sitInfo.phrase;
    currentIntimacy = sitInfo.intimacy;
  } else {
    const keys = Object.keys(ATTRIBUTE_DATABASE.situations);
    sitTag = keys[Math.floor(Math.random() * keys.length)];
    const sitInfo = ATTRIBUTE_DATABASE.situations[sitTag];
    sitPhrase = sitInfo.phrase;
    currentIntimacy = sitInfo.intimacy;
  }

  let semeFeatureDescs = [];
  let ukeFeatureDescs = [];
  let commonFeatureDescs = [];

  commonFeatureTags.forEach(tag => {
    const feat = ATTRIBUTE_DATABASE.features[tag];
    if (feat) commonFeatureDescs.push(feat.desc);
  });

  semeFeatureTags.forEach(tag => {
    const key = tag.substring(5); // strip "seme-"
    const feat = ATTRIBUTE_DATABASE.features[key];
    if (feat) semeFeatureDescs.push(feat.desc);
  });

  ukeFeatureTags.forEach(tag => {
    const key = tag.substring(4); // strip "uke-"
    const feat = ATTRIBUTE_DATABASE.features[key];
    if (feat) ukeFeatureDescs.push(feat.desc);
  });

  let pSemeTag = "";
  if (semePersonalityTags.length > 0) {
    pSemeTag = semePersonalityTags[0].substring(5); // strip "seme-"
  } else {
    const keys = Object.keys(ATTRIBUTE_DATABASE.personalities);
    pSemeTag = keys[Math.floor(Math.random() * keys.length)];
  }

  let pUkeTag = "";
  if (ukePersonalityTags.length > 0) {
    pUkeTag = ukePersonalityTags[0].substring(4); // strip "uke-"
  } else {
    const keys = Object.keys(ATTRIBUTE_DATABASE.personalities);
    pUkeTag = keys[Math.floor(Math.random() * keys.length)];
  }

  const semeP = ATTRIBUTE_DATABASE.personalities[pSemeTag];
  const ukeP = ATTRIBUTE_DATABASE.personalities[pUkeTag];

  let tonePhrase = "";
  if (toneTags.length > 0) {
    const tTag = toneTags[Math.floor(Math.random() * toneTags.length)];
    const toneInfo = ATTRIBUTE_DATABASE.tones[tTag];
    tonePhrase = toneInfo.phrase;
    currentIntimacy = toneInfo.intimacy;
  } else {
    const keys = Object.keys(ATTRIBUTE_DATABASE.tones);
    const tTag = keys[Math.floor(Math.random() * keys.length)];
    tonePhrase = ATTRIBUTE_DATABASE.tones[tTag].phrase;
  }

  const semeLabel = semeP.label;
  const ukeLabel = ukeP.label;
  
  const relationshipText = `${sitPhrase}${semeLabel}攻め${nameA}と、${ukeLabel}受け${nameB}の関係。${tonePhrase}`;

  let semeDescParts = [
    `${nameA}。性格は${semeP.descSeme || semeP.desc}`,
    ...semeFeatureDescs,
    ...commonFeatureDescs
  ];
  const semeDescText = semeDescParts.filter(Boolean).join(" ");
  const semeSpeechText = (semeP.speechSeme || "丁寧で落ち着いたトーン。").replace("○○", nameB);

  let ukeDescParts = [
    `${nameB}。性格は${ukeP.descUke || ukeP.desc}`,
    ...ukeFeatureDescs,
    ...commonFeatureDescs
  ];
  const ukeDescText = ukeDescParts.filter(Boolean).join(" ");
  const ukeSpeechText = (ukeP.speechUke || "親しみやすい大人の口調。").replace("○○", nameA);

  DOM.editCoupleRel.value = relationshipText;
  DOM.editCoupleIntimacy.value = currentIntimacy;
  
  DOM.editCharAName.value = nameA;
  DOM.editCharADesc.value = semeDescText;
  DOM.editCharASpeech.value = semeSpeechText;
  
  DOM.editCharBName.value = nameB;
  DOM.editCharBDesc.value = ukeDescText;
  DOM.editCharBSpeech.value = ukeSpeechText;
}

function openCouplingEditor(coupleId = "") {
  DOM.couplingEditPanel.style.display = "block";
  DOM.couplingEditPanel.scrollIntoView({ behavior: "smooth" });

  const titleEl = document.getElementById("coupling-editor-title");
  
  if (coupleId) {
    // Edit Mode
    titleEl.innerText = "👥 カップリングを編集";
    const couple = state.couplings.find(c => c.id === coupleId);
    
    DOM.editCoupleId.value = couple.id;
    DOM.editCoupleRel.value = couple.relationship;
    DOM.editCharAName.value = couple.partnerA.name;
    DOM.editCharADesc.value = couple.partnerA.description;
    DOM.editCharASpeech.value = couple.partnerA.speechStyle;
    DOM.editCharBName.value = couple.partnerB.name;
    DOM.editCharBDesc.value = couple.partnerB.description;
    DOM.editCharBSpeech.value = couple.partnerB.speechStyle;
  } else {
    // Add Mode
    titleEl.innerText = "👥 新しいカップリングを追加";
    
    DOM.editCoupleId.value = "";
    DOM.editCoupleRel.value = "";
    DOM.editCharAName.value = "";
    DOM.editCharADesc.value = "";
    DOM.editCharASpeech.value = "";
    DOM.editCharBName.value = "";
    DOM.editCharBDesc.value = "";
    DOM.editCharBSpeech.value = "";
  }
}

// Close Coupling Editor
function closeCouplingEditor() {
  DOM.couplingEditPanel.style.display = "none";
}

// Handle Save Coupling
function handleSaveCoupling() {
  const coupleId = DOM.editCoupleId.value;
  const rel = DOM.editCoupleRel.value.trim();
  const charAName = DOM.editCharAName.value.trim();
  const charADesc = DOM.editCharADesc.value.trim();
  const charASpeech = DOM.editCharASpeech.value.trim();
  const charBName = DOM.editCharBName.value.trim();
  const charBDesc = DOM.editCharBDesc.value.trim();
  const charBSpeech = DOM.editCharBSpeech.value.trim();

  if (!charAName || !charBName) {
    alert("攻めキャラと受けキャラの名前は必須入力項目です！");
    return;
  }

  if (coupleId) {
    // Edit existing coupling
    const couple = state.couplings.find(c => c.id === coupleId);
    couple.relationship = rel;
    couple.partnerA.name = charAName;
    couple.partnerA.description = charADesc;
    couple.partnerA.speechStyle = charASpeech;
    couple.partnerB.name = charBName;
    couple.partnerB.description = charBDesc;
    couple.partnerB.speechStyle = charBSpeech;
  } else {
    // Create new coupling
    const newCouple = {
      id: "couple-" + Date.now(),
      relationship: rel || `${charAName}×${charBName}`,
      partnerA: { name: charAName, description: charADesc, speechStyle: charASpeech },
      partnerB: { name: charBName, description: charBDesc, speechStyle: charBSpeech },
      episodes: []
    };
    state.couplings.push(newCouple);
    state.selectedCouplingId = newCouple.id; // select new couple automatically
  }

  saveToLocalStorage();
  renderCouplingList();
  populateCouplingSelect();
  updateGeneratorSeriesUI();
  renderWelcomeDialog();
  closeCouplingEditor();
  alert("カップリング設定を保存しました。");
}

// Render Coupling List
function renderCouplingList() {
  DOM.couplingListContainer.innerHTML = "";
  
  state.couplings.forEach(couple => {
    const card = document.createElement("div");
    card.className = "preset-card";
    card.style.display = "block";
    card.style.cursor = "pointer";
    
    const isActive = couple.id === state.selectedCouplingId;
    if (isActive) {
      card.style.border = "2px solid var(--accent)";
      card.style.boxShadow = "0 0 8px rgba(13, 148, 136, 0.1)";
      card.style.background = "linear-gradient(135deg, rgba(13, 148, 136, 0.03) 0%, var(--bg-elevated) 100%)";
    } else {
      card.style.border = "1px solid var(--border)";
      card.style.background = "var(--bg-elevated)";
    }
    
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
        <h4 style="font-size: 15px; color: var(--accent-light);">
          ${couple.partnerA.name}×${couple.partnerB.name} ${isActive ? '<span style="font-size: 10px; color: var(--accent); margin-left: 6px; font-weight: bold; background: rgba(13, 148, 136, 0.1); padding: 2px 6px; border-radius: 4px;">選択中</span>' : ''}
        </h4>
        <div>
          <button class="pill-btn btn-edit-couple" data-id="${couple.id}" style="padding: 2px 8px; font-size: 10px;">編集</button>
          <button class="pill-btn btn-delete-couple" data-id="${couple.id}" style="padding: 2px 8px; font-size: 10px; border-color: var(--error-bg); color: var(--error);">削除</button>
        </div>
      </div>
      <p style="font-size: 12px; font-weight: 700; color: var(--gold); margin-bottom: 4px;">関係性: ${couple.relationship}</p>
      <p style="font-size: 11px; font-weight: 700; color: var(--accent); margin-bottom: 4px;">
        親密度: ${
          (() => {
            const labels = {
              strangers: "出会ったばかり・ライバル",
              crush: "片想い・意識し合っている",
              slowburn: "両片想い・じれったい距離感",
              secret_lovers: "秘密の恋人・隠れていちゃつく",
              established: "安定した恋人・深い愛 (肉体関係あり)"
            };
            return labels[couple.intimacy] || "両片想い・じれったい距離感";
          })()
        }
      </p>
      <p style="font-size: 11px; color: var(--text-muted); line-height: 1.45;">
        <strong>攻めプロフ:</strong> ${couple.partnerA.description || 'なし'}<br>
        <strong>受けプロフ:</strong> ${couple.partnerB.description || 'なし'}
      </p>
    `;
    
    const editBtn = card.querySelector(".btn-edit-couple");
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openCouplingEditor(couple.id);
    });
    
    const deleteBtn = card.querySelector(".btn-delete-couple");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm("このカップリング設定を削除しますか？")) {
        state.couplings = state.couplings.filter(c => c.id !== couple.id);
        if (state.selectedCouplingId === couple.id) {
          state.selectedCouplingId = state.couplings[0] ? state.couplings[0].id : "";
        }
        saveToLocalStorage();
        renderCouplingList();
        populateCouplingSelect();
        updateGeneratorSeriesUI();
        renderHomeQuickCouplings();
        renderWelcomeDialog();
      }
    });

    card.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      if (state.selectedCouplingId !== couple.id) {
        state.selectedCouplingId = couple.id;
        saveToLocalStorage();
        renderCouplingList();
        renderHomeQuickCouplings();
        renderWelcomeDialog();
        renderBookshelf();
      }
    });
    
    DOM.couplingListContainer.appendChild(card);
  });
}

// Populate Coupling dropdown (Legacy helper - now updates Home quick couplings)
function populateCouplingSelect() {
  if (typeof renderHomeQuickCouplings === "function") {
    renderHomeQuickCouplings();
  }
}

// Update Generator Series UI (Legacy helper - now updates Bookshelf)
function updateGeneratorSeriesUI() {
  if (typeof renderBookshelf === "function") {
    renderBookshelf();
  }
}
// ── RENDER BOOKSHELF (本棚画面) ──
function renderBookshelf() {
  if (!DOM.bookshelfContainer) return;
  DOM.bookshelfContainer.innerHTML = "";

  if (state.couplings.length === 0) {
    DOM.bookshelfContainer.innerHTML = `
      <div class="panel" style="text-align: center; padding: 32px; color: var(--text-muted);">
        <p style="font-size: 15px; font-weight: bold; margin-bottom: 6px;">本棚が空っぽです</p>
        <p style="font-size: 12px; margin-bottom: 16px;">設定タブからカップリングを登録すると、ここに連載本棚が作られます。</p>
        <button class="btn-secondary" id="btn-bookshelf-go-config" style="padding: 8px 16px; font-size: 12px; margin: 0 auto; display: inline-flex;">⚙️ 設定を開く</button>
      </div>
    `;
    const goConfigBtn = document.getElementById("btn-bookshelf-go-config");
    if (goConfigBtn) {
      goConfigBtn.addEventListener("click", () => {
        switchView("view-char-maker");
      });
    }
    return;
  }

  state.couplings.forEach((couple) => {
    const card = document.createElement("div");
    card.className = "bookshelf-couple-card";

    const episodes = couple.episodes || [];
    const nextEpNum = episodes.length + 1;
    const hasEpisodes = episodes.length > 0;

    // Build history summary text
    const historyText = hasEpisodes
      ? episodes.map(ep => `【第${ep.episodeNumber}話】${ep.summary}`).join("\n")
      : "まだエピソード履歴がありません。生成するとこれが第1話になります。";

    let selectedTrope = "Resting at a cozy cafe during their travels around the world";

    card.innerHTML = `
      <div class="bookshelf-title-row">
        <h4 class="bookshelf-couple-name">
          👥 ${couple.partnerA.name}×${couple.partnerB.name}
        </h4>
        <span class="preset-badge badge-story" style="font-size: 10px; padding: 3px 8px; font-weight: 700;">
          ${hasEpisodes ? `連載中: 第${episodes.length}話まで` : "未連載"}
        </span>
      </div>

      <p style="font-size: 11.5px; color: var(--text-muted); margin: 0 0 12px 0; line-height: 1.45;">
        <strong>関係性:</strong> ${couple.relationship}
      </p>

      <div>
        <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase;">これまでのあらすじ</div>
        <div class="bookshelf-history-box" style="margin-bottom: 12px;">${historyText}</div>
      </div>

      <div>
        <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase;">連載アーカイブ (クリックで再読)</div>
        <div class="bookshelf-archive-list"></div>
      </div>

      <div style="border-top: 1px dashed var(--border); padding-top: 16px; margin-top: 16px;">
        <div style="font-size: 13px; font-weight: 800; color: var(--accent); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
          ✨ ドイツ語ストーリーを生成
        </div>
        
        <div style="margin-bottom: 12px;">
          <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase;">シチュエーションを選択</div>
          <div class="quick-trope-buttons" style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="pill-btn quick-trope-btn active" data-trope="Resting at a cozy cafe during their travels around the world" style="font-size: 11px; padding: 4px 10px;">旅先での休息</button>
            <button class="pill-btn quick-trope-btn" data-trope="Sorrento playing a concert with his flute at a local music hall while Julian watches proudly" style="font-size: 11px; padding: 4px 10px;">音楽堂での演奏会</button>
            <button class="pill-btn quick-trope-btn" data-trope="Standing on a quiet pier at sunset, feeling the sea breeze and talking about their journey" style="font-size: 11px; padding: 4px 10px;">潮風の埠頭</button>
            <button class="pill-btn quick-trope-btn" data-trope="Walking through a vibrant local street market, buying ingredients and small gifts" style="font-size: 11px; padding: 4px 10px;">路地裏の市場</button>
            <button class="pill-btn quick-trope-btn" data-trope="Sitting in a quiet hotel lobby in the evening, chatting about the day's travels over tea" style="font-size: 11px; padding: 4px 10px;">ホテルのロビー</button>
            <button class="pill-btn quick-trope-btn" data-trope="random" style="font-size: 11px; padding: 4px 10px;">🎲 ランダム</button>
            <button class="pill-btn quick-trope-btn" data-trope="custom" style="font-size: 11px; padding: 4px 10px;">✏️ カスタム</button>
          </div>
        </div>

        <!-- 詳細設定 (折りたたみ) -->
        <details class="home-detail-settings" style="margin-bottom: 12px;">
          <summary>詳細設定 ⚙️</summary>
          <div class="detail-settings-content">
            <div class="form-group" style="margin-bottom: 0;">
              <label style="font-size: 11px; margin-bottom: 4px;">教材のタイプ</label>
              <select class="quick-type-select" style="width: 100%; padding: 4px 8px; font-size: 11px; height: 28px; border-radius: var(--radius-sm); background: var(--bg-elevated); color: var(--text-primary); border: 1px solid var(--border);">
                <option value="story" selected>ショートストーリー (SS) - 掛け合いと心理描写</option>
                <option value="essay">カルチャー・シチュエーション解説エッセイ</option>
              </select>
            </div>
            <div class="form-group quick-custom-trope-group" style="display: none; margin-bottom: 0; margin-top: 6px;">
              <label style="font-size: 11px; margin-bottom: 4px;">カスタムシチュエーション (日本語/ドイツ語テーマ)</label>
              <textarea class="quick-custom-trope" rows="2" placeholder="例：ドイツのライン川を下る船のデッキで、風に吹かれながら話す二人..." style="width: 100%; font-size: 11px; padding: 6px; border-radius: var(--radius-sm); background: var(--bg-elevated); color: var(--text-primary); border: 1px solid var(--border); resize: vertical;"></textarea>
            </div>
          </div>
        </details>

        <div style="display: flex; gap: 10px; align-items: center; border-top: 1px dashed var(--border); padding-top: 12px;">
          <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
            <select class="bookshelf-level-select" style="width: auto; padding: 4px 8px; font-size: 11px; height: 28px; border-radius: var(--radius-pill); background: var(--bg-elevated); color: var(--text-primary); border: 1px solid var(--border);">
              <option value="pre2">ドイツ語 A1 (超初級)</option>
              <option value="grade2">ドイツ語 A2 (初級)</option>
            </select>
            <select class="bookshelf-mode-select" style="width: auto; padding: 4px 8px; font-size: 11px; height: 28px; border-radius: var(--radius-pill); background: var(--bg-elevated); color: var(--text-primary); border: 1px solid var(--border);">
              <option value="series" ${hasEpisodes ? 'selected' : ''}>連載 (第${nextEpNum}話として保存)</option>
              <option value="standalone">単発ストーリー</option>
            </select>
          </div>
          <button class="btn-primary btn-bookshelf-write" style="flex: 1; padding: 6px 14px; font-size: 12px; min-height: 28px; border-radius: var(--radius-pill); cursor: pointer;">
            ✨ ストーリーを生成する
          </button>
        </div>
      </div>
    `;

    // Render past episodes library
    const archiveList = card.querySelector(".bookshelf-archive-list");
    if (hasEpisodes) {
      episodes.forEach((ep) => {
        const item = document.createElement("div");
        item.className = "preset-card";
        item.style.padding = "10px 14px";
        item.style.marginBottom = "8px";
        item.style.cursor = "pointer";

        item.innerHTML = `
          <div class="preset-info">
            <h5 style="font-size: 13px; font-weight: 700; color: var(--accent-light); margin: 0;">${ep.title}</h5>
            <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">第${ep.episodeNumber}話 • ${ep.level === "pre2" ? "ドイツ語 A1" : "ドイツ語 A2"} • ${ep.summary}</p>
          </div>
          <span class="preset-badge badge-story" style="font-size: 9px; padding: 2px 6px;">第${ep.episodeNumber}話</span>
        `;

        item.onclick = () => {
          loadContent(ep, false);
          switchView("view-reader");
        };

        archiveList.appendChild(item);
      });
    } else {
      archiveList.innerHTML = `<div style="font-size: 11px; color: var(--text-dimmed); text-align: center; padding: 12px; background: var(--bg-subtle); border-radius: var(--radius-sm);">まだエピソード履歴がありません。シチュエーションを選んで最初のストーリーを生成してください。</div>`;
    }

    // Bind Trope buttons
    const tropeButtons = card.querySelectorAll(".quick-trope-btn");
    const customTropeGroup = card.querySelector(".quick-custom-trope-group");
    const customTropeTextarea = card.querySelector(".quick-custom-trope");
    const detailsEl = card.querySelector(".home-detail-settings");

    tropeButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        tropeButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        selectedTrope = btn.getAttribute("data-trope");

        if (selectedTrope === "custom") {
          customTropeGroup.style.display = "block";
          detailsEl.open = true;
          customTropeTextarea.focus();
        } else {
          customTropeGroup.style.display = "none";
        }
      });
    });

    // Bind "Generate" button
    const writeBtn = card.querySelector(".btn-bookshelf-write");
    writeBtn.addEventListener("click", async () => {
      const levelSelect = card.querySelector(".bookshelf-level-select");
      const modeSelect = card.querySelector(".bookshelf-mode-select");
      const typeSelect = card.querySelector(".quick-type-select");
      const customTropeVal = customTropeTextarea.value.trim();

      if (selectedTrope === "custom" && !customTropeVal) {
        alert("カスタムシチュエーションを入力してください。");
        customTropeTextarea.focus();
        return;
      }

      state.selectedCouplingId = couple.id;
      state.generationMode = modeSelect.value;

      let tropeVal = selectedTrope;
      if (selectedTrope === "random") {
        const tropes = [
          "Resting at a cozy cafe during their travels around the world",
          "Sorrento playing a concert with his flute at a local music hall while Julian watches proudly",
          "Standing on a quiet pier at sunset, feeling the sea breeze and talking about their journey",
          "Walking through a vibrant local street market, buying ingredients and small gifts",
          "Sitting in a quiet hotel lobby in the evening, chatting about the day's travels over tea"
        ];
        tropeVal = tropes[Math.floor(Math.random() * tropes.length)];
      }

      const options = {
        level: levelSelect.value,
        type: typeSelect.value,
        trope: tropeVal,
        customTrope: selectedTrope === "custom" ? customTropeVal : "",
        mode: modeSelect.value,
        onStart: () => {
          writeBtn.disabled = true;
          writeBtn.innerText = "✍️ 執筆中...";
        },
        onEnd: () => {
          writeBtn.disabled = false;
          writeBtn.innerText = "✨ ストーリーを生成する";
        }
      };

      await handleGeneration(options);
    });

    DOM.bookshelfContainer.appendChild(card);
  });
}

// ── DYNAMIC GENERATION HANDLER ──
async function handleGeneration(customOptions = {}) {
  // state.apiKey is optional because it fallbacks to Vercel serverless function proxy (/api/gemini)

  const currentCouple = state.couplings.find(c => c.id === state.selectedCouplingId);
  if (!currentCouple) {
    alert("カップリングが登録されていません。設定タブで追加してください。");
    return;
  }

  // Set default values if not provided in customOptions
  const nextEpisodeNum = currentCouple.episodes.length + 1;
  const historySummary = currentCouple.episodes.map(ep => ep.summary).join(" ");

  const options = {
    apiKey: state.apiKey,
    charA: currentCouple.partnerA,
    charB: currentCouple.partnerB,
    relationship: currentCouple.relationship,
    intimacy: currentCouple.intimacy || "slowburn",
    level: customOptions.level || "pre2",
    type: customOptions.type || "story",
    trope: customOptions.trope || "Working late at the office together",
    customTrope: (customOptions.customTrope || "").trim(),
    mode: customOptions.mode || "standalone",
    episodeNumber: nextEpisodeNum,
    historySummary: historySummary
  };

  // Call onStart callback if provided
  if (customOptions.onStart) {
    customOptions.onStart();
  }

  try {
    const generated = await window.generateEnglishMaterial(options);
    
    // Save to series episodes if in series mode
    if (options.mode === "series") {
      const newEpisode = {
        id: "ep-" + Date.now(),
        episodeNumber: nextEpisodeNum,
        title: generated.title,
        english: generated.english,
        japanese: generated.japanese,
        summary: generated.summary || "エピソードが完了しました。",
        words: generated.words,
        grammarExplanations: generated.grammarExplanations,
        questions: generated.questions,
        level: generated.level,
        situation: generated.situation || options.trope,
        wordCount: generated.wordCount
      };
      
      currentCouple.episodes.push(newEpisode);
      saveToLocalStorage();
      
      // Refresh Bookshelf UI
      renderBookshelf();
    }

    loadContent(generated, true); 
    switchView("view-reader");
    
    state.stats.totalRead++;
    saveToLocalStorage();
    updateStatsUI();
  } catch (error) {
    alert("生成中にエラーが発生しました。\n・「設定」タブでAPIキーが入力されている場合、キーが正しいか確認してください。\n・サーバー（Vercel）で稼働させる場合は、環境変数「GEMINI_API_KEY」が正しく設定されているか確認してください。\n\n詳細: " + error.message);
  } finally {
    // Call onEnd callback if provided
    if (customOptions.onEnd) {
      customOptions.onEnd();
    }
  }
}

// ── RENDER HOME QUICK GENERATOR (今日の二人) ──
function renderHomeQuickCouplings() {
  // Consolidated into Bookshelf
}

// ── RENDER PRESETS ──
function renderPresetList() {
  DOM.presetContainer.innerHTML = "";
  if (!window.PRESET_STORIES) return;

  window.PRESET_STORIES.forEach((story) => {
    const card = document.createElement("div");
    card.className = "preset-card";
    
    const label = story.type === "story" ? "Short Story" : "Essay";
    const badgeClass = story.type === "story" ? "badge-story" : "badge-essay";
    const levelLabel = story.level === "pre2" ? "準2級" : "2級";

    card.innerHTML = `
      <div class="preset-info">
        <h4>${story.title}</h4>
        <p>${levelLabel} • ${story.situation} • ${story.wordCount}語</p>
      </div>
      <span class="preset-badge ${badgeClass}">${label}</span>
    `;

    card.addEventListener("click", () => {
      loadPresetStory(story);
    });

    DOM.presetContainer.appendChild(card);
  });
}

// Load Preset Story
function loadPresetStory(story) {
  if (story.characterProfiles && story.characterProfiles.length >= 2) {
    const pA = story.characterProfiles[0];
    const pB = story.characterProfiles[1];
    
    let existingCouple = state.couplings.find(c => 
      c.partnerA.name.toLowerCase() === pA.name.toLowerCase() && 
      c.partnerB.name.toLowerCase() === pB.name.toLowerCase()
    );

    if (!existingCouple) {
      const newCouple = {
        id: "couple-preset-" + Date.now(),
        relationship: story.situation || `${pA.name}と${pB.name}`,
        partnerA: pA,
        partnerB: pB,
        episodes: []
      };
      state.couplings.push(newCouple);
      state.selectedCouplingId = newCouple.id;
      saveToLocalStorage();
      renderCouplingList();
      populateCouplingSelect();
      updateGeneratorSeriesUI();
      renderHomeQuickCouplings();
    } else {
      state.selectedCouplingId = existingCouple.id;
      saveToLocalStorage();
      populateCouplingSelect();
      updateGeneratorSeriesUI();
    }
  }

  loadContent(story, true); 
  switchView("view-reader");
  
  state.stats.totalRead++;
  saveToLocalStorage();
  updateStatsUI();
}

// ── LOAD AND RENDER CONTENT IN READER ──
function loadContent(content, triggerStreak = false) {
  state.currentContent = content;
  stopAudio();
  
  DOM.readerTitle.innerText = content.title;
  DOM.readerMetaLevel.innerText = content.level === "pre2" ? "ドイツ語 A1" : "ドイツ語 A2";
  DOM.readerMetaTrope.innerText = content.situation || "カスタム";
  DOM.readerMetaWpm.innerText = `${content.wordCount || content.english.split(/\s+/).length} 語`;

  renderEnglishTaps(content.english);

  DOM.readerContentJapanese.innerHTML = `<p>${content.japanese}</p>`;
  DOM.btnModeEn.classList.add("active");
  DOM.btnModeParallel.classList.remove("active");
  DOM.readerContentJapanese.style.display = "none";

  if (content.grammarExplanations && content.grammarExplanations.length > 0) {
    DOM.readerGrammarSection.style.display = "block";
    DOM.grammarContainer.innerHTML = content.grammarExplanations.map(item => `
      <div class="grammar-item">
        <div class="grammar-sentence">${item.sentence}</div>
        <div class="grammar-syntax">${item.structure}</div>
        <div class="grammar-explanation">${item.explanation}</div>
      </div>
    `).join('');
  } else {
    DOM.readerGrammarSection.style.display = "none";
  }

  if (content.questions && content.questions.length > 0) {
    DOM.readerQuizSection.style.display = "block";
    renderQuizzes(content.questions);
  } else {
    DOM.readerQuizSection.style.display = "none";
  }

  state.studyModeActive = false;
  DOM.btnStudyMode.classList.remove("active");

  window.scrollTo({ top: 0, behavior: "instant" });

  if (triggerStreak) {
    handleStreakCalculation();
  }
}

// Render taps for each English word (Supports German characters)
function renderEnglishTaps(text) {
  const tokens = text.split(/([a-zA-ZäöüÄÖÜß'-]+)/);
  const html = tokens.map(token => {
    if (/^[a-zA-ZäöüÄÖÜß'-]+$/.test(token)) {
      const cleanWord = token.toLowerCase();
      return `<span class="word-tap" data-clean-word="${cleanWord}">${token}</span>`;
    }
    return token.replace(/\n/g, "<br>");
  }).join('');

  DOM.readerContentEnglish.innerHTML = `<p>${html}</p>`;

  const wordSpans = DOM.readerContentEnglish.querySelectorAll(".word-tap");
  wordSpans.forEach(span => {
    span.addEventListener("click", (e) => {
      e.stopPropagation();
      
      wordSpans.forEach(s => s.classList.remove("active"));
      span.classList.add("active");

      const cleanWord = span.getAttribute("data-clean-word");
      const originalWord = span.innerText;
      showWordPopover(cleanWord, originalWord);
    });
  });
}

function toggleStudyModeHighlights() {
  const spans = DOM.readerContentEnglish.querySelectorAll(".word-tap");
  const storyWords = state.currentContent ? state.currentContent.words.map(w => w.word.toLowerCase()) : [];
  
  const isSimilar = (word, kw) => {
    if (word === kw) return true;
    if (word.length < 3 || kw.length < 3) return false;
    
    if (word.startsWith(kw)) return true;
    
    const minLen = Math.min(word.length, kw.length);
    if (minLen >= 4) {
      const prefixLen = Math.max(4, Math.floor(minLen * 0.8));
      return word.substring(0, prefixLen) === kw.substring(0, prefixLen);
    }
    return false;
  };

  spans.forEach(span => {
    const word = span.getAttribute("data-clean-word");
    const isKeyword = storyWords.some(kw => isSimilar(word, kw));
    if (isKeyword) {
      if (state.studyModeActive) {
        span.style.borderBottom = "2px solid var(--gold)";
        span.style.fontWeight = "bold";
      } else {
        span.style.borderBottom = "";
        span.style.fontWeight = "";
      }
    }
  });
}

async function showWordPopover(cleanWord, originalWord) {
  const clickedSpan = DOM.readerContentEnglish.querySelector(".word-tap.active");
  const paragraphText = clickedSpan ? clickedSpan.parentElement.innerText : "";

  DOM.popLevel.style.display = "none";
  DOM.popImportance.style.display = "none";

  const localWordDef = state.currentContent?.words.find(w => {
    const kw = w.word.toLowerCase();
    return cleanWord === kw || cleanWord.startsWith(kw) || kw.startsWith(cleanWord);
  });

  if (localWordDef) {
    DOM.popWord.innerText = localWordDef.word;
    DOM.popPos.innerText = localWordDef.pos;
    DOM.popDef.innerText = localWordDef.meaning;
    DOM.popContext.innerHTML = `&ldquo;${localWordDef.context}&rdquo;`;
    
    if (localWordDef.level) {
      DOM.popLevel.innerText = localWordDef.level;
      DOM.popLevel.style.display = "inline-block";
    }
    if (localWordDef.importance) {
      DOM.popImportance.innerText = "★".repeat(localWordDef.importance);
      DOM.popImportance.style.display = "inline-block";
    }
    
    DOM.globalVocabPopup.classList.add("show");
    return;
  }

  // Always try Gemini dictionary (will fallback to proxy /api/gemini if state.apiKey is empty)
  DOM.popWord.innerText = originalWord;
  DOM.popPos.innerText = "翻訳中...";
  DOM.popDef.innerText = "AIによる文脈翻訳を取得しています...";
  DOM.popContext.innerText = "";
  DOM.globalVocabPopup.classList.add("show");

  try {
    const result = await window.translateWordWithGemini(originalWord, paragraphText, state.apiKey);
    DOM.popWord.innerText = result.word;
    DOM.popPos.innerText = result.pos;
    DOM.popDef.innerText = result.meaning;
    
    if (result.level && result.level !== "対象外") {
      DOM.popLevel.innerText = `ドイツ語 ${result.level}`;
      DOM.popLevel.style.display = "inline-block";
    }
    if (result.importance) {
      DOM.popImportance.innerText = "★".repeat(result.importance);
      DOM.popImportance.style.display = "inline-block";
    }
    DOM.popContext.innerHTML = `&ldquo;${paragraphText}&rdquo;`;
  } catch (err) {
    console.error("Gemini dictionary lookup failed, falling back to English API", err);
    fallbackToFreeDictionary(cleanWord, originalWord);
  }
}

async function fallbackToFreeDictionary(cleanWord, originalWord) {
  DOM.popWord.innerText = originalWord;
  DOM.popPos.innerText = "loading...";
  DOM.popDef.innerText = "辞書を検索中...";
  DOM.popContext.innerText = "";
  DOM.globalVocabPopup.classList.add("show");

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`);
    if (!res.ok) throw new Error("Not found");
    const json = await res.json();
    
    const entry = json[0];
    const meaning = entry.meanings[0];
    const pos = meaning.partOfSpeech;
    const definition = meaning.definitions[0].definition;
    const example = meaning.definitions[0].example || "";

    DOM.popPos.innerText = pos;
    DOM.popDef.innerText = `${definition} (※APIキー設定で日本語訳になります)`;
    DOM.popContext.innerText = example ? `Example: "${example}"` : "";
  } catch (err) {
    DOM.popPos.innerText = "UNKNOWN";
    DOM.popDef.innerText = "意味が見つかりませんでした。(※APIキーを設定すると日本語訳が表示されます)";
  }
}

async function renderWelcomeDialog() {
  const currentCouple = state.couplings.find(c => c.id === state.selectedCouplingId);
  const charA = currentCouple ? currentCouple.partnerA : null;
  const charB = currentCouple ? currentCouple.partnerB : null;

  const dialoguesDefault = [
    "「お帰りなさい。今日は『Guten Tag（こんにちは）』ですよ。Lernen wir Deutsch!（ドイツ語を学びましょう！）」",
    "「お疲れ様でした。今日は『Danke（ありがとう）』です。Lernen macht Spaß!（学ぶのは楽しいですよ！）」",
    "「お帰りなさい。今日は『Bitte（どうぞ）』です。Viel Erfolg!（うまくいくといいですね！）」",
    "「お疲れ様でした。今日は『Auf Wiedersehen（さようなら）』です。Bis bald!（またすぐに！）」"
  ];

  // Randomly decide which character speaks first
  const pickCharA = Math.random() > 0.5;
  const activeChar = pickCharA ? charA : charB;
  const otherChar = pickCharA ? charB : charA;

  if (!activeChar) {
    const textEl = document.getElementById("home-welcome-text");
    if (textEl) {
      textEl.innerText = dialoguesDefault[Math.floor(Math.random() * dialoguesDefault.length)];
    }
    return;
  }

  // Static fallback pools (Rich version with 8 dialogues per character including gender articles for nouns)
  const dialoguesA = [
    "「ジュリアン様。今日は『Guten Morgen（おはようございます）』です。Guten Morgen, Julian.（おはようございます、ジュリアン様）。……本日もよろしくお願いします」",
    "「ジュリアン様、お帰りなさい。今日は『der Tee（紅茶/男性名詞）』です。Einen Tee, bitte.（紅茶をどうぞ）。……お疲れのようですね」",
    "「今日は『die Reise（旅/女性名詞）』を。Ich begleite Sie gerne.（喜んでお供します）。……どこへでも」",
    "「今日は『Danke schön（ありがとうございます）』です。Danke schön, Julian.（ありがとうございます、ジュリアン様）。……いつも、そちらの言葉ですね」",
    "「今日は『die Reise（旅/女性名詞）』について。Wir reisen zusammen.（一緒に旅をしています）。……悪くないですね、この旅も」",
    "「今日は『Gute Nacht（おやすみなさい）』です。Gute Nacht, Julian.（おやすみなさい）。……ゆっくり休んでください」",
    "「今日は『die Musik（音楽/女性名詞）』です。Ich spiele für Sie.（あなたのために演奏します）。……聴いていただけますか」",
    "「今日は『der Freund（友・大切な人/男性名詞）』です。Sie sind mein wichtigster Mensch.（あなたは私の大切な人です）。……少し、言いすぎましたね」"
  ];

  const dialoguesB = [
    "「お帰り、Sorrento。今日は『Wie geht es Ihnen?（ご機嫌いかがですか？）』ですよ。Wie geht es Ihnen heute?（今日はどうでしたか？）。……あなたの顔を見ると、少し安心しますね」",
    "「ありがとうございます、Sorrento。今日は『der Freund（大切な人・友/男性名詞）』です。Sie sind mein treuer Begleiter.（あなたは私の大切な旅の仲間です）。……本当に、そう思っていますよ」",
    "「Sorrento、あなたのフルートは美しいですね。今日は『wunderschön（とても美しい）』です。Ihre Musik ist wunderschön.（あなたの音楽はとても美しいです）。……素直な感想ですよ」",
    "「お疲れ様でした、Sorrento。今日は『der Tee（お茶・紅茶/男性名詞）』です。Trinken wir zusammen Tee?（一緒にお茶でもどうですか？）。……あなたとのこういう時間が、好きですよ」",
    "「今日は『die Sonne（太陽/女性名詞）』ですよ。Sorrento, Sie sind meine Sonne.（Sorrento、あなたは私の太陽です）。……笑わないでくださいね、本気ですから」",
    "「今日は『das Meer（海/中性名詞）』です。Das Meer ist heute ruhig.（今日の海は穏やかですね）。……こうしてあなたと眺めていると、なんだか穏やかな気持ちになります」",
    "「Sorrento、あなたの音色が聞こえてきましたよ。今日は『die Musik（音楽/女性名詞）』です。Ich höre Ihre Musik gerne.（あなたの音楽を聴くのが好きです）。……旅の人たちも、みんな足を止めていましたね」",
    "「Sorrento、今日は『die Reise（旅/女性名詞）』です。Unsere Reise geht weiter.（私たちの旅はまだ続きますね）。……あなたと一緒なら、どこまでも行けそうな気がしますよ」"
  ];

  // Try to get a fresh dialogue from Gemini API
  let message = "";
  try {
    const apiKey = state.apiKey || "";
    // generateWelcomeDialogueWithGemini is defined in gemini.js and returns an object
    const resultObj = await generateWelcomeDialogueWithGemini(currentCouple, activeChar, otherChar, apiKey);
    message = resultObj.text;
  } catch (e) {
    console.warn("Gemini API failed for welcome dialogue, falling back to static pool", e);
    // Fallback: pick from static pool
    const pool = pickCharA ? dialoguesA : dialoguesB;
    message = pool[Math.floor(Math.random() * pool.length)];
  }

  const avatarEl = document.getElementById("home-welcome-avatar");
  const nameEl = document.getElementById("home-welcome-name");
  const textEl = document.getElementById("home-welcome-text");

  if (avatarEl && nameEl && textEl) {
    avatarEl.innerText = activeChar.name.charAt(0).toUpperCase();
    avatarEl.style.background = pickCharA
      ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)"
      : "linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)";
    avatarEl.style.color = "#ffffff";
    avatarEl.style.border = "none";

    nameEl.innerText = activeChar.name;
    textEl.innerText = message;
  }
}

function closePopover() {
  DOM.globalVocabPopup.classList.remove("show");
  DOM.readerContentEnglish.querySelectorAll(".word-tap").forEach(s => s.classList.remove("active"));
}

function savePopoverWordToVocab() {
  const word = DOM.popWord.innerText;
  const pos = DOM.popPos.innerText;
  const meaning = DOM.popDef.innerText;
  const context = DOM.popContext.innerText || `From story: "${state.currentContent?.title}"`;
  
  const level = DOM.popLevel.style.display !== "none" ? DOM.popLevel.innerText : "";
  const importance = DOM.popImportance.style.display !== "none" ? DOM.popImportance.innerText.length : 0;

  const exists = state.vocabList.some(v => v.word.toLowerCase() === word.toLowerCase());
  if (exists) {
    alert("この単語はすでに復習カードに登録されています！");
    return;
  }

  state.vocabList.push({
    id: "vocab-" + Date.now(),
    word,
    pos,
    meaning,
    context,
    level,
    importance
  });

  saveToLocalStorage();
  updateVocabBadge();
  updateStatsUI();

  DOM.popBtnAddVocab.innerText = "✓ 追加されました";
  setTimeout(() => {
    DOM.popBtnAddVocab.innerText = "➕ 復習カードに追加";
    closePopover();
  }, 1000);
}

function updateVocabBadge() {
  DOM.vocabBadgeCount.innerText = state.vocabList.length;
}

// ── SPEECH SYNTHESIS (AUDIO) ──
function startAudio() {
  if (!state.currentContent) return;

  window.speechSynthesis.cancel();

  state.speechUtterance = new SpeechSynthesisUtterance(state.currentContent.english);
  state.speechUtterance.lang = "de-DE";
  state.speechUtterance.rate = state.speechSpeed;
  
  const voices = window.speechSynthesis.getVoices();
  const germanVoice = voices.find(v => v.lang && (v.lang.startsWith("de-") || v.lang.toLowerCase().includes("de"))) || voices[0];
  if (germanVoice) {
    state.speechUtterance.voice = germanVoice;
  }

  state.speechUtterance.onend = () => {
    stopAudio();
  };
  state.speechUtterance.onerror = () => {
    stopAudio();
  };

  DOM.btnAudioPlay.style.display = "none";
  DOM.btnAudioStop.style.display = "inline-flex";
  
  window.speechSynthesis.speak(state.speechUtterance);
}

// Stop Audio
function stopAudio() {
  window.speechSynthesis.cancel();
  DOM.btnAudioPlay.style.display = "inline-flex";
  DOM.btnAudioStop.style.display = "none";
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {};
}

// ── QUIZZES RENDER & LOGIC ──
function renderQuizzes(questions) {
  DOM.quizContainer.innerHTML = "";
  questions.forEach((q, qIndex) => {
    const card = document.createElement("div");
    card.className = "quiz-card";
    
    const choicesHtml = q.choices.map((choice, cIndex) => `
      <button class="choice-btn" data-qindex="${qIndex}" data-cindex="${cIndex}">
        ${cIndex + 1}. ${choice}
      </button>
    `).join('');

    card.innerHTML = `
      <div class="quiz-question">${qIndex + 1}. ${q.question}</div>
      <div class="quiz-choices" id="choices-q-${qIndex}">
        ${choicesHtml}
      </div>
      <div class="quiz-explanation" id="expl-q-${qIndex}" style="display: none;">
        <strong>解説:</strong> ${q.explanation}
      </div>
    `;

    DOM.quizContainer.appendChild(card);
  });

  const choiceButtons = DOM.quizContainer.querySelectorAll(".choice-btn");
  choiceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const qIndex = parseInt(btn.getAttribute("data-qindex"));
      const cIndex = parseInt(btn.getAttribute("data-cindex"));
      const correctAnswer = questions[qIndex].answerIndex;

      const groupContainer = document.getElementById(`choices-q-${qIndex}`);
      const siblingButtons = groupContainer.querySelectorAll(".choice-btn");
      const explanationBlock = document.getElementById(`expl-q-${qIndex}`);

      siblingButtons.forEach(b => b.disabled = true);
      state.stats.totalQuizzes++;

      if (cIndex === correctAnswer) {
        btn.classList.add("correct");
        state.stats.totalCorrect++;
      } else {
        btn.classList.add("wrong");
        siblingButtons[correctAnswer].classList.add("correct");
      }

      saveToLocalStorage();
      updateStatsUI();
      explanationBlock.style.display = "block";
    });
  });
}

// ── VOCAB CARD DECK RENDER & LOGIC ──
function renderVocabDeck() {
  if (state.vocabList.length === 0) {
    DOM.vocabDeckActive.style.display = "none";
    DOM.vocabDeckEmpty.style.display = "block";
    return;
  }

  DOM.vocabDeckActive.style.display = "block";
  DOM.vocabDeckEmpty.style.display = "none";

  if (state.vocabQueue.length === 0) {
    state.vocabQueue = [...state.vocabList];
    state.currentVocabIndex = 0;
  }

  if (state.currentVocabIndex >= state.vocabQueue.length) {
    alert("すべてのカードの復習が完了しました！キューを再読み込みします。");
    state.vocabQueue = [...state.vocabList];
    state.currentVocabIndex = 0;
  }

  const currentCard = state.vocabQueue[state.currentVocabIndex];

  DOM.vocabCardCounter.innerText = `カード ${state.currentVocabIndex + 1} / ${state.vocabQueue.length}`;
  DOM.vocabCardWord.innerText = currentCard.word;
  DOM.vocabCardPos.innerText = currentCard.pos;
  
  DOM.vocabCardPosBack.innerText = currentCard.pos;
  DOM.vocabCardDef.innerText = currentCard.meaning;
  DOM.vocabCardContext.innerHTML = `&ldquo;${currentCard.context}&rdquo;`;

  if (currentCard.level) {
    DOM.vocabCardLevel.innerText = currentCard.level;
    DOM.vocabCardLevel.style.display = "inline-block";
  } else {
    DOM.vocabCardLevel.style.display = "none";
  }

  if (currentCard.importance) {
    DOM.vocabCardImportance.innerText = "★�".repeat(currentCard.importance);
    DOM.vocabCardImportance.style.display = "inline-block";
  } else {
    DOM.vocabCardImportance.style.display = "none";
  }

  DOM.vocabFlipperContainer.classList.remove("flipped");
}

function handleVocabResponse(known) {
  const currentCard = state.vocabQueue[state.currentVocabIndex];

  if (known) {
    state.vocabList = state.vocabList.filter(item => item.id !== currentCard.id);
    state.vocabQueue = state.vocabQueue.filter(item => item.id !== currentCard.id);
    if (state.currentVocabIndex >= state.vocabQueue.length) {
      state.currentVocabIndex = 0;
    }
  } else {
    state.currentVocabIndex++;
  }

  saveToLocalStorage();
  updateVocabBadge();
  updateStatsUI();
  renderVocabDeck();
}

// 笏笏 STREAK CALCULATION LOGIC 笏笏
function handleStreakCalculation() {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const lastRead = state.stats.lastReadDate;
  
  if (lastRead === today) {
    return;
  }
  
  if (lastRead) {
    const lastDate = new Date(lastRead);
    const todayDate = new Date(today);
    const diffTime = Math.abs(todayDate - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      state.stats.streak++;
    } else {
      state.stats.streak = 1;
    }
  } else {
    state.stats.streak = 1;
  }
  
  state.stats.lastReadDate = today;
  saveToLocalStorage();
  updateStreakUI();
}

// 笏笏 STATISTICS UI UPDATE 笏笏
function updateStatsUI() {
  DOM.statsTotalRead.innerText = state.stats.totalRead;
  DOM.statsTotalWords.innerText = state.vocabList.length;

  const rate = state.stats.totalQuizzes > 0 
    ? Math.round((state.stats.totalCorrect / state.stats.totalQuizzes) * 100)
    : 0;
  DOM.statsTotalCorrect.innerText = `${rate}%`;
}

function updateStreakUI() {
  const streakText = document.getElementById("home-streak-text");
  if (streakText) {
    const currentStreak = state.stats.streak || 0;
    streakText.innerText = `${currentStreak}日連続学習中！`;
  }
}

window.addEventListener("DOMContentLoaded", init);