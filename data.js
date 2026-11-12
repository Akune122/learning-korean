// Base de données pédagogique complète :
// NIVEAU 1 (A1 - FONDATIONS) & NIVEAU 2 (A2 - INTERMÉDIAIRE)
// Hangeul, Tracé, Grammaire A1 & A2, Connecteurs, Politesse, Verbes Irréguliers,
// Racines Hanja, RPG Séoul, Histoires Survol Magique, Nombres, Vocabulaire, Quêtes & Anki

const HANGUL_DATA = {
  vowelsBasic: [
    {
      id: "v_a", char: "ㅏ", syllable: "아", roman: "a",
      frenchSound: "Comme le « a » dans « papa »",
      mouthTip: "Bouche grande ouverte naturellement.",
      mnemonic: "Trait vertical + petite barre vers la droite (➡️).",
      example: { word: "아이", roman: "a-i", meaning: "Enfant" }
    },
    {
      id: "v_eo", char: "ㅓ", syllable: "어", roman: "eo",
      frenchSound: "Comme le « o » ouvert dans « porte » ou « bol »",
      mouthTip: "Bouche mi-ouverte et détendue, lèvres non arrondies. Ne jamais lire « é-o » !",
      mnemonic: "La petite barre pointe vers la gauche (⬅️).",
      example: { word: "어머니", roman: "eo-meo-ni", meaning: "Mère" }
    },
    {
      id: "v_o", char: "ㅗ", syllable: "오", roman: "o",
      frenchSound: "Comme le « o » fermé dans « moto » ou « eau »",
      mouthTip: "Lèvres bien arrondies vers l'avant.",
      mnemonic: "La barre pointe vers le haut (⬆️).",
      example: { word: "오이", roman: "o-i", meaning: "Concombre" }
    },
    {
      id: "v_u", char: "ㅜ", syllable: "우", roman: "u (ou)",
      frenchSound: "Comme le « ou » dans « loup »",
      mouthTip: "Lèvres arrondies et projetées.",
      mnemonic: "La barre pointe vers le bas (⬇️).",
      example: { word: "우유", roman: "u-yu", meaning: "Lait" }
    },
    {
      id: "v_eu", char: "ㅡ", syllable: "으", roman: "eu",
      frenchSound: "Entre « e » de « le » et « u », les lèvres étirées à plat",
      mouthTip: "Étirez les lèvres comme pour sourire et dites « eu / ou » sans arrondir la bouche.",
      mnemonic: "Une ligne horizontale plate comme les lèvres étirées (➖).",
      example: { word: "음식", roman: "eum-sik", meaning: "Nourriture" }
    },
    {
      id: "v_i", char: "ㅣ", syllable: "이", roman: "i",
      frenchSound: "Comme le « i » dans « midi »",
      mouthTip: "Lèvres étirées, langue haute.",
      mnemonic: "Ressemble au chiffre romain I.",
      example: { word: "이름", roman: "i-reum", meaning: "Nom / Prénom" }
    },
    {
      id: "v_ae", char: "ㅐ", syllable: "애", roman: "ae (è)",
      frenchSound: "Comme le « è » dans « mère »",
      mouthTip: "Composé de ㅏ + ㅣ.",
      mnemonic: "Ressemble à un H.",
      example: { word: "개", roman: "gae", meaning: "Chien" }
    },
    {
      id: "v_e", char: "ㅔ", syllable: "에", roman: "e (é/è)",
      frenchSound: "Comme « é / è » dans « été » (quasi identique à ㅐ à l'oral)",
      mouthTip: "En coréen moderne, ㅐ et ㅔ ont le même son.",
      mnemonic: "Composé de ㅓ + ㅣ.",
      example: { word: "네", roman: "ne", meaning: "Oui" }
    }
  ],

  vowelsComplex: [
    {
      id: "v_ya", char: "ㅑ", syllable: "야", roman: "ya",
      frenchSound: "Comme « ya » dans « yaourt »",
      mouthTip: "Ajoutez un 2e petit trait à ㅏ (a) pour ajouter le son « y ».",
      mnemonic: "ㅏ + 1 trait = ㅑ (ya).",
      example: { word: "야구", roman: "ya-gu", meaning: "Baseball" }
    },
    {
      id: "v_yeo", char: "ㅕ", syllable: "여", roman: "yeo",
      frenchSound: "« yo » ouvert (comme dans « fjord »)",
      mouthTip: "Ajoutez un 2e trait à ㅓ (eo).",
      mnemonic: "ㅓ + 1 trait = ㅕ (yeo).",
      example: { word: "여름", roman: "yeo-reum", meaning: "Été" }
    },
    {
      id: "v_yo", char: "ㅛ", syllable: "요", roman: "yo",
      frenchSound: "Comme « yo » dans « yoga » (o fermé)",
      mouthTip: "Ajoutez un 2e trait à ㅗ (o).",
      mnemonic: "Omniprésent à la fin des verbes polis (-요) !",
      example: { word: "요리", roman: "yo-ri", meaning: "Cuisine" }
    },
    {
      id: "v_yu", char: "ㅠ", syllable: "유", roman: "yu (you)",
      frenchSound: "Comme « you » dans « youpi »",
      mouthTip: "Ajoutez un 2e trait à ㅜ (ou).",
      mnemonic: "ㅜ + 1 trait = ㅠ.",
      example: { word: "우유", roman: "u-yu", meaning: "Lait" }
    },
    {
      id: "v_wa", char: "ㅘ", syllable: "와", roman: "wa",
      frenchSound: "Comme « oi » dans « roi » (wa)",
      mouthTip: "Fusion de ㅗ (o) + ㅏ (a).",
      mnemonic: "ㅗ + ㅏ = 와 (Wahou !).",
      example: { word: "사과", roman: "sa-gwa", meaning: "Pomme" }
    },
    {
      id: "v_wo", char: "ㅝ", syllable: "워", roman: "wo",
      frenchSound: "Comme « wo » dans « wonder »",
      mouthTip: "Fusion de ㅜ (ou) + ㅓ (eo).",
      mnemonic: "ㅜ + ㅓ = 워.",
      example: { word: "고마워요", roman: "go-ma-wo-yo", meaning: "Merci" }
    },
    {
      id: "v_wi", char: "ㅟ", syllable: "위", roman: "wi",
      frenchSound: "Comme « oui » en français",
      mouthTip: "Fusion de ㅜ (ou) + ㅣ (i).",
      mnemonic: "ㅜ + ㅣ = 위 (oui).",
      example: { word: "위", roman: "wi", meaning: "Au-dessus / Haut" }
    },
    {
      id: "v_ui", char: "ㅢ", syllable: "의", roman: "ui (eui)",
      frenchSound: "Glissement rapide de « eu » (ㅡ) vers « i » (ㅣ)",
      mouthTip: "Dites ㅡ puis ㅣ sans bouger les lèvres.",
      mnemonic: "ㅡ + ㅣ = 의.",
      example: { word: "의사", roman: "ui-sa", meaning: "Médecin" }
    }
  ],

  consonantsBasic: [
    {
      id: "c_g", char: "ㄱ", syllable: "가", name: "기역 (gi-yeok)", roman: "g / k",
      frenchSound: "Entre « G » de « gare » et « K » doux (sans souffle)",
      mouthTip: "Plus proche de K doux en début de mot, et d'un vrai G sonore entre deux voyelles.",
      mnemonic: "Angle droit.",
      example: { word: "가방", roman: "ga-bang", meaning: "Sac" }
    },
    {
      id: "c_n", char: "ㄴ", syllable: "나", name: "니은 (ni-eun)", roman: "n",
      frenchSound: "Comme le « N » français dans « nature »",
      mouthTip: "Langue derrière les dents du haut.",
      mnemonic: "Forme du nez de profil.",
      example: { word: "나라", roman: "na-ra", meaning: "Pays" }
    },
    {
      id: "c_d", char: "ㄷ", syllable: "다", name: "디귿 (di-geut)", roman: "d / t",
      frenchSound: "Entre « D » de « dos » et « T » doux",
      mouthTip: "Sans souffle d'air. Devient un vrai D entre deux voyelles.",
      mnemonic: "Forme d'une porte.",
      example: { word: "도시", roman: "do-si", meaning: "Ville" }
    },
    {
      id: "c_r", char: "ㄹ", syllable: "라", name: "리을 (ri-eul)", roman: "r / l",
      frenchSound: "Entre un « L » et un « R » battu léger (comme en espagnol)",
      mouthTip: "Jamais du fond de la gorge ! La pointe de la langue touche brièvement le palais. En fin de syllabe, c'est un L.",
      mnemonic: "Un ruisseau qui serpente.",
      example: { word: "라면", roman: "ra-myeon", meaning: "Ramen" }
    },
    {
      id: "c_m", char: "ㅁ", syllable: "마", name: "미음 (mi-eum)", roman: "m",
      frenchSound: "Comme le « M » dans « maman »",
      mouthTip: "Les deux lèvres jointes.",
      mnemonic: "Carré représentant la bouche.",
      example: { word: "물", roman: "mul", meaning: "Eau" }
    },
    {
      id: "c_b", char: "ㅂ", syllable: "바", name: "비읍 (bi-eup)", roman: "b / p",
      frenchSound: "Entre « B » de « bateau » et « P » doux",
      mouthTip: "Sans souffle fort. Vrai B entre deux voyelles.",
      mnemonic: "Un verre à moitié plein.",
      example: { word: "밥", roman: "bap", meaning: "Riz cuit / Repas" }
    },
    {
      id: "c_s", char: "ㅅ", syllable: "사", name: "시옷 (si-ot)", roman: "s (sh)",
      frenchSound: "Comme « S » de « sac », mais devient « ch/sh » doux devant ㅣ, ㅑ, ㅕ, ㅛ, ㅠ",
      mouthTip: "Ex: 사 = sa, mais 시 = shi (comme dans « sushi »).",
      mnemonic: "Sommet d'une montagne.",
      example: { word: "사람", roman: "sa-ram", meaning: "Personne / Être humain" }
    },
    {
      id: "c_ng", char: "ㅇ", syllable: "아", name: "이응 (i-eung)", roman: "muet / -ng",
      frenchSound: "Muet en début de syllabe ; « -ng » (comme « parking ») en fin de syllabe",
      mouthTip: "Sert de support obligatoire quand une syllabe commence par une voyelle (아, 오, 우).",
      mnemonic: "Rond = 0 son au début.",
      example: { word: "방", roman: "bang", meaning: "Chambre / Pièce" }
    },
    {
      id: "c_j", char: "ㅈ", syllable: "자", name: "지읒 (ji-eut)", roman: "j (dj)",
      frenchSound: "Comme « dj » dans « djembé » ou « jean »",
      mouthTip: "Ne se prononce pas comme le J français de « jardin », il y a une attaque « d » devant.",
      mnemonic: "Un toit sur ㅅ.",
      example: { word: "주스", roman: "ju-seu", meaning: "Jus" }
    },
    {
      id: "c_h", char: "ㅎ", syllable: "하", name: "히읗 (hi-eut)", roman: "h",
      frenchSound: "Comme le « H » expiré anglais dans « hello »",
      mouthTip: "Léger souffle d'air.",
      mnemonic: "Un chapeau sur une tête ronde.",
      example: { word: "학교", roman: "hak-gyo", meaning: "École" }
    }
  ],

  consonantsAdvanced: [
    {
      id: "c_ch", char: "ㅊ", syllable: "차", name: "치읓 (chi-eut)", roman: "ch (tch)",
      frenchSound: "Comme « tch » dans « tchao » avec un souffle franc",
      mouthTip: "Version aspirée de ㅈ.",
      mnemonic: "ㅈ avec une petite barre au sommet.",
      example: { word: "친구", roman: "chin-gu", meaning: "Ami(e)" }
    },
    {
      id: "c_k", char: "ㅋ", syllable: "카", name: "키읔 (ki-euk)", roman: "k",
      frenchSound: "« K » fort avec souffle d'air (comme « koala »)",
      mouthTip: "Version aspirée de ㄱ.",
      mnemonic: "ㄱ avec une barre supplémentaire.",
      example: { word: "커피", roman: "keo-pi", meaning: "Café" }
    },
    {
      id: "c_t", char: "ㅌ", syllable: "타", name: "티읕 (ti-eut)", roman: "t",
      frenchSound: "« T » fort et soufflé (comme « tigre »)",
      mouthTip: "Version aspirée de ㄷ.",
      mnemonic: "Ressemble à un E.",
      example: { word: "지하철", roman: "ji-ha-cheol", meaning: "Métro" }
    },
    {
      id: "c_p", char: "ㅍ", syllable: "파", name: "피읖 (pi-eup)", roman: "p",
      frenchSound: "« P » fort et soufflé (comme « papa »)",
      mouthTip: "Version aspirée de ㅂ.",
      mnemonic: "Ressemble à la lettre grecque Pi (π).",
      example: { word: "프랑스", roman: "peu-rang-seu", meaning: "France" }
    },
    {
      id: "c_kk", char: "ㄲ", syllable: "까", name: "쌍기역 (ssang-gi-yeok)", roman: "kk",
      frenchSound: "« K » très sec et tendu, sans aucun souffle",
      mouthTip: "Contractez la glotte avant de relâcher le son net.",
      mnemonic: "Double ㄱ.",
      example: { word: "토끼", roman: "to-kki", meaning: "Lapin" }
    },
    {
      id: "c_tt", char: "ㄸ", syllable: "따", name: "쌍디귿 (ssang-di-geut)", roman: "tt",
      frenchSound: "« T » sec et tendu, sans souffle",
      mouthTip: "Langue appuyée fermement derrière les dents.",
      mnemonic: "Double ㄷ.",
      example: { word: "딸기", roman: "ttal-gi", meaning: "Fraise" }
    },
    {
      id: "c_pp", char: "ㅃ", syllable: "빠", name: "쌍비읍 (ssang-bi-eup)", roman: "pp",
      frenchSound: "« P » sec et tendu (comme dans « oppa »)",
      mouthTip: "Lèvres serrées puis ouvertes sans souffle.",
      mnemonic: "Double ㅂ.",
      example: { word: "빵", roman: "ppang", meaning: "Pain" }
    },
    {
      id: "c_ss", char: "ㅆ", syllable: "싸", name: "쌍시옷 (ssang-si-ot)", roman: "ss",
      frenchSound: "« SS » très sifflant et appuyé",
      mouthTip: "Plus tendu que ㅅ.",
      mnemonic: "Double ㅅ.",
      example: { word: "비싸요", roman: "bi-ssa-yo", meaning: "C'est cher" }
    },
    {
      id: "c_jj", char: "ㅉ", syllable: "짜", name: "쌍지읒 (ssang-ji-eut)", roman: "jj (tch)",
      frenchSound: "« tch / dj » sec et tendu",
      mouthTip: "Sans souffle d'air.",
      mnemonic: "Double ㅈ.",
      example: { word: "진짜", roman: "jin-jja", meaning: "Vraiment" }
    }
  ]
};

// TRACÉ ET ORDRE DES TRAITS
const STROKE_ORDER_DATA = [
  {
    char: "ㄱ", syllable: "가", strokes: 1,
    steps: ["① Trait horizontal de gauche à droite, puis descente verticale sans lever le stylo (──┐)."],
    handwritingTip: "À la main, l'angle droit s'arrondit souvent en une courbe douce (comme un 7 sans barre)."
  },
  {
    char: "ㄴ", syllable: "나", strokes: 1,
    steps: ["① Descente verticale de haut en bas, puis virage vers la droite sans lever le stylo (└──)."],
    handwritingTip: "Écrit rapidement, ressemble à une parenthèse couchée en L arrondi."
  },
  {
    char: "ㄷ", syllable: "다", strokes: 2,
    steps: ["① Barre horizontale du haut (gauche → droite).", "② Puis un « ㄴ » en partant du coin haut gauche (descendre puis tourner à droite)."],
    handwritingTip: "Ne se trace JAMAIS en un seul trait de droite à gauche ! Toujours la barre du haut d'abord."
  },
  {
    char: "ㄹ", syllable: "라", strokes: 3,
    steps: ["① Tracer un « ㄱ » en haut.", "② Barre horizontale au milieu (gauche → droite).", "③ Terminer par un « ㄴ » en bas."],
    handwritingTip: "Attention : écrit vite à la main par les Coréens, ㄹ ressemble à un « Z » ou un « 3 » inversé !"
  },
  {
    char: "ㅁ", syllable: "마", strokes: 3,
    steps: ["① Trait vertical gauche (haut → bas).", "② Angle droit haut + droite (comme un ㄱ).", "③ Fermer le bas de gauche à droite."],
    handwritingTip: "Crucial : ne tracez pas un rond (ce serait ㅇ) ! On commence toujours par la barre verticale de gauche."
  },
  {
    char: "ㅂ", syllable: "바", strokes: 4,
    steps: ["① Barre verticale gauche (haut → bas).", "② Barre verticale droite (haut → bas).", "③ Barre horizontale du milieu (gauche → droite).", "④ Barre horizontale du bas (gauche → droite)."],
    handwritingTip: "Toujours les 2 piliers verticaux d'abord, puis les 2 barres horizontales."
  },
  {
    char: "ㅅ", syllable: "사", strokes: 2,
    steps: ["① Diagonale de haut en bas vers la gauche (↙).", "② Courte diagonale qui part du milieu vers le bas à droite (↘)."],
    handwritingTip: "Dans certaines polices d'ordinateur, le sommet dépasse un peu ; à la main, le 2e trait s'accroche au milieu du 1er."
  },
  {
    char: "ㅇ", syllable: "아", strokes: 1,
    steps: ["① Un cercle tracé dans le sens inverse des aiguilles d'une montre en partant du haut (↺)."],
    handwritingTip: "Simple cercle fermé."
  },
  {
    char: "ㅈ", syllable: "자", strokes: 2,
    steps: ["① Barre horizontale en haut + descente diagonale vers la gauche (comme un 7).", "② Diagonale vers le bas à droite (↘)."],
    handwritingTip: "À la main, le haut et la diagonale gauche se font en un seul mouvement fluide !"
  },
  {
    char: "ㅎ", syllable: "하", strokes: 3,
    steps: ["① Petit trait en tout haut (horizontal ou vertical).", "② Barre horizontale plus large juste en dessous.", "③ Le cercle « ㅇ » en bas."],
    handwritingTip: "Sur les enseignes, le chapeau du haut est parfois un trait vertical (┴) et parfois horizontal (二)."
  },
  {
    char: "ㅏ", syllable: "아", strokes: 2,
    steps: ["① Grande barre verticale de haut en bas (│).", "② Petit trait horizontal du milieu vers la droite (─)."],
    handwritingTip: "Règle absolue : toujours de haut en bas et de gauche à droite."
  },
  {
    char: "ㅓ", syllable: "어", strokes: 2,
    steps: ["① Petit trait horizontal de gauche à droite (─).", "② Grande barre verticale de haut en bas (│)."],
    handwritingTip: "Comme le petit trait est à gauche, on le trace EN PREMIER (gauche → droite) avant la barre verticale !"
  },
  {
    char: "ㅗ", syllable: "오", strokes: 2,
    steps: ["① Petit trait vertical du haut vers le bas (│).", "② Grande barre horizontale de gauche à droite (───)."],
    handwritingTip: "Le petit trait est plus haut, donc on le trace d'abord."
  },
  {
    char: "ㅜ", syllable: "우", strokes: 2,
    steps: ["① Grande barre horizontale de gauche à droite (───).", "② Petit trait vertical vers le bas (│)."],
    handwritingTip: "La barre horizontale est en haut, donc elle passe en premier."
  }
];

// RÈGLES DE PRONONCIATION
const READING_RULES = [
  {
    id: "rule_blocks",
    title: "1. Construction d'une syllabe (Les blocs carrés)",
    summary: "En coréen, on n'écrit jamais les lettres en ligne : chaque syllabe est un bloc de 2 à 4 lettres.",
    details: [
      "Tout bloc commence OBLIGATOIREMENT par une consonne en position 1. Si le son commence par une voyelle, on met le « ㅇ » muet (ex: 아 = a, 우 = ou).",
      "Avec une voyelle verticale (ㅏ, ㅓ, ㅣ, ㅐ, ㅔ), la voyelle se place à DROITE de la consonne : ㄱ + ㅏ = 가 (ga).",
      "Avec une voyelle horizontale (ㅗ, ㅜ, ㅡ), la voyelle se place EN DESSOUS de la consonne : ㄱ + ㅗ = 고 (go).",
      "La consonne finale éventuelle se place toujours tout en bas et s'appelle le Batchim (받침) : 한 (ㅎ+ㅏ+ㄴ)."
    ],
    examples: [
      { kr: "가", read: "ㄱ + ㅏ", fr: "ga (Consonne + Voyelle verticale)" },
      { kr: "고", read: "ㄱ + ㅗ", fr: "go (Consonne + Voyelle horizontale)" },
      { kr: "한", read: "ㅎ + ㅏ + ㄴ", fr: "han (Consonne + Voyelle + Batchim)" }
    ]
  },
  {
    id: "rule_batchim",
    title: "2. Le Batchim (받침) : Comment lire la consonne du bas",
    summary: "En fin de syllabe, les consonnes sont « coupées » (on ne relâche pas d'air). Il n'existe que 7 sons finaux !",
    details: [
      "Son [k] sec : ㄱ, ㅋ, ㄲ en bas se lisent tous comme un « k » bloqué -> 국 (guk), 부엌 (bu-eok).",
      "Son [t] sec : ㄷ, ㅌ, ㅅ, ㅆ, ㅈ, ㅊ, ㅎ en bas se lisent TOUS comme un « t » bloqué ! -> 옷 (ot = vêtement), 꽃 (kkot = fleur), 있다 (it-tta).",
      "Son [p] sec : ㅂ, ㅍ en bas se lisent comme un « p » lèvres fermées -> 밥 (bap = riz/repas).",
      "Sons nasaux et liquides : ㄴ = [n] (안), ㅁ = [m] (봄), ㅇ = [-ng] (방), ㄹ = [l] (물 = mul)."
    ],
    examples: [
      { kr: "밥", read: "[밥 - bap]", fr: "Riz / Repas (le ㅂ final ferme les lèvres)" },
      { kr: "옷", read: "[옫 - ot]", fr: "Vêtement (le ㅅ en bas devient un T sec !)" },
      { kr: "꽃", read: "[꼳 - kkot]", fr: "Fleur (le ㅊ en bas devient aussi un T sec !)" }
    ]
  },
  {
    id: "rule_liaison",
    title: "3. La règle d'or de la Liaison (연음화)",
    summary: "Comme en français (« les amis » -> lé-z-amis), la consonne du bas saute sur la syllabe suivante si elle commence par le ㅇ muet !",
    details: [
      "Quand une syllabe finit par un Batchim (sauf ㅇ) et que la syllabe suivante commence par ㅇ (voyelle), la consonne du bas remonte pour se prononcer normalement avec la voyelle suivante.",
      "C'est pour cela que « 한국어 » (langue coréenne) s'écrit 한-국-어 mais se prononce [한구거 / han-gu-geo] !",
      "De même, « 먹어요 » (je mange) s'écrit 먹-어-요 mais se prononce [머거요 / meo-geo-yo]."
    ],
    examples: [
      { kr: "한국어", read: "[한구거 - han-gu-geo]", fr: "Langue coréenne (le ㄱ de 국 saute sur 어)" },
      { kr: "먹어요", read: "[머거요 - meo-geo-yo]", fr: "Manger (le ㄱ de 먹 saute sur 어)" },
      { kr: "있어요", read: "[이써요 - i-sseo-yo]", fr: "Il y a / Avoir (le ㅆ de 있 saute sur 어)" }
    ]
  }
];

// ==========================================
// GRAMMAIRE NIVEAU 1 (A1 - FONDATIONS)
// ==========================================
const GRAMMAR_LESSONS = [
  {
    id: "gram_1",
    level: "Base 1",
    title: "La structure de phrase coréenne (S-O-V) & les Particules",
    subtitle: "Pourquoi le coréen fonctionne comme un jeu de Lego logique",
    formula: "Sujet + [Particule]  +  Objet + [Particule]  +  Verbe (TOUJOURS à la fin)",
    explanation: `En français, on dit : <strong>Je (Sujet) mange (Verbe) une pomme (Objet)</strong>.<br>
En coréen, <strong>le verbe se place toujours tout à la fin de la phrase</strong> : on dit <em>« Je + pomme + mange »</em>.<br><br>
De plus, en coréen, on colle des petits marqueurs appelés <strong>particules</strong> juste après chaque nom pour indiquer son rôle.`,
    keyPoints: [
      "Le verbe (ou l'adjectif) est le roi de la phrase : il est TOUJOURS le dernier mot.",
      "Il n'y a ni genre, ni articles, ni conjugaison selon la personne (je, tu, il utilisent la même forme !).",
      "Si le sujet est évident, les Coréens l'omettent tout simplement."
    ],
    examples: [
      {
        kr: "저는 사과를 먹어요.",
        roman: "Jeo-neun sa-gwa-reul meo-geo-yo.",
        fr: "Je mange une pomme.",
        breakdown: [
          { part: "저", role: "Pronom", meaning: "Je (poli)" },
          { part: "는", role: "Particule Thème", meaning: "Quant à moi" },
          { part: "사과", role: "Nom", meaning: "Pomme" },
          { part: "를", role: "Particule Objet", meaning: "(marque l'objet)" },
          { part: "먹어요", role: "Verbe final", meaning: "mange" }
        ]
      }
    ]
  },
  {
    id: "gram_2",
    level: "Base 2",
    title: "Le verbe « Être » : 이에요 (i-e-yo) / 예요 (ye-yo)",
    subtitle: "Se présenter et dire « C'est un... / Je suis... »",
    formula: "Nom (avec Batchim) + 이에요   |   Nom (sans Batchim) + 예요",
    explanation: `En coréen, le verbe « être » (<strong>이다</strong>) se colle directement à la fin du nom :<br>
• Si le nom se termine par une <strong>consonne (Batchim)</strong> → on ajoute <strong>이에요</strong>.<br>
• Si le nom se termine par une <strong>voyelle (sans Batchim)</strong> → on ajoute <strong>예요</strong>.`,
    keyPoints: [
      "Avec Batchim : 학생 (étudiant) → 학생이에요.",
      "Sans Batchim : 의사 (médecin) → 의사예요.",
      "Négation « Ne pas être » : 아니에요 (ex: 학생이 아니에요)."
    ],
    examples: [
      {
        kr: "저는 학생이에요. 저는 의사예요.",
        roman: "Jeo-neun hak-saeng-i-e-yo. Jeo-neun ui-sa-ye-yo.",
        fr: "Je suis étudiant(e). Je suis médecin.",
        breakdown: [
          { part: "학생이에요", role: "Batchim ㅇ", meaning: "suis étudiant" },
          { part: "의사예요", role: "Voyelle ㅏ", meaning: "suis médecin" }
        ]
      }
    ]
  },
  {
    id: "gram_3",
    level: "Base 3",
    title: "Les Particules de Thème (은/는) et de Sujet (이/가)",
    subtitle: "Comprendre la différence entre 은/는 et 이/가",
    formula: "Thème : Consonne + 은 / Voyelle + 는   |   Sujet : Consonne + 이 / Voyelle + 가",
    explanation: `<strong>1. 은 / 는 (Particule de Thème / Contraste)</strong> : <em>« En ce qui concerne X... / Quant à X... »</em>.<br>
<strong>2. 이 / 가 (Particule de Sujet grammatical)</strong> : met le projecteur sur le sujet précis d'un état (adjectif) ou avec 있어요/없어요.`,
    keyPoints: [
      "Consonne + 은 / Voyelle + 는.",
      "Avec les adjectifs descriptifs (c'est bon, c'est cher) → 이/가."
    ],
    examples: [
      {
        kr: "커피가 맛있어요.",
        roman: "Keo-pi-ga ma-si-sseo-yo.",
        fr: "Le café est délicieux.",
        breakdown: [
          { part: "커피가", role: "Sujet", meaning: "Le café" },
          { part: "맛있어요", role: "Adjectif", meaning: "est délicieux" }
        ]
      }
    ]
  },
  {
    id: "gram_4",
    level: "Base 4",
    title: "La Particule d'Objet (을 / 를) : Action sur quelque chose",
    subtitle: "Manger, boire, regarder quelque chose",
    formula: "Nom (avec Batchim) + 을 (eul)   |   Nom (sans Batchim) + 를 (reul)",
    explanation: `Dès qu'un verbe d'action porte sur un objet direct, on colle la particule d'objet <strong>을</strong> ou <strong>를</strong>.`,
    keyPoints: [
      "Consonne finale -> 을 (밥을, 물을) ; Voyelle finale -> 를 (커피를, 한국어를)."
    ],
    examples: [
      {
        kr: "한국어를 공부해요.",
        roman: "Han-gu-geo-reul gong-bu-hae-yo.",
        fr: "J'étudie le coréen.",
        breakdown: [
          { part: "한국어를", role: "Objet direct", meaning: "le coréen" },
          { part: "공부해요", role: "Verbe", meaning: "j'étudie" }
        ]
      }
    ]
  },
  {
    id: "gram_5",
    level: "Base 5",
    title: "Conjuguer au Présent Poli : -아요 / -어요 / -해요",
    subtitle: "La règle universelle du style poli courant (해요체)",
    formula: "Voyelle ㅏ ou ㅗ → +아요   |   Autre voyelle → +어요   |   Verbe en 하다 → 해요",
    explanation: `1️⃣ Voyelle <strong>ㅏ</strong> ou <strong>ㅗ</strong> → <strong>-아요</strong> (가다 → <strong>가요</strong>).<br>
2️⃣ Autre voyelle → <strong>-어요</strong> (먹다 → <strong>먹어요</strong>).<br>
3️⃣ Verbe en <strong>하다</strong> → <strong>해요</strong> (공부하다 → <strong>공부해요</strong>).`,
    keyPoints: [
      "La même forme s'applique pour toutes les personnes."
    ],
    examples: [
      {
        kr: "가요, 먹어요, 공부해요.",
        roman: "ga-yo, meo-geo-yo, gong-bu-hae-yo.",
        fr: "Je vais, je mange, j'étudie.",
        breakdown: [
          { part: "가요", role: "ㅏ + 아요", meaning: "vais" },
          { part: "먹어요", role: "ㅓ + 어요", meaning: "mange" }
        ]
      }
    ]
  },
  {
    id: "gram_6",
    level: "Base 6",
    title: "Lieu & Destination : 에 (Destination/Présence) vs 에서 (Action)",
    subtitle: "Aller à un endroit vs Agir dans un endroit",
    formula: "Lieu + 에 (Aller/Être)   |   Lieu + 에서 (Faire une action dans le lieu)",
    explanation: `<strong>1. 에</strong> : destination avec 가요 (aller), 와요 (venir) ou présence avec 있어요 (être là).<br>
<strong>2. 에서</strong> : lieu où l'on effectue une action (manger, étudier, acheter).`,
    keyPoints: [
      "가요, 와요, 있어요 → 에.",
      "Action active (manger, étudier) → 에서."
    ],
    examples: [
      {
        kr: "학교에 가요. 식당에서 밥을 먹어요.",
        roman: "Hak-gyo-e ga-yo. Sik-ttang-e-seo ba-beul meo-geo-yo.",
        fr: "Je vais à l'école. Je mange au restaurant.",
        breakdown: [
          { part: "학교에", role: "Destination", meaning: "à l'école" },
          { part: "식당에서", role: "Lieu d'action", meaning: "au restaurant" }
        ]
      }
    ]
  },
  {
    id: "gram_7",
    level: "Base 7",
    title: "Avoir / Il y a (있어요 / 없어요) & La Négation (안)",
    subtitle: "Possession, présence et dire « ne pas »",
    formula: "Nom + 이/가 있어요 (J'ai / Il y a)   |   안 + Verbe (Ne pas + verbe)",
    explanation: `Le verbe « avoir » et « il y a » : <strong>있다 → 있어요</strong> (opposé : <strong>없어요</strong>).<br>
Pour nier un verbe, placez <strong>안</strong> juste devant : <strong>안 가요</strong> (je ne vais pas).`,
    keyPoints: [
      "Verbes en Nom + 해요 : 안 se place entre les deux (공부 안 해요)."
    ],
    examples: [
      {
        kr: "시간이 있어요. 오늘 안 가요.",
        roman: "Si-ga-ni i-sseo-yo. O-neul an ga-yo.",
        fr: "J'ai du temps. Aujourd'hui, je n'y vais pas.",
        breakdown: [
          { part: "시간이 있어요", role: "Possession", meaning: "J'ai du temps" },
          { part: "안 가요", role: "Négation", meaning: "ne vais pas" }
        ]
      }
    ]
  },
  {
    id: "gram_8",
    level: "Base 8 • Connecteurs",
    title: "Les « Mots-Ponts » : 하고, -고, -지만, -아서/어서",
    subtitle: "Relier des phrases (« avec », « et », « mais », « donc »)",
    formula: "Nom + 하고 (et/avec)  |  Radical + 고 (et)  |  Radical + 지만 (mais)  |  -아서/어서 (donc/parce que)",
    explanation: `1️⃣ <strong>Nom + 하고 / -(이)랑</strong> = « et / avec » entre deux noms.<br>
2️⃣ <strong>Radical + -고</strong> = « et / puis » entre deux verbes.<br>
3️⃣ <strong>Radical + -지만</strong> = « mais » (비싸지만 = c'est cher, mais...).<br>
4️⃣ <strong>-아서/어서</strong> = « parce que / donc » (맛있어서 = parce que c'est bon).`,
    keyPoints: [
      "Avec -고 et -지만 : enlevez simplement -다 et collez le connecteur."
    ],
    examples: [
      {
        kr: "비싸지만 맛있어요!",
        roman: "Bi-ssa-ji-man ma-si-sseo-yo!",
        fr: "C'est cher, mais c'est délicieux !",
        breakdown: [
          { part: "비싸지만", role: "Connecteur mais", meaning: "c'est cher mais" },
          { part: "맛있어요", role: "Verbe final", meaning: "c'est bon" }
        ]
      }
    ]
  },
  {
    id: "gram_9",
    level: "Base 9 • Politesse",
    title: "Les 3 Niveaux de Politesse : Formel (-습니다), Poli (-요), Banmal (반말)",
    subtitle: "Comprendre la hiérarchie sociale coréenne",
    formula: "Formel : -ㅂ니다/습니다  |  Poli : -아요/어요  |  Banmal : sans -요",
    explanation: `🏛️ <strong>Formel (-습니다)</strong> : cadre officiel, armée, annonces.<br>
🤝 <strong>Poli (-아요/어요)</strong> : vie quotidienne normale (recommandé !).<br>
🏠 <strong>Banmal (반말)</strong> : amis intimes du même âge, enfants, couple.`,
    keyPoints: [
      "Dans le doute, utilisez TOUJOURS le niveau en -요 !",
      "Pour passer en Banmal, on retire simplement « 요 » à la fin."
    ],
    examples: [
      {
        kr: "감사합니다 (Formel) / 고마워요 (Poli) / 고마워 (Banmal)",
        roman: "Gam-sa-ham-ni-da / Go-ma-wo-yo / Go-ma-wo",
        fr: "Merci (Formel) / Merci (Poli) / Merci (Familier)",
        breakdown: [
          { part: "감사합니다", role: "Formel", meaning: "Merci" },
          { part: "고마워요", role: "Poli", meaning: "Merci" },
          { part: "고마워", role: "Banmal", meaning: "Merci" }
        ]
      }
    ]
  }
];

// ==========================================
// GRAMMAIRE NIVEAU 2 (A2 - INTERMÉDIAIRE)
// ==========================================
const LEVEL2_GRAMMAR = [
  {
    id: "g2_1",
    level: "A2 • Capacité",
    title: "Pouvoir / Ne pas pouvoir : -(으)ㄹ 수 있어요 / 없어요",
    subtitle: "Exprimer ses capacités physiques ou matérielles",
    formula: "Sans Batchim + ㄹ 수 있어요   |   Avec Batchim + 을 수 있어요",
    explanation: `Pour dire que vous <em>pouvez</em> faire quelque chose (j'ai la compétence ou la possibilité), collez <strong>-(으)ㄹ 수 있어요</strong> au radical.<br>
Pour dire que vous <em>ne pouvez pas</em> (incapacité ou empêchement), utilisez <strong>-(으)ㄹ 수 없어요</strong> (ou le mot court <strong>못 + verbe</strong>).<br><br>
• Sans Batchim : 가다 → <strong>갈 수 있어요</strong> (Je peux y aller) ; 하다 → <strong>할 수 있어요</strong> (Je peux le faire).<br>
• Avec Batchim : 먹다 → <strong>먹을 수 있어요</strong> (Je peux manger) ; 읽다 → <strong>읽을 수 있어요</strong> (Je peux lire).`,
    keyPoints: [
      "Le verbe 'faire' devient 할 수 있어요 (I can do it / Yes we can !).",
      "Pour dire 'Je ne peux pas manger de viande' : 고기를 먹을 수 없어요 (ou 못 먹어요)."
    ],
    examples: [
      {
        kr: "한국어를 할 수 있어요.",
        roman: "Han-gu-geo-reul hal su i-sseo-yo.",
        fr: "Je peux parler (faire) coréen.",
        breakdown: [
          { part: "한국어를", role: "Objet", meaning: "le coréen" },
          { part: "할 수 있어요", role: "하다 + ㄹ 수 있어요", meaning: "peux faire" }
        ]
      },
      {
        kr: "매운 음식을 먹을 수 없어요.",
        roman: "Mae-un eum-si-geul meo-geul su eop-seo-yo.",
        fr: "Je ne peux pas manger de nourriture épicée.",
        breakdown: [
          { part: "매운 음식", role: "Nom", meaning: "nourriture épicée" },
          { part: "먹을 수 없어요", role: "먹다 + 을 수 없어요", meaning: "ne peux pas manger" }
        ]
      }
    ]
  },
  {
    id: "g2_2",
    level: "A2 • Obligation",
    title: "Devoir / Obligation : -아야/어야 돼요 (해요)",
    subtitle: "Dire « Il faut que je... / Je dois absolument... »",
    formula: "Forme -아요 (sans 요) + 돼요   |   Forme -어요 (sans 요) + 돼요   |   하다 → 해야 돼요",
    explanation: `C'est l'une des structures les plus utilisées au quotidien. On prend la forme normale du présent en <strong>-아요/어요</strong>, on retire le <strong>요</strong> final, et on colle <strong>돼요</strong> (ou <strong>해요</strong>) !<br><br>
• 가요 → <strong>가야 돼요</strong> (Je dois y aller / Il faut partir).<br>
• 먹어요 → <strong>먹어야 돼요</strong> (Je dois manger).<br>
• 공부해요 → <strong>공부해야 돼요</strong> (Je dois étudier).`,
    keyPoints: [
      "돼요 vient du verbe 되다 (marcher, fonctionner, convenir). Littéralement : 'Il faut faire X pour que ça convienne'.",
      "Au passé : 가야 됐어요 (J'ai dû partir)."
    ],
    examples: [
      {
        kr: "지금 집에 가야 돼요.",
        roman: "Ji-geum ji-be ga-ya dwae-yo.",
        fr: "Maintenant, je dois rentrer à la maison.",
        breakdown: [
          { part: "지금", role: "Temps", meaning: "maintenant" },
          { part: "집에", role: "Lieu", meaning: "à la maison" },
          { part: "가야 돼요", role: "Obligation", meaning: "dois aller" }
        ]
      },
      {
        kr: "내일 시험이 있어서 공부해야 돼요.",
        roman: "Nae-il si-heo-mi i-sseo-seo gong-bu-hae-ya dwae-yo.",
        fr: "Comme j'ai un examen demain, je dois étudier.",
        breakdown: [
          { part: "시험이 있어서", role: "Cause", meaning: "parce qu'il y a un examen" },
          { part: "공부해야 돼요", role: "Obligation", meaning: "dois étudier" }
        ]
      }
    ]
  },
  {
    id: "g2_3",
    level: "A2 • Présent Continu",
    title: "Action en cours : Radical + -고 있어요",
    subtitle: "L'équivalent de « être en train de faire » (anglais -ing)",
    formula: "Radical de verbe + -고 있어요",
    explanation: `Très facile ! Il n'y a AUCUNE fusion de voyelle : prenez l'infinitif, retirez <strong>-다</strong> et collez directement <strong>-고 있어요</strong>.<br><br>
• 먹다 → <strong>먹고 있어요</strong> (Je suis en train de manger).<br>
• 보다 → <strong>보고 있어요</strong> (Je suis en train de regarder).<br>
• 자다 → <strong>자고 있어요</strong> (Je suis en train de dormir).<br>
• 일하다 → <strong>일하고 있어요</strong> (Je suis en train de travailler).`,
    keyPoints: [
      "À la question '지금 뭐 해요?' (Que fais-tu maintenant ?), répondre avec -고 있어요 sonne immédiatement très naturel !",
      "Au passé continu : 먹고 있었어요 (J'étais en train de manger)."
    ],
    examples: [
      {
        kr: "지금 넷플릭스를 보고 있어요.",
        roman: "Ji-geum net-peul-lik-seu-reul bo-go i-sseo-yo.",
        fr: "Je suis en train de regarder Netflix maintenant.",
        breakdown: [
          { part: "보고 있어요", role: "보다 + 고 있어요", meaning: "en train de regarder" }
        ]
      }
    ]
  },
  {
    id: "g2_4",
    level: "A2 • Requête & Politesse",
    title: "Demande polie / Requête : -(으)세요",
    subtitle: "Demander gentiment à quelqu'un de faire quelque chose (« Veuillez faire... »)",
    formula: "Sans Batchim + -세요   |   Avec Batchim + -으세요",
    explanation: `Quand vous vous adressez à quelqu'un et voulez lui dire poliment « faites ceci s'il vous plaît » ou « allez-y » :<br><br>
• Sans Batchim : 가다 → <strong>가세요</strong> (Allez-y / Passez bonne route) ; 오다 → <strong>오세요</strong> (Venez / Entrez).<br>
• Avec Batchim : 앉다 (s'asseoir) → <strong>앉으세요</strong> (Asseyez-vous SVP) ; 읽다 → <strong>읽으세요</strong> (Lisez SVP).<br><br>
💡 C'est exactement cette formule qu'on retrouve dans <strong>안녕하세요</strong> (Soyez en paix) et <strong>어서 오세요</strong> (Soyez le bienvenu) !`,
    keyPoints: [
      "Attention aux verbes honorifiques spéciaux : 먹다 devient 드시다 → 드세요 (Mangez SVP / Bon appétit !)."
    ],
    examples: [
      {
        kr: "여기에 앉으세요.",
        roman: "Yeo-gi-e an-jeu-se-yo.",
        fr: "Asseyez-vous ici, s'il vous plaît.",
        breakdown: [
          { part: "여기에", role: "Lieu", meaning: "ici" },
          { part: "앉으세요", role: "앉다 + 으세요", meaning: "asseyez-vous SVP" }
        ]
      },
      {
        kr: "맛있게 드세요!",
        roman: "Ma-sit-ge deu-se-yo!",
        fr: "Bon appétit ! (Mangez délicieusement)",
        breakdown: [
          { part: "드세요", role: "Honorifique de 먹다", meaning: "mangez SVP" }
        ]
      }
    ]
  },
  {
    id: "g2_5",
    level: "A2 • Interdiction",
    title: "L'Interdiction : Radical + -지 마세요",
    subtitle: "Dire poliment « Ne faites pas cela »",
    formula: "Radical de verbe + -지 마세요",
    explanation: `Pour formuler une interdiction polie (« Ne partez pas », « Ne touchez pas », « Ne vous inquiétez pas »), enlevez <strong>-다</strong> et collez <strong>-지 마세요</strong>.<br><br>
• 가다 → <strong>가지 마세요</strong> (Ne partez pas).<br>
• 먹다 → <strong>먹지 마세요</strong> (Ne mangez pas ça).<br>
• 걱정하다 (s'inquiéter) → <strong>걱정하지 마세요</strong> (Ne vous inquiétez pas !).`,
    keyPoints: [
      "En Banmal (entre amis) : -지 마 ! (ex: 가지 마 = Ne t'en va pas ! - grand classique de K-Drama).",
      "Aucune irrégularité de voyelle : se colle directement sur le radical."
    ],
    examples: [
      {
        kr: "걱정하지 마세요. 다 괜찮아요.",
        roman: "Geok-jeong-ha-ji ma-se-yo. Da gwaen-cha-na-yo.",
        fr: "Ne vous inquiétez pas. Tout va bien.",
        breakdown: [
          { part: "걱정하지 마세요", role: "Interdiction", meaning: "ne vous inquiétez pas" },
          { part: "다 괜찮아요", role: "Phrase", meaning: "tout va bien" }
        ]
      }
    ]
  },
  {
    id: "g2_6",
    level: "A2 • Cause",
    title: "Cause & Raison : -(으)니까 vs -아서/어서",
    subtitle: "Exprimer la justification (« Puisque... / Vu que... »)",
    formula: "Radical (sans Batchim) + 니까   |   Radical (avec Batchim) + 으니까",
    explanation: `En coréen, il y a deux façons majeures d'exprimer la cause :<br><br>
1️⃣ <strong>-아서/어서</strong> : cause factuelle et neutre (ex: 배고파서 밥을 먹어요 = J'ai faim donc je mange).<br>
2️⃣ <strong>-(으)니까</strong> : cause subjective / invitation / ordre : <em>« Vu que X, faisons Y ! »</em>.<br>
• 비가 오니까 우산을 쓰세요 = <em>Vu qu'il pleut, prenez un parapluie !</em><br>
• 시간이 없으니까 빨리 가요 = <em>Puisqu'on n'a pas le temps, allons-y vite !</em>`,
    keyPoints: [
      "Règle d'or : Devant une suggestion (-(으)세요 ou -(으)ㅂ시다), on NE PEUT PAS utiliser -아서/어서 ! On doit TOUJOURS utiliser -(으)니까.",
      "날씨가 좋으니까 밖에 나가요 (Comme il fait beau, sortons !)."
    ],
    examples: [
      {
        kr: "비가 오니까 택시를 타요.",
        roman: "Bi-ga o-ni-kka taek-si-reul ta-yo.",
        fr: "Puisqu'il pleut, prenons le taxi.",
        breakdown: [
          { part: "비가 오니까", role: "Cause avec 니까", meaning: "vu qu'il pleut" },
          { part: "택시를 타요", role: "Action", meaning: "prenons le taxi" }
        ]
      }
    ]
  }
];

// ==========================================
// SIMULATEUR DES VERBES IRRÉGULIERS (D, B, S, EU, REU)
// ==========================================
const IRREGULAR_VERBS = [
  {
    type: "Irrégulier en ㄷ (ㄷ → ㄹ)",
    rule: "Quand le Batchim ㄷ rencontre une voyelle, il se transforme en ㄹ ! (Devant une consonne, il reste ㄷ).",
    verbs: [
      {
        infinitive: "듣다", meaning: "Écouter / Entendre",
        present: "들어요", past: "들었어요", future: "들을 거예요",
        note: "듣 + 어요 → le ㄷ devient ㄹ → 들어요 (음악을 들어요 = J'écoute de la musique)."
      },
      {
        infinitive: "걷다", meaning: "Marcher",
        present: "걸어요", past: "걸었어요", future: "걸을 거예요",
        note: "걷 + 어요 → 걸어요 (공원에서 걸어요 = Je marche dans le parc)."
      },
      {
        infinitive: "받다 (Régulier !)", meaning: "Recevoir (Piège)",
        present: "받아요", past: "받았어요", future: "받을 거예요",
        note: "Attention : 받다 et 닫다 (fermer) sont RÉGULIERS ! Le ㄷ ne change pas."
      }
    ]
  },
  {
    type: "Irrégulier en ㅂ (ㅂ → 우/워)",
    rule: "Sur la plupart des adjectifs, le Batchim ㅂ disparaît et devient 우 + 어요 = 워요.",
    verbs: [
      {
        infinitive: "춥다", meaning: "Faire froid",
        present: "추워요", past: "추웠어요", future: "추울 거예요",
        note: "춥 + 어요 → ㅂ devient 우 → 추워요."
      },
      {
        infinitive: "덥다", meaning: "Faire chaud",
        present: "더워요", past: "더웠어요", future: "더울 거예요",
        note: "더워요 (Il fait chaud)."
      },
      {
        infinitive: "어렵다", meaning: "Être difficile",
        present: "어려워요", past: "어려웠어요", future: "어려울 거예요",
        note: "한국어가 어려워요 (Le coréen est difficile)."
      },
      {
        infinitive: "돕다", meaning: "Aider (Exception en 오)",
        present: "도와요", past: "도왔어요", future: "도울 거예요",
        note: "Exception : 돕다 et 곱다 deviennent 와요 au présent (도와주세요 = Aidez-moi SVP !)."
      }
    ]
  },
  {
    type: "Irrégulier en ㅅ (ㅅ disparaît)",
    rule: "Le Batchim ㅅ disparaît complètement devant une voyelle, mais sans fusionner les voyelles.",
    verbs: [
      {
        infinitive: "낫다", meaning: "Guérir / Être meilleur",
        present: "나아요", past: "나았어요", future: "나을 거예요",
        note: "낫 + 아요 → le ㅅ saute → 나아요 (감기 다 나았어요 = Mon rhume a guéri)."
      },
      {
        infinitive: "짓다", meaning: "Construire / Faire cuire (du riz)",
        present: "지어요", past: "지었어요", future: "지을 거예요",
        note: "짓 + 어요 → le ㅅ saute → 지어요 (밥을 지어요 = Je prépare le riz)."
      },
      {
        infinitive: "웃다 (Régulier !)", meaning: "Rire / Sourire (Piège)",
        present: "웃어요", past: "웃었어요", future: "웃을 거예요",
        note: "웃다 et 씻다 (se laver) sont RÉGULIERS : 웃어요, 씻어요."
      }
    ]
  },
  {
    type: "Irrégulier en ㅡ (ㅡ s'efface)",
    rule: "Quand le radical se termine par ㅡ, la voyelle ㅡ s'efface et prend la couleur de la voyelle précédente.",
    verbs: [
      {
        infinitive: "크다", meaning: "Être grand",
        present: "커요", past: "컸어요", future: "클 거예요",
        note: "크 + 어요 → le ㅡ saute → 커요."
      },
      {
        infinitive: "쓰다", meaning: "Écrire / Utiliser / Être amer",
        present: "써요", past: "썼어요", future: "쓸 거예요",
        note: "쓰 + 어요 → 써요 (편지를 써요 = J'écris une lettre)."
      },
      {
        infinitive: "바쁘다", meaning: "Être occupé",
        present: "바빠요", past: "바빴어요", future: "바쁠 거예요",
        note: "바쁘 + 아요 → la voyelle avant ㅡ est ㅏ → 바빠요 !"
      },
      {
        infinitive: "예쁘다", meaning: "Être joli(e)",
        present: "예뻐요", past: "예뻤어요", future: "예쁠 거예요",
        note: "예쁘 + 어요 → la voyelle avant ㅡ est ㅔ → 예뻐요 !"
      }
    ]
  },
  {
    type: "Irrégulier en 르 (ㄹㄹ)",
    rule: "Le ㅡ s'efface et un double ㄹ apparaît : un en bas de la syllabe d'avant, et un au début de la suivante !",
    verbs: [
      {
        infinitive: "빠르다", meaning: "Être rapide",
        present: "빨라요", past: "빨랐어요", future: "빠를 거예요",
        note: "빠르 + 아요 → 빠 + ㄹ + 라요 = 빨라요 !"
      },
      {
        infinitive: "모르다", meaning: "Ne pas savoir / Ignorer",
        present: "몰라요", past: "몰랐어요", future: "모를 거예요",
        note: "모르 + 아요 → 몰라요 ! (잘 몰라요 = Je ne sais pas bien)."
      },
      {
        infinitive: "부르다", meaning: "Appeler / Chanter / Être rassasié",
        present: "불러요", past: "불렀어요", future: "부를 거예요",
        note: "노래를 불러요 = Je chante une chanson ; 배불러요 = J'ai le ventre plein."
      }
    ]
  }
];

// ==========================================
// EXPLORATEUR DE RACINES HANJA (LE CHEAT CODE DU VOCABULAIRE)
// ==========================================
const HANJA_ROOTS = [
  {
    hanja: "學",
    hangul: "학",
    roman: "hak",
    meaning: "Étudier, Apprendre, Science",
    mnemonic: "Imaginez un enfant avec un cartable qui apprend.",
    words: [
      { kr: "학생", hanja: "學生", roman: "hak-saeng", fr: "Étudiant (학 étude + 생 personne)", audio: "학생" },
      { kr: "학교", hanja: "學校", roman: "hak-gyo", fr: "École (학 étude + 교 bâtiment scolaire)", audio: "학교" },
      { kr: "학원", hanja: "學院", roman: "hag-won", fr: "Institut privé / Cours du soir", audio: "학원" },
      { kr: "방학", hanja: "放學", roman: "bang-hak", fr: "Vacances scolaires (방 libérer + 학 étude)", audio: "방학" },
      { kr: "대학교", hanja: "大學校", roman: "dae-hak-gyo", fr: "Université (대 grand + 학교 école)", audio: "대학교" }
    ]
  },
  {
    hanja: "室",
    hangul: "실",
    roman: "sil",
    meaning: "Pièce, Salle, Chambre",
    mnemonic: "Un espace fermé sous un toit.",
    words: [
      { kr: "화장실", hanja: "化粧室", roman: "hwa-jang-sil", fr: "Toilettes (화장 se faire beau + 실 pièce)", audio: "화장실" },
      { kr: "교실", hanja: "敎室", roman: "gyo-sil", fr: "Salle de classe (교 enseigner + 실 pièce)", audio: "교실" },
      { kr: "사무실", hanja: "事務室", roman: "sa-mu-sil", fr: "Bureau (사무 travail de bureau + 실 pièce)", audio: "사무실" },
      { kr: "지하실", hanja: "地下室", roman: "ji-ha-sil", fr: "Sous-sol / Cave (지하 sous-terre + 실)", audio: "지하실" },
      { kr: "응급실", hanja: "應急室", roman: "eung-geup-sil", fr: "Urgences de l'hôpital (응급 secours urgent + 실)", audio: "응급실" }
    ]
  },
  {
    hanja: "人",
    hangul: "인",
    roman: "in",
    meaning: "Personne, Humain, Être",
    mnemonic: "Un bonhomme debout sur ses deux jambes.",
    words: [
      { kr: "한국인", hanja: "韓國人", roman: "han-gu-gin", fr: "Coréen (한국 Corée + 인 personne)", audio: "한국인" },
      { kr: "프랑스인", hanja: "프랑스人", roman: "peu-rang-seu-in", fr: "Français (프랑스 + 인)", audio: "프랑스인" },
      { kr: "외국인", hanja: "外國人", roman: "oe-gu-gin", fr: "Étranger (외 extérieur + 국 pays + 인 personne)", audio: "외국인" },
      { kr: "인기", hanja: "人氣", roman: "in-gi", fr: "Popularité (인 gens + 기 énergie/souffle)", audio: "인기" },
      { kr: "개인", hanja: "個人", roman: "gae-in", fr: "Individu / Personnel", audio: "개인" }
    ]
  },
  {
    hanja: "食",
    hangul: "식",
    roman: "sik",
    meaning: "Manger, Nourriture, Repas",
    mnemonic: "Un bol fumant prêt à être consommé.",
    words: [
      { kr: "음식", hanja: "飮食", roman: "eum-sik", fr: "Nourriture (음 boisson + 식 aliment)", audio: "음식" },
      { kr: "식당", hanja: "食堂", roman: "sik-ttang", fr: "Restaurant (식 repas + 당 salle)", audio: "식당" },
      { kr: "한식", hanja: "韓食", roman: "han-sik", fr: "Cuisine coréenne (한 Corée + 식 cuisine)", audio: "한식" },
      { kr: "식사", hanja: "食事", roman: "sik-sa", fr: "Repas (faire un repas)", audio: "식사" },
      { kr: "간식", hanja: "間食", roman: "gan-sik", fr: "En-cas / Goûter (간 entre-temps + 식 repas)", audio: "간식" }
    ]
  },
  {
    hanja: "話",
    hangul: "화",
    roman: "hwa",
    meaning: "Parler, Parole, Discussion",
    mnemonic: "Des paroles qui sortent de la bouche.",
    words: [
      { kr: "전화", hanja: "電話", roman: "jeon-hwa", fr: "Téléphone (전 électricité + 화 parole)", audio: "전화" },
      { kr: "대화", hanja: "對話", roman: "dae-hwa", fr: "Conversation / Dialogue (대 face à face + 화)", audio: "대화" },
      { kr: "화제", hanja: "話題", roman: "hwa-je", fr: "Sujet de conversation", audio: "화제" },
      { kr: "통화", hanja: "通話", roman: "tong-hwa", fr: "Appel téléphonique (être au téléphone)", audio: "통화" }
    ]
  },
  {
    hanja: "動",
    hangul: "동",
    roman: "dong",
    meaning: "Bouger, Mouvement, Action",
    mnemonic: "Une force lourde mise en mouvement.",
    words: [
      { kr: "운동", hanja: "運動", roman: "un-dong", fr: "Sport / Exercice physique (운 transporter + 동 bouger)", audio: "운동" },
      { kr: "동물", hanja: "動物", roman: "dong-mul", fr: "Animal (동 bouger + 물 chose/être)", audio: "동물" },
      { kr: "자동차", hanja: "自動車", roman: "ja-dong-cha", fr: "Voiture (자 auto + 동 mobile + 차 véhicule)", audio: "자동차" },
      { kr: "활동", hanja: "活動", roman: "hwal-dong", fr: "Activité (활 vivant + 동 mouvement)", audio: "활동" }
    ]
  }
];

// ==========================================
// AVENTURES INTERACTIVES / JEU DE RÔLE À SÉOUL (RPG)
// ==========================================
const SEOUL_QUESTS = [
  {
    id: "rpg_cu",
    title: "Mission 1 : À la supérette coréenne (편의점)",
    place: "CU / GS25 à Hongdae, 23h45",
    intro: "Vous avez une faim de loup après avoir visité Séoul. Vous entrez dans un CU pour acheter un ramyeon et une boisson.",
    npc: "직원 (Employé de supérette)",
    avatar: "🏪",
    steps: [
      {
        npcSay: "어서 오세요! (Le caissier vous salue)",
        prompt: "Que répondez-vous poliment en franchissant la porte ?",
        options: [
          { text: "안녕하세요! (Bonjour)", score: 10, correct: true, feedback: "Parfait ! Simple, poli et chaleureux." },
          { text: "밥 주세요. (Donne-moi du riz)", score: 0, correct: false, feedback: "Un peu brusque et inadapté pour une salutation d'entrée !" },
          { text: "얼마예요? (Combien ça coûte ?)", score: 0, correct: false, feedback: "Vous n'avez encore rien pris en main !" }
        ]
      },
      {
        npcSay: "봉투 필요하세요? (Avez-vous besoin d'un sac en plastique ?)",
        prompt: "Le caissier vous demande si vous voulez un sac (봉투). Vous avez déjà votre sac à dos. Que dites-vous ?",
        options: [
          { text: "아니요, 괜찮아요! (Non, ça va merci !)", score: 10, correct: true, feedback: "Excellente réponse, très naturelle !" },
          { text: "네, 주세요. (Oui, donnez-moi)", score: 5, correct: true, feedback: "Ça marche aussi si vous vouliez un sac payant (100 wons) !" },
          { text: "한국 사람이에요. (Je suis Coréen)", score: 0, correct: false, feedback: "Hors sujet !" }
        ]
      },
      {
        npcSay: "삼천오백 원입니다. 카드로 하시겠어요? (3 500 wons. Vous réglez par carte ?)",
        prompt: "Vous tendez votre carte bancaire. Que dites-vous au moment de payer ?",
        options: [
          { text: "네, 여기 있어요. (Oui, voici)", score: 10, correct: true, feedback: "Impeccable ! '여기 있어요' est la formule parfaite quand on tend sa carte." },
          { text: "안 가요. (Je n'y vais pas)", score: 0, correct: false, feedback: "Le caissier ne comprend pas !" },
          { text: "젓가락 없어요? (Pas de baguettes ?)", score: 2, correct: false, feedback: "Attendez d'avoir payé pour les baguettes !" }
        ]
      }
    ]
  },
  {
    id: "rpg_subway",
    title: "Mission 2 : Prendre le métro et recharger sa carte T-Money (지하철)",
    place: "Station Gangnam (강남역), Ligne 2",
    intro: "Votre carte de transport T-Money est vide et vous devez rejoindre Hongdae en métro.",
    npc: "역무원 (Agent de gare)",
    avatar: "🚇",
    steps: [
      {
        npcSay: "무엇을 도와드릴까요? (Que puis-je faire pour vous aider ?)",
        prompt: "Vous voulez savoir où recharger votre carte T-Money. Que demandez-vous ?",
        options: [
          { text: "티머니 카드 충전 어디서 해요? (Où recharge-t-on la carte T-Money ?)", score: 10, correct: true, feedback: "Superbe phrase de niveau A2 !" },
          { text: "커피 주세요. (Un café SVP)", score: 0, correct: false, feedback: "Vous êtes au guichet du métro !" },
          { text: "지금 몇 시예요? (Quelle heure est-il ?)", score: 0, correct: false, feedback: "Ça ne résout pas votre problème de carte !" }
        ]
      },
      {
        npcSay: "저기 기계에서 하시면 돼요. (Vous pouvez le faire à la machine là-bas.)",
        prompt: "L'agent vous montre la machine. Comment le remerciez-vous poliment ?",
        options: [
          { text: "감사합니다! (Merci beaucoup !)", score: 10, correct: true, feedback: "Parfait !" },
          { text: "고마워! (Merci - familier)", score: 0, correct: false, feedback: "Trop familier pour un agent inconnu !" },
          { text: "죄송합니다. (Pardon)", score: 2, correct: false, feedback: "Pas besoin de vous excuser, il faut le remercier !" }
        ]
      }
    ]
  },
  {
    id: "rpg_bbq",
    title: "Mission 3 : Au restaurant de Barbecue Coréen (삼겹살 식당)",
    place: "Restaurant traditionnel à Myeongdong",
    intro: "Vous vous installez à une table avec votre ami pour griller de la viande.",
    npc: "이모님 (La gérante du restaurant)",
    avatar: "🥩",
    steps: [
      {
        npcSay: "몇 분이세요? (Combien de personnes êtes-vous ?)",
        prompt: "Vous êtes deux. Que répondez-vous avec le bon compteur de personnes ?",
        options: [
          { text: "두 명이에요. (Deux personnes.)", score: 10, correct: true, feedback: "Exact ! 두 + 명 (personnes)." },
          { text: "이 개예요. (2 objets)", score: 0, correct: false, feedback: "On ne compte pas les humains avec 개 et le chiffre sino-coréen !" },
          { text: "혼자예요. (Je suis seul)", score: 0, correct: false, feedback: "Votre ami vous regarde bizarrement !" }
        ]
      },
      {
        npcSay: "주문하시겠어요? (Voulez-vous commander ?)",
        prompt: "Vous voulez 2 portions de poitrine de porc (삼겹살 2인분) et de l'eau. Que dites-vous ?",
        options: [
          { text: "삼겹살 이인분하고 물 주세요! (2 portions de samgyeopsal et de l'eau SVP)", score: 10, correct: true, feedback: "Le combo parfait :하고 + 주세요 !" },
          { text: "비싸지만 안 먹어요. (C'est cher mais je ne mange pas)", score: 0, correct: false, feedback: "La serveuse est déconcertée !" },
          { text: "소주 있어요? (Avez-vous du soju ?)", score: 5, correct: true, feedback: "Valable, mais vous n'avez pas encore commandé à manger !" }
        ]
      }
    ]
  }
];

// ==========================================
// HISTOIRES COURTES BILINGUES AVEC « SURVOL MAGIQUE »
// ==========================================
const HOVER_STORIES = [
  {
    id: "story_1",
    title: "1. 나의 서울 하루 (Ma journée à Séoul)",
    subtitle: "Une journée typique d'un étudiant étranger à Séoul",
    audioFull: "오늘 아침에 일찍 일어났어요. 날씨가 아주 좋아서 기분이 좋아요.",
    sentences: [
      {
        tokens: [
          { kr: "오늘", rom: "o-neul", role: "Temps", fr: "Aujourd'hui" },
          { kr: "아침에", rom: "a-chi-me", role: "Temps + 에", fr: "le matin (à)" },
          { kr: "일찍", rom: "il-jjik", role: "Adverbe", fr: "tôt" },
          { kr: "일어났어요.", rom: "i-reo-na-sseo-yo", role: "Passé (일어나다)", fr: "je me suis réveillé(e)" }
        ],
        fullFr: "Aujourd'hui, je me suis réveillé(e) tôt le matin."
      },
      {
        tokens: [
          { kr: "날씨가", rom: "nal-ssi-ga", role: "Sujet", fr: "Le temps / la météo" },
          { kr: "아주", rom: "a-ju", role: "Adverbe", fr: "très" },
          { kr: "좋아서", rom: "jo-a-seo", role: "좋다 + 아서 (Cause)", fr: "parce qu'il est bon" },
          { kr: "기분이", rom: "gi-bu-ni", role: "Sujet", fr: "mon humeur" },
          { kr: "좋아요.", rom: "jo-a-yo", role: "Présent", fr: "est bonne" }
        ],
        fullFr: "Comme il fait très beau, je suis de bonne humeur."
      },
      {
        tokens: [
          { kr: "친구랑", rom: "chin-gu-rang", role: "Nom + 랑 (avec)", fr: "Avec mon ami" },
          { kr: "카페에서", rom: "ka-pe-e-seo", role: "Lieu d'action (에서)", fr: "au café" },
          { kr: "커피를", rom: "keo-pi-reul", role: "Objet direct (를)", fr: "du café" },
          { kr: "마시고", rom: "ma-si-go", role: "마시다 + 고 (et)", fr: "nous buvons et" },
          { kr: "이야기했어요.", rom: "i-ya-gi-hae-sseo-yo", role: "Passé (이야기하다)", fr: "nous avons discuté." }
        ],
        fullFr: "Avec mon ami, nous avons bu un café et discuté au café."
      }
    ],
    quiz: {
      q: "Pourquoi le narrateur est-il de bonne humeur ?",
      opts: ["Parce qu'il fait très beau (날씨가 좋아서)", "Parce qu'il a gagné au loto", "Parce que le café était gratuit"],
      correct: 0,
      expl: "La phrase dit '날씨가 아주 좋아서' (parce que le temps est très bon)."
    }
  },
  {
    id: "story_2",
    title: "2. 주말의 쇼핑 (Shopping du week-end à Hongdae)",
    subtitle: "Acheter des vêtements et trouver que c'est un peu cher",
    audioFull: "주말에 홍대에 갔어요. 예쁜 옷이 많았지만 조금 비쌌어요.",
    sentences: [
      {
        tokens: [
          { kr: "주말에", rom: "ju-ma-re", role: "Temps + 에", fr: "Pendant le week-end" },
          { kr: "홍대에", rom: "hong-dae-e", role: "Lieu + 에", fr: "à Hongdae" },
          { kr: "갔어요.", rom: "ga-sseo-yo", role: "Passé (가다)", fr: "je suis allé(e)" }
        ],
        fullFr: "Le week-end, je suis allé(e) à Hongdae."
      },
      {
        tokens: [
          { kr: "예쁜", rom: "ye-ppeun", role: "Adjectif qualifiant", fr: "de jolis" },
          { kr: "옷이", rom: "o-si", role: "Sujet (옷 + 이)", fr: "vêtements" },
          { kr: "많았지만", rom: "ma-nat-ji-man", role: "많다 + 지만 (mais)", fr: "il y en avait beaucoup, mais" },
          { kr: "조금", rom: "jo-geum", role: "Adverbe", fr: "un peu" },
          { kr: "비쌌어요.", rom: "bi-ssa-sseo-yo", role: "Passé (비싸다)", fr: "c'était cher." }
        ],
        fullFr: "Il y avait beaucoup de jolis vêtements, mais c'était un peu cher."
      }
    ],
    quiz: {
      q: "Comment étaient les vêtements à Hongdae ?",
      opts: ["Jolis mais un peu chers (예쁜 옷이 많았지만 조금 비쌌어요)", "Très laids et bon marché", "Gratuits"],
      correct: 0,
      expl: "Le connecteur -지만 indique l'opposition : 많았지만 조금 비쌌어요."
    }
  }
];

// ==========================================
// QUÊTES QUOTIDIENNES DU JOUR
// ==========================================
const DAILY_QUESTS_DEF = [
  { id: "dq_sprint", title: "Faire 1 Défi Lecture Chrono 60s", xp: 20, icon: "⚡", tab: "practice" },
  { id: "dq_mic", title: "Prononcer 2 phrases au Micro", xp: 25, icon: "🎤", tab: "practice" },
  { id: "dq_rpg", title: "Terminer 1 Mission de Jeu de Rôle à Séoul", xp: 30, icon: "🎮", tab: "rpg" },
  { id: "dq_hanja", title: "Explorer 2 Racines Hanja", xp: 15, icon: "🧬", tab: "hanja" },
  { id: "dq_story", title: "Lire 1 Histoire au Survol Magique", xp: 20, icon: "📖", tab: "stories" }
];

// COMPARATEUR POLITESSE K-DRAMA
const POLITENESS_COMPARISONS = [
  {
    meaning: "Bonjour / Salut",
    formal: { kr: "안녕하십니까", roman: "an-nyeong-ha-sim-ni-kka" },
    polite: { kr: "안녕하세요", roman: "an-nyeong-ha-se-yo" },
    casual: { kr: "안녕!", roman: "an-nyeong!" }
  },
  {
    meaning: "Merci",
    formal: { kr: "감사합니다", roman: "gam-sa-ham-ni-da" },
    polite: { kr: "고마워요", roman: "go-ma-wo-yo" },
    casual: { kr: "고마워!", roman: "go-ma-wo!" }
  },
  {
    meaning: "Pardon / Désolé",
    formal: { kr: "죄송합니다", roman: "joe-song-ham-ni-da" },
    polite: { kr: "미안해요", roman: "mi-an-hae-yo" },
    casual: { kr: "미안해 / 미안!", roman: "mi-an-hae!" }
  },
  {
    meaning: "Oui / Non",
    formal: { kr: "예 / 아닙니다", roman: "ye / a-nim-ni-da" },
    polite: { kr: "네 / 아니요", roman: "ne / a-ni-yo" },
    casual: { kr: "응 (어) / 아니", roman: "eung / a-ni" }
  },
  {
    meaning: "Que fais-tu ?",
    formal: { kr: "무엇을 하십니까?", roman: "mu-eo-seul ha-sim-ni-kka?" },
    polite: { kr: "지금 뭐 해요?", roman: "ji-geum mwo hae-yo?" },
    casual: { kr: "지금 뭐 해?", roman: "ji-geum mwo hae?" }
  },
  {
    meaning: "Je mange / Tu manges",
    formal: { kr: "먹습니다", roman: "meok-seum-ni-da" },
    polite: { kr: "먹어요", roman: "meo-geo-yo" },
    casual: { kr: "먹어", roman: "meo-geo" }
  },
  {
    meaning: "Je t'aime",
    formal: { kr: "사랑합니다", roman: "sa-rang-ham-ni-da" },
    polite: { kr: "사랑해요", roman: "sa-rang-hae-yo" },
    casual: { kr: "사랑해!", roman: "sa-rang-hae!" }
  }
];

// VERBES CONJUGUÉS A1
const CONJUGATION_VERBS = [
  {
    id: "v_gada",
    infinitive: "가다",
    stem: "가",
    meaning: "Aller",
    ruleGroup: "Voyelle ㅏ/ㅗ (+아요)",
    ruleNote: "Le radical 가 finit déjà par ㅏ : 가 + 아요 fusionnent directement en 가요.",
    present: { kr: "가요", roman: "ga-yo", fr: "Je vais / Tu vas" },
    past: { kr: "갔어요", roman: "ga-sseo-yo", fr: "Je suis allé(e)" },
    future: { kr: "갈 거예요", roman: "gal geo-ye-yo", fr: "J'irai / Je vais aller" },
    want: { kr: "가고 싶어요", roman: "ga-go si-peo-yo", fr: "Je veux aller" }
  },
  {
    id: "v_oda",
    infinitive: "오다",
    stem: "오",
    meaning: "Venir",
    ruleGroup: "Voyelle ㅏ/ㅗ (+아요)",
    ruleNote: "Le radical 오 (ㅗ) + 아요 fusionnent en 와요 (ㅗ + ㅏ = ㅘ).",
    present: { kr: "와요", roman: "wa-yo", fr: "Je viens" },
    past: { kr: "왔어요", roman: "wa-sseo-yo", fr: "Je suis venu(e)" },
    future: { kr: "올 거예요", roman: "ol geo-ye-yo", fr: "Je viendrai" },
    want: { kr: "오고 싶어요", roman: "o-go si-peo-yo", fr: "Je veux venir" }
  },
  {
    id: "v_boda",
    infinitive: "보다",
    stem: "보",
    meaning: "Voir / Regarder",
    ruleGroup: "Voyelle ㅏ/ㅗ (+아요)",
    ruleNote: "보 (ㅗ) + 아요 fusionnent en 봐요 (ㅗ + ㅏ = ㅘ).",
    present: { kr: "봐요", roman: "bwa-yo", fr: "Je regarde / Je vois" },
    past: { kr: "봤어요", roman: "bwa-sseo-yo", fr: "J'ai vu / regardé" },
    future: { kr: "볼 거예요", roman: "bol geo-ye-yo", fr: "Je regarderai" },
    want: { kr: "보고 싶어요", roman: "bo-go si-peo-yo", fr: "Je veux voir (ou : Tu me manques !)" }
  },
  {
    id: "v_sada",
    infinitive: "사다",
    stem: "사",
    meaning: "Acheter",
    ruleGroup: "Voyelle ㅏ/ㅗ (+아요)",
    ruleNote: "사 + 아요 fusionnent en 사요.",
    present: { kr: "사요", roman: "sa-yo", fr: "J'achète" },
    past: { kr: "샀어요", roman: "sa-sseo-yo", fr: "J'ai acheté" },
    future: { kr: "살 거예요", roman: "sal geo-ye-yo", fr: "J'achèterai" },
    want: { kr: "사고 싶어요", roman: "sa-go si-peo-yo", fr: "Je veux acheter" }
  },
  {
    id: "v_meokda",
    infinitive: "먹다",
    stem: "먹",
    meaning: "Manger",
    ruleGroup: "Autre voyelle (+어요)",
    ruleNote: "Voyelle ㅓ + Batchim ㄱ : on ajoute simplement 어요 → 먹어요.",
    present: { kr: "먹어요", roman: "meo-geo-yo", fr: "Je mange" },
    past: { kr: "먹었어요", roman: "meo-geo-sseo-yo", fr: "J'ai mangé" },
    future: { kr: "먹을 거예요", roman: "meo-geul geo-ye-yo", fr: "Je mangerai" },
    want: { kr: "먹고 싶어요", roman: "meok-go si-peo-yo", fr: "Je veux manger" }
  },
  {
    id: "v_masida",
    infinitive: "마시다",
    stem: "마시",
    meaning: "Boire",
    ruleGroup: "Autre voyelle (+어요)",
    ruleNote: "마시 (ㅣ) + 어요 → la voyelle ㅣ + ㅓ fusionnent en ㅕ → 마셔요 !",
    present: { kr: "마셔요", roman: "ma-syeo-yo", fr: "Je bois" },
    past: { kr: "마셨어요", roman: "ma-syeo-sseo-yo", fr: "J'ai bu" },
    future: { kr: "마실 거예요", roman: "ma-sil geo-ye-yo", fr: "Je boirai" },
    want: { kr: "마시고 싶어요", roman: "ma-si-go si-peo-yo", fr: "Je veux boire" }
  },
  {
    id: "v_ikda",
    infinitive: "읽다",
    stem: "읽",
    meaning: "Lire",
    ruleGroup: "Autre voyelle (+어요)",
    ruleNote: "Voyelle ㅣ + Batchim : on ajoute 어요 → 읽어요 [일거요].",
    present: { kr: "읽어요", roman: "il-geo-yo", fr: "Je lis" },
    past: { kr: "읽었어요", roman: "il-geo-sseo-yo", fr: "J'ai lu" },
    future: { kr: "읽을 거예요", roman: "il-geul geo-ye-yo", fr: "Je lirai" },
    want: { kr: "읽고 싶어요", roman: "ik-kko si-peo-yo", fr: "Je veux lire" }
  },
  {
    id: "v_hada",
    infinitive: "하다",
    stem: "하",
    meaning: "Faire",
    ruleGroup: "Verbes en 하다 (→ 해요)",
    ruleNote: "Tous les verbes en 하다 deviennent 해요 au présent et 했어요 au passé.",
    present: { kr: "해요", roman: "hae-yo", fr: "Je fais" },
    past: { kr: "했어요", roman: "hae-sseo-yo", fr: "J'ai fait" },
    future: { kr: "할 거예요", roman: "hal geo-ye-yo", fr: "Je ferai" },
    want: { kr: "하고 싶어요", roman: "ha-go si-peo-yo", fr: "Je veux faire" }
  },
  {
    id: "v_gongbuhada",
    infinitive: "공부하다",
    stem: "공부하",
    meaning: "Étudier",
    ruleGroup: "Verbes en 하다 (→ 해요)",
    ruleNote: "공부 (étude) + 하다 (faire) → 공부해요.",
    present: { kr: "공부해요", roman: "gong-bu-hae-yo", fr: "J'étudie" },
    past: { kr: "공부했어요", roman: "gong-bu-hae-sseo-yo", fr: "J'ai étudié" },
    future: { kr: "공부할 거예요", roman: "gong-bu-hal geo-ye-yo", fr: "J'étudierai" },
    want: { kr: "공부하고 싶어요", roman: "gong-bu-ha-go si-peo-yo", fr: "Je veux étudier" }
  }
];

// DIALOGUES A1
const REAL_DIALOGUES = [
  {
    id: "dlg_1",
    title: "Dialogue 1 : Faire connaissance à Séoul",
    situation: "Minji (coréenne) et Thomas (français) se rencontrent pour la première fois.",
    level: "Débutant • 이에요/예요 & 은/는",
    lines: [
      {
        speaker: "민지 (Minji)",
        kr: "안녕하세요! 저는 민지예요.",
        roman: "An-nyeong-ha-se-yo! Jeo-neun Min-ji-ye-yo.",
        fr: "Bonjour ! Moi, je suis Minji.",
        grammarNote: "저 (je) + 는 (thème) | 민지 (finit par voyelle ㅣ) + 예요 (être)."
      },
      {
        speaker: "토마 (Thomas)",
        kr: "안녕하세요! 저는 토마예요. 프랑스 사람이에요.",
        roman: "An-nyeong-ha-se-yo! Jeo-neun To-ma-ye-yo. Peu-rang-seu sa-ra-mi-e-yo.",
        fr: "Bonjour ! Je suis Thomas. Je suis Français.",
        grammarNote: "프랑스 사람 (personne française, finit par Batchim ㅁ) + 이에요 (être)."
      },
      {
        speaker: "민지 (Minji)",
        kr: "아, 반가워요! 토마 씨는 학생이에요?",
        roman: "A, ban-ga-wo-yo! To-ma ssi-neun hak-saeng-i-e-yo?",
        fr: "Ah, enchantée ! Thomas, êtes-vous étudiant ?",
        grammarNote: "반가워요 = Enchanté(e) | 씨 = M./Mme | 학생 + 이에요?"
      },
      {
        speaker: "토마 (Thomas)",
        kr: "네, 학생이에요. 지금 한국어를 공부해요.",
        roman: "Ne, hak-saeng-i-e-yo. Ji-geum han-gu-geo-reul gong-bu-hae-yo.",
        fr: "Oui, je suis étudiant. Maintenant, j'étudie le coréen.",
        grammarNote: "지금 (maintenant) + 한국어를 (le coréen) + 공부해요 (étudie)."
      }
    ],
    quiz: {
      question: "Pourquoi Thomas dit-il « 토마예요 » mais « 프랑스 사람이에요 » ?",
      options: [
        "Parce que 토마 finit par une voyelle (예요) et 사람 finit par une consonne (이에요)",
        "Parce que 사람 est un mot pluriel",
        "Parce que 예요 est au passé et 이에요 est au présent"
      ],
      correctIndex: 0,
      explanation: "Après voyelle : 예요. Après consonne/Batchim : 이에요."
    }
  },
  {
    id: "dlg_2",
    title: "Dialogue 2 : Commander dans un café coréen",
    situation: "Vous entrez dans un café à Hongdae pour commander un Americano glacé.",
    level: "Survie • 주세요, Nombres & Prix",
    lines: [
      {
        speaker: "직원 (Serveur)",
        kr: "어서 오세요! 뭐 드릴까요?",
        roman: "Eo-seo o-se-yo! Mwo deu-ril-kka-yo?",
        fr: "Bienvenue ! Que puis-je vous servir ?",
        grammarNote: "어서 오세요 = Bienvenue | 뭐 드릴까요 = Que puis-je vous offrir ?"
      },
      {
        speaker: "손님 (Client)",
        kr: "아이스 아메리카노 한 잔 주세요.",
        roman: "A-i-seu a-me-ri-ka-no han jan ju-se-yo.",
        fr: "Un Americano glacé, s'il vous plaît.",
        grammarNote: "한 (1 natif) + 잔 (compteur tasses) + 주세요 (donnez-moi SVP)."
      },
      {
        speaker: "직원 (Serveur)",
        kr: "네, 사천오백 원입니다.",
        roman: "Ne, sa-cheon-o-baek wo-nim-ni-da.",
        fr: "Très bien, c'est 4 500 wons.",
        grammarNote: "사천 (4 000) + 오백 (500) + 원 (Wons)."
      },
      {
        speaker: "손님 (Client)",
        kr: "여기 있어요. 감사합니다!",
        roman: "Yeo-gi i-sseo-yo. Gam-sa-ham-ni-da!",
        fr: "Voici (en tendant la carte). Merci beaucoup !",
        grammarNote: "여기 있어요 = C'est ici (en tendant quelque chose)."
      }
    ],
    quiz: {
      question: "Quel est le prix annoncé par le serveur (« 사천오백 원 ») ?",
      options: [
        "4 500 wons",
        "3 500 wons",
        "45 000 wons"
      ],
      correctIndex: 0,
      explanation: "사천 (4 000) + 오백 (500) = 4 500 wons !"
    }
  }
];

// VOCABULAIRE THÉMATIQUE
const VOCAB_CATEGORIES = [
  {
    id: "voc_survival",
    title: "1. Salutations & Expressions indispensables",
    icon: "👋",
    description: "Les vraies expressions utilisées au quotidien en Corée.",
    words: [
      { kr: "안녕하세요", roman: "an-nyeong-ha-se-yo", fr: "Bonjour / Bonsoir (poli)", note: "S'utilise toute la journée." },
      { kr: "감사합니다", roman: "gam-sa-ham-ni-da", fr: "Merci (formel)", note: "Prononcé [gam-sa-ham-ni-da]." },
      { kr: "고마워요", roman: "go-ma-wo-yo", fr: "Merci (poli courant)", note: "Plus chaleureux au quotidien." },
      { kr: "네 / 아니요", roman: "ne / a-ni-yo", fr: "Oui / Non", note: "네 sert aussi à dire « je vous écoute »." },
      { kr: "죄송합니다", roman: "joe-song-ham-ni-da", fr: "Pardon / Désolé", note: "Pour s'excuser poliment." },
      { kr: "잠시만요", roman: "jam-si-man-yo", fr: "Un instant SVP / Excusez-moi", note: "Litt. « Juste un petit moment »." },
      { kr: "주세요", roman: "ju-se-yo", fr: "Donnez-moi ... SVP", note: "물 주세요 = De l'eau SVP." },
      { kr: "얼마예요?", roman: "eol-ma-ye-yo?", fr: "Combien ça coûte ?", note: "얼마 (combien) + 예요." },
      { kr: "괜찮아요", roman: "gwaen-cha-na-yo", fr: "Ça va / Pas de souci", note: "Intonation montante = Ça va ?" },
      { kr: "안녕히 가세요", roman: "an-nyeong-hi ga-se-yo", fr: "Au revoir (à celui qui part)", note: "Litt. « Allez en paix »." },
      { kr: "안녕히 계세요", roman: "an-nyeong-hi gye-se-yo", fr: "Au revoir (quand vous partez)", note: "Litt. « Restez en paix »." }
    ]
  },
  {
    id: "voc_people",
    title: "2. Pronoms & Personnes",
    icon: "🧑‍🤝‍🧑",
    description: "Parler de soi et des autres.",
    words: [
      { kr: "저 / 나", roman: "jeo / na", fr: "Je, Moi (poli / familier)", note: "저는 (poli) / 나는 (familier)." },
      { kr: "우리", roman: "u-ri", fr: "Nous / Notre", note: "우리 나라 = notre pays." },
      { kr: "사람", roman: "sa-ram", fr: "Personne / Humain", note: "프랑스 사람 = Français." },
      { kr: "친구", roman: "chin-gu", fr: "Ami(e)", note: "Personnes du même âge." },
      { kr: "학생", roman: "hak-saeng", fr: "Étudiant(e)", note: "학 (étude) + 생 (personne)." },
      { kr: "선생님", roman: "seon-saeng-nim", fr: "Professeur(e)", note: "-님 marque le grand respect." },
      { kr: "회사원", roman: "hoe-sa-won", fr: "Employé(e) de bureau", note: "회사 (entreprise) + 원." }
    ]
  },
  {
    id: "voc_verbs",
    title: "3. Verbes & Adjectifs indispensables",
    icon: "⚡",
    description: "Avec forme infinitif et présent poli.",
    words: [
      { kr: "가다 → 가요", roman: "ga-da → ga-yo", fr: "Aller → Je vais", note: "ㅏ -> +아요." },
      { kr: "오다 → 와요", roman: "o-da → wa-yo", fr: "Venir → Je viens", note: "ㅗ + ㅏ요 = 와요." },
      { kr: "먹다 → 먹어요", roman: "meok-da → meo-geo-yo", fr: "Manger → Je mange", note: "ㅓ -> +어요." },
      { kr: "마시다 → 마셔요", roman: "ma-si-da → ma-syeo-yo", fr: "Boire → Je bois", note: "ㅣ + 어요 = ㅕ요." },
      { kr: "보다 → 봐요", roman: "bo-da → bwa-yo", fr: "Voir / Regarder", note: "ㅗ + ㅏ요 = 봐요." },
      { kr: "하다 → 해요", roman: "ha-da → hae-yo", fr: "Faire → Je fais", note: "Base de nombreux verbes." },
      { kr: "공부하다 → 공부해요", roman: "gong-bu-ha-da → gong-bu-hae-yo", fr: "Étudier", note: "공부 + 하다." },
      { kr: "맛있다 → 맛있어요", roman: "ma-sit-da → ma-si-sseo-yo", fr: "C'est délicieux", note: "맛 (goût) + 있다." }
    ]
  },
  {
    id: "voc_daily",
    title: "4. Quotidien & Lieux",
    icon: "🍜",
    description: "Mots du quotidien.",
    words: [
      { kr: "물", roman: "mul", fr: "Eau", note: "물을 마셔요." },
      { kr: "밥", roman: "bap", fr: "Riz cuit / Repas", note: "밥 먹었어요?" },
      { kr: "커피", roman: "keo-pi", fr: "Café", note: "커피 한 잔 주세요." },
      { kr: "집", roman: "jip", fr: "Maison", note: "집에 가요." },
      { kr: "학교", roman: "hak-gyo", fr: "École", note: "학교에서 공부해요." },
      { kr: "식당", roman: "sik-ttang", fr: "Restaurant", note: "식당에서 먹어요." },
      { kr: "오늘", roman: "o-neul", fr: "Aujourd'hui", note: "오늘 안 가요." },
      { kr: "지금", roman: "ji-geum", fr: "Maintenant", note: "지금 뭐 해요?" }
    ]
  }
];

// DÉFIS MICRO
const MIC_CHALLENGES = [
  { kr: "안녕하세요", roman: "an-nyeong-ha-se-yo", fr: "Bonjour (poli)", tip: "Prononcez bien d'une traite." },
  { kr: "감사합니다", roman: "gam-sa-ham-ni-da", fr: "Merci (formel)", tip: "합 devant 니 se dit [함니 / ham-ni]." },
  { kr: "물 주세요", roman: "mul ju-se-yo", fr: "De l'eau SVP", tip: "L doux sur 물." },
  { kr: "커피 마셔요", roman: "keo-pi ma-syeo-yo", fr: "Je bois du café", tip: "커피 : K soufflé." },
  { kr: "학교에 가요", roman: "hak-gyo-e ga-yo", fr: "Je vais à l'école", tip: "학-교-에-가-요." },
  { kr: "한국어를 공부해요", roman: "han-gu-geo-reul gong-bu-hae-yo", fr: "J'étudie le coréen", tip: "Liaison : [한구거]." },
  { kr: "맛있어요", roman: "ma-si-sseo-yo", fr: "C'est délicieux", tip: "Liaison : [마시써요]." },
  { kr: "사랑해요", roman: "sa-rang-hae-yo", fr: "Je t'aime", tip: "ㅇ de 랑 résonne en -ng." }
];

// CHECKLIST NIVEAU 1
const LEVEL1_CHECKLIST = [
  { id: "chk_1", title: "1. Maîtriser les 8 voyelles simples & 10 consonnes de base", desc: "Savoir différencier ㅏ/ㅓ, ㅗ/ㅜ/ㅡ et lire un bloc simple.", tab: "hangul" },
  { id: "chk_2", title: "2. Maîtriser les voyelles en Y/W & consonnes aspirées/doubles", desc: "Entendre la différence entre 가, 카 et 까.", tab: "hangul" },
  { id: "chk_3", title: "3. Comprendre le Batchim (7 sons finaux) et la Liaison", desc: "Savoir pourquoi 옷 se lit [ot] et 한국어 se lit [한구거].", tab: "hangul" },
  { id: "chk_4", title: "4. Savoir se présenter avec 은/는 et 이에요/예요", desc: "Construire « 저는 [Nom]이에요/예요 » sans hésiter.", tab: "grammar" },
  { id: "chk_5", title: "5. Utiliser les particules d'objet (을/를) et de lieu (에 vs 에서)", desc: "Différencier aller à (에) et agir dans (에서).", tab: "grammar" },
  { id: "chk_6", title: "6. Conjuguer au Présent (-아요/어요), Passé, Futur et Envie", desc: "Passer de l'infinitif (-다) aux 4 temps clés.", tab: "conjugation" },
  { id: "chk_7", title: "7. Lire l'heure et compter les prix en Wons (만 / 천)", desc: "Comprendre les deux systèmes de nombres et les compteurs.", tab: "numbers" },
  { id: "chk_8", title: "8. Réussir l'Examen Blanc Niveau 1", desc: "Valider ses acquis avant de passer au Niveau 2 !", tab: "practice" }
];

// DICTÉE CLAVIER HANGEUL
const DICTATION_WORDS = [
  { id: "dic_1", kr: "아이", roman: "a-i", fr: "Enfant", hint: "아 (a) + 이 (i)" },
  { id: "dic_2", kr: "우유", roman: "u-yu", fr: "Lait", hint: "우 (ou) + 유 (you)" },
  { id: "dic_3", kr: "물", roman: "mul", fr: "Eau", hint: "ㅁ + ㅜ + ㄹ" },
  { id: "dic_4", kr: "밥", roman: "bap", fr: "Riz cuit / Repas", hint: "ㅂ + ㅏ + ㅂ" },
  { id: "dic_5", kr: "집", roman: "jip", fr: "Maison", hint: "ㅈ + ㅣ + ㅂ" },
  { id: "dic_6", kr: "커피", roman: "keo-pi", fr: "Café", hint: "ㅋ+ㅓ (커) + ㅍ+ㅣ (피)" },
  { id: "dic_7", kr: "학교", roman: "hak-gyo", fr: "École", hint: "ㅎ+ㅏ+ㄱ (학) + ㄱ+ㅛ (교)" },
  { id: "dic_8", kr: "한국", roman: "han-guk", fr: "Corée", hint: "ㅎ+ㅏ+ㄴ (한) + ㄱ+ㅜ+ㄱ (국)" },
  { id: "dic_9", kr: "사랑", roman: "sa-rang", fr: "Amour", hint: "ㅅ+ㅏ (사) + ㄹ+ㅏ+ㅇ (랑)" }
];

// BANQUE D'EXERCICES A1
const GRAMMAR_EXERCISES = [
  {
    id: "gex_1",
    type: "fill_particle",
    category: "Verbe Être (이에요 / 예요)",
    promptFr: "Je suis étudiant(e).",
    sentenceBefore: "저는 학생",
    sentenceAfter: ".",
    audioFull: "저는 학생이에요.",
    correct: "이에요",
    options: ["이에요", "예요", "을", "에서"],
    explanation: "« 학생 » finit par la consonne ㅇ (Batchim) : on met « 이에요 »."
  },
  {
    id: "gex_2",
    type: "fill_particle",
    category: "Verbe Être (이에요 / 예요)",
    promptFr: "Je suis médecin.",
    sentenceBefore: "저는 의사",
    sentenceAfter: ".",
    audioFull: "저는 의사예요.",
    correct: "예요",
    options: ["예요", "이에요", "를", "은"],
    explanation: "« 의사 » finit par la voyelle ㅏ : on met « 예요 »."
  },
  {
    id: "gex_3",
    type: "fill_particle",
    category: "Particule d'Objet (을 / 를)",
    promptFr: "Je bois de l'eau.",
    sentenceBefore: "물",
    sentenceAfter: " 마셔요.",
    audioFull: "물을 마셔요.",
    correct: "을",
    options: ["을", "를", "에", "이에요"],
    explanation: "« 물 » finit par la consonne ㄹ (Batchim) → particule « 을 »."
  },
  {
    id: "gex_4",
    type: "fill_particle",
    category: "Particule d'Objet (을 / 를)",
    promptFr: "Je bois du café.",
    sentenceBefore: "커피",
    sentenceAfter: " 마셔요.",
    audioFull: "커피를 마셔요.",
    correct: "를",
    options: ["를", "을", "에서", "은"],
    explanation: "« 커피 » finit par voyelle → particule « 를 »."
  },
  {
    id: "gex_5",
    type: "fill_particle",
    category: "Particules de Lieu (에 vs 에서)",
    promptFr: "Je vais à l'école.",
    sentenceBefore: "학교",
    sentenceAfter: " 가요.",
    audioFull: "학교에 가요.",
    correct: "에",
    options: ["에", "에서", "를", "은"],
    explanation: "Destination avec 가요 → « 에 »."
  },
  {
    id: "gex_6",
    type: "fill_particle",
    category: "Particules de Lieu (에 vs 에서)",
    promptFr: "J'étudie à l'école.",
    sentenceBefore: "학교",
    sentenceAfter: " 공부해요.",
    audioFull: "학교에서 공부해요.",
    correct: "에서",
    options: ["에서", "에", "을", "가"],
    explanation: "Action active dans un lieu → « 에서 »."
  },
  {
    id: "gex_8",
    type: "sentence_order",
    category: "Construction S-O-V",
    promptFr: "Remettez les blocs dans l'ordre : « Je mange du riz au restaurant. »",
    audioFull: "식당에서 밥을 먹어요.",
    blocks: ["식당에서", "밥을", "먹어요"],
    distractors: ["학교에"],
    explanation: "Lieu d'action (식당에서) + Objet (밥을) + Verbe (먹어요)."
  }
];

// AUTOMATE CLAVIER JAMO
const CHOSEONG_LIST = [
  { char: "ㄱ", roman: "g" }, { char: "ㄲ", roman: "kk" }, { char: "ㄴ", roman: "n" },
  { char: "ㄷ", roman: "d" }, { char: "ㄸ", roman: "tt" }, { char: "ㄹ", roman: "r/l" },
  { char: "ㅁ", roman: "m" }, { char: "ㅂ", roman: "b" }, { char: "ㅃ", roman: "pp" },
  { char: "ㅅ", roman: "s" }, { char: "ㅆ", roman: "ss" }, { char: "ㅇ", roman: "(muet)" },
  { char: "ㅈ", roman: "j" }, { char: "ㅉ", roman: "jj" }, { char: "ㅊ", roman: "ch" },
  { char: "ㅋ", roman: "k" }, { char: "ㅌ", roman: "t" }, { char: "ㅍ", roman: "p" },
  { char: "ㅎ", roman: "h" }
];

const JUNGSEONG_LIST = [
  { char: "ㅏ", roman: "a" }, { char: "ㅐ", roman: "ae" }, { char: "ㅑ", roman: "ya" },
  { char: "ㅒ", roman: "yae" }, { char: "ㅓ", roman: "eo" }, { char: "ㅔ", roman: "e" },
  { char: "ㅕ", roman: "yeo" }, { char: "ㅖ", roman: "ye" }, { char: "ㅗ", roman: "o" },
  { char: "ㅘ", roman: "wa" }, { char: "ㅙ", roman: "wae" }, { char: "ㅚ", roman: "oe" },
  { char: "ㅛ", roman: "yo" }, { char: "ㅜ", roman: "u" }, { char: "ㅝ", roman: "wo" },
  { char: "ㅞ", roman: "we" }, { char: "ㅟ", roman: "wi" }, { char: "ㅠ", roman: "yu" },
  { char: "ㅡ", roman: "eu" }, { char: "ㅢ", roman: "ui" }, { char: "ㅣ", roman: "i" }
];

const JONGSEONG_LIST = [
  { char: "", label: "Aucun", roman: "" },
  { char: "ㄱ", roman: "k" }, { char: "ㄲ", roman: "k" }, { char: "ㄳ", roman: "k" },
  { char: "ㄴ", roman: "n" }, { char: "ㄵ", roman: "n" }, { char: "ㄶ", roman: "n" },
  { char: "ㄷ", roman: "t" }, { char: "ㄹ", roman: "l" }, { char: "ㄺ", roman: "k" },
  { char: "ㄻ", roman: "m" }, { char: "ㄼ", roman: "l" }, { char: "ㄽ", roman: "l" },
  { char: "ㄾ", roman: "l" }, { char: "ㄿ", roman: "p" }, { char: "ㅀ", roman: "l" },
  { char: "ㅁ", roman: "m" }, { char: "ㅂ", roman: "p" }, { char: "ㅄ", roman: "p" },
  { char: "ㅅ", roman: "t" }, { char: "ㅆ", roman: "t" }, { char: "ㅇ", roman: "ng" },
  { char: "ㅈ", roman: "t" }, { char: "ㅊ", roman: "t" }, { char: "ㅋ", roman: "k" },
  { char: "ㅌ", roman: "t" }, { char: "ㅍ", roman: "p" }, { char: "ㅎ", roman: "t" }
];
