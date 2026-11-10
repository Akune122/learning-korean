// Base de données pédagogique complète : Hangeul, Règles de lecture, Grammaire structurée, Vocabulaire thématique et Exercices

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

// RÈGLES DE PRONONCIATION INDISPENSABLES (Ce que les applis classiques n'expliquent pas)
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
// COURS DE GRAMMAIRE FONDAMENTALE STRUCTURÉS
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
De plus, en coréen, on colle des petits marqueurs appelés <strong>particules</strong> juste après chaque nom pour indiquer son rôle (qui fait l'action, sur quoi porte l'action, où ça se passe).`,
    keyPoints: [
      "Le verbe (ou l'adjectif) est le roi de la phrase : il est TOUJOURS le dernier mot.",
      "Il n'y a ni genre (masculin/féminin), ni articles (le, la, un, une), ni conjugaison selon la personne (je, tu, il utilisent exactement la même forme du verbe !).",
      "Dans la vie de tous les jours, si le sujet est évident (« je » ou « tu »), les Coréens l'omettent tout simplement."
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
      },
      {
        kr: "사과를 먹어요.",
        roman: "Sa-gwa-reul meo-geo-yo.",
        fr: "(Je) mange une pomme. (Plus naturel à l'oral !)",
        breakdown: [
          { part: "사과", role: "Nom", meaning: "Pomme" },
          { part: "를", role: "Particule Objet", meaning: "(objet)" },
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
    explanation: `En coréen, le verbe « être » (<strong>이다</strong>) ne s'écrit pas séparément : <strong>il se colle directement à la fin du nom</strong> !<br><br>
Sa forme au présent poli dépend uniquement de la dernière lettre du nom qui précède :
<br>• Si le nom se termine par une <strong>consonne (Batchim)</strong> → on ajoute <strong>이에요</strong> (<em>i-e-yo</em>).
<br>• Si le nom se termine par une <strong>voyelle (sans Batchim)</strong> → on ajoute <strong>예요</strong> (<em>ye-yo</em>).`,
    keyPoints: [
      "Avec Batchim (consonne en bas) : 학생 (étudiant, finit par ㅇ) → 학생이에요.",
      "Sans Batchim (finit par voyelle) : 의사 (médecin, finit par ㅏ) → 의사예요.",
      "Pour poser une question, il suffit de monter l'intonation à la fin : 학생이에요? (Êtes-vous étudiant ?)."
    ],
    examples: [
      {
        kr: "저는 학생이에요.",
        roman: "Jeo-neun hak-saeng-i-e-yo.",
        fr: "Je suis étudiant(e).",
        breakdown: [
          { part: "저는", role: "Thème", meaning: "Moi / Je" },
          { part: "학생", role: "Nom (avec Batchim ㅇ)", meaning: "étudiant" },
          { part: "이에요", role: "Verbe être", meaning: "suis / est" }
        ]
      },
      {
        kr: "저는 의사예요.",
        roman: "Jeo-neun ui-sa-ye-yo.",
        fr: "Je suis médecin.",
        breakdown: [
          { part: "저는", role: "Thème", meaning: "Moi / Je" },
          { part: "의사", role: "Nom (finit par voyelle ㅏ)", meaning: "médecin" },
          { part: "예요", role: "Verbe être", meaning: "suis / est" }
        ]
      },
      {
        kr: "이거는 물이에요.",
        roman: "I-geo-neun mu-ri-e-yo.",
        fr: "Ceci est de l'eau.",
        breakdown: [
          { part: "이거는", role: "Thème", meaning: "Ceci" },
          { part: "물", role: "Nom (Batchim ㄹ)", meaning: "eau" },
          { part: "이에요", role: "Verbe être", meaning: "est" }
        ]
      }
    ]
  },
  {
    id: "gram_3",
    level: "Base 3",
    title: "Les Particules de Thème (은/는) et de Sujet (이/가)",
    subtitle: "Comprendre la différence entre 은/는 et 이/가 une bonne fois pour toutes",
    formula: "Thème : Consonne + 은 / Voyelle + 는   |   Sujet : Consonne + 이 / Voyelle + 가",
    explanation: `C'est LE point qui bloque les débutants alors que la mécanique est très simple :<br><br>
<strong>1. 은 / 는 (Particule de Thème / Contraste)</strong> : signifie <em>« En ce qui concerne X... / Quant à X... »</em>. On l'utilise pour présenter un sujet général, parler de soi (<strong>저는</strong> = quant à moi) ou faire une comparaison.<br>
• Nom finissant par consonne + <strong>은</strong> (ex: 한국<strong>은</strong>)<br>
• Nom finissant par voyelle + <strong>는</strong> (ex: 저<strong>는</strong>)<br><br>
<strong>2. 이 / 가 (Particule de Sujet grammatical)</strong> : met le projecteur sur le sujet précis d'une action ou d'un état (souvent avec des adjectifs ou « il y a / il n'y a pas »).<br>
• Nom finissant par consonne + <strong>이</strong> (ex: 물<strong>이</strong>)<br>
• Nom finissant par voyelle + <strong>가</strong> (ex: 커피<strong>가</strong>)`,
    keyPoints: [
      "Astuce sonore : quand le mot finit par une consonne, on met une particule qui commence par une voyelle (은, 이) pour que la liaison soit fluide !",
      "Avec les adjectifs descriptifs (c'est bon, c'est grand, c'est cher) et avec 있어요/없어요 (avoir/il y a), on utilise presque toujours 이/가."
    ],
    examples: [
      {
        kr: "저는 프랑스 사람이에요.",
        roman: "Jeo-neun peu-rang-seu sa-ra-mi-e-yo.",
        fr: "(Quant à moi) Je suis Français(e).",
        breakdown: [
          { part: "저", role: "Pronom (voyelle)", meaning: "Je" },
          { part: "는", role: "Particule Thème", meaning: "quant à" },
          { part: "프랑스 사람", role: "Nom", meaning: "personne française" },
          { part: "이에요", role: "Verbe être", meaning: "suis" }
        ]
      },
      {
        kr: "커피가 맛있어요.",
        roman: "Keo-pi-ga ma-si-sseo-yo.",
        fr: "Le café est délicieux.",
        breakdown: [
          { part: "커피", role: "Nom (voyelle)", meaning: "Café" },
          { part: "가", role: "Particule Sujet", meaning: "(sujet)" },
          { part: "맛있어요", role: "Adjectif conjugué", meaning: "est délicieux" }
        ]
      }
    ]
  },
  {
    id: "gram_4",
    level: "Base 4",
    title: "La Particule d'Objet (을 / 를) : Faire une action sur quelque chose",
    subtitle: "Manger quelque chose, boire quelque chose, regarder quelque chose",
    formula: "Nom (avec Batchim) + 을 (eul)   |   Nom (sans Batchim) + 를 (reul)",
    explanation: `Dès qu'un verbe d'action porte sur un objet direct (manger <em>du riz</em>, boire <em>du café</em>, apprendre <em>le coréen</em>), on colle la particule d'objet <strong>을</strong> ou <strong>를</strong> juste après ce nom.<br><br>
• Si le nom finit par une <strong>consonne (Batchim)</strong> → <strong>을</strong> (ex: 밥<strong>을</strong> = le riz, 물<strong>을</strong> = l'eau).<br>
• Si le nom finit par une <strong>voyelle (sans Batchim)</strong> → <strong>를</strong> (ex: 커피<strong>를</strong> = le café, 한국어<strong>를</strong> = le coréen).`,
    keyPoints: [
      "Même logique : Consonne finale -> 을 (commence par voyelle ㅇ) ; Voyelle finale -> 를 (commence par consonne ㄹ).",
      "Ordre invariable : [Objet + 을/를] + [Verbe d'action conjugué]."
    ],
    examples: [
      {
        kr: "밥을 먹어요.",
        roman: "Ba-beul meo-geo-yo.",
        fr: "Je mange du riz (un repas).",
        breakdown: [
          { part: "밥", role: "Nom (Batchim ㅂ)", meaning: "riz / repas" },
          { part: "을", role: "Particule Objet", meaning: "(objet direct)" },
          { part: "먹어요", role: "Verbe", meaning: "mange" }
        ]
      },
      {
        kr: "커피를 마셔요.",
        roman: "Keo-pi-reul ma-syeo-yo.",
        fr: "Je bois du café.",
        breakdown: [
          { part: "커피", role: "Nom (voyelle)", meaning: "café" },
          { part: "를", role: "Particule Objet", meaning: "(objet direct)" },
          { part: "마셔요", role: "Verbe", meaning: "bois" }
        ]
      },
      {
        kr: "한국어를 공부해요.",
        roman: "Han-gu-geo-reul gong-bu-hae-yo.",
        fr: "J'étudie le coréen.",
        breakdown: [
          { part: "한국어", role: "Nom (voyelle)", meaning: "coréen" },
          { part: "를", role: "Particule Objet", meaning: "(objet direct)" },
          { part: "공부해요", role: "Verbe", meaning: "étudie" }
        ]
      }
    ]
  },
  {
    id: "gram_5",
    level: "Base 5",
    title: "Conjuguer au Présent Poli : -아요 / -어요 / -해요",
    subtitle: "La règle unique qui permet de conjuguer 100 % des verbes et adjectifs coréens",
    formula: "Voyelle ㅏ ou ㅗ → +아요   |   Autre voyelle → +어요   |   Verbe en 하다 → 해요",
    explanation: `Dans le dictionnaire, tous les verbes et adjectifs coréens finissent par <strong>-다</strong> (ex: 가다 = aller, 먹다 = manger, 공부하다 = étudier).<br>
Pour les conjuguer au présent poli (le style <strong>해요체</strong> utilisé 90 % du temps dans la vie courante) :<br><br>
<strong>Étape 1 :</strong> Enlevez <strong>-다</strong> pour obtenir le radical.<br>
<strong>Étape 2 :</strong> Regardez la dernière voyelle du radical :<br>
1️⃣ Si c'est <strong>ㅏ</strong> ou <strong>ㅗ</strong> → ajoutez <strong>-아요</strong> (ex: 가다 → 가 + 아요 = <strong>가요</strong> ; 보다 → 보 + 아요 = <strong>봐요</strong>).<br>
2️⃣ Si c'est <strong>n'importe quelle autre voyelle</strong> (ㅓ, ㅜ, ㅡ, ㅣ...) → ajoutez <strong>-어요</strong> (ex: 먹다 → 먹 + 어요 = <strong>먹어요</strong> ; 마시다 → 마시 + 어요 = <strong>마셔요</strong>).<br>
3️⃣ Si le verbe finit par <strong>하다</strong> (faire) → il devient toujours <strong>해요</strong> (ex: 공부하다 → <strong>공부해요</strong> ; 사랑하다 → <strong>사랑해요</strong>).`,
    keyPoints: [
      "La même forme sert pour Je, Tu, Il/Elle, Nous, Vous, Ils/Elles ! « 가요 » veut dire aussi bien « je vais », « tu vas » que « nous allons ».",
      "Quand il n'y a pas de Batchim, les voyelles fusionnent : 가+아요 = 가요, 오+아요 = 와요 (venir), 마시+어요 = 마셔요 (boire)."
    ],
    examples: [
      {
        kr: "가다 → 가요 / 오다 → 와요",
        roman: "ga-da → ga-yo / o-da → wa-yo",
        fr: "Aller → Je vais / Venir → Je viens (Voyelles ㅏ et ㅗ → +아요)",
        breakdown: [
          { part: "가다", role: "Infinitif", meaning: "Aller" },
          { part: "가요", role: "Présent poli", meaning: "vais / vas / va" },
          { part: "오다", role: "Infinitif", meaning: "Venir (ㅗ+ㅏ=ㅘ)" },
          { part: "와요", role: "Présent poli", meaning: "viens / vient" }
        ]
      },
      {
        kr: "먹다 → 먹어요 / 읽다 → 읽어요",
        roman: "meok-da → meo-geo-yo / ik-da → il-geo-yo",
        fr: "Manger → Je mange / Lire → Je lis (Autres voyelles → +어요)",
        breakdown: [
          { part: "먹", role: "Radical (voyelle ㅓ)", meaning: "mang-" },
          { part: "어요", role: "Terminaison", meaning: "présent poli" }
        ]
      },
      {
        kr: "공부하다 → 공부해요 / 일하다 → 일해요",
        roman: "gong-bu-ha-da → gong-bu-hae-yo / il-ha-da → i-rae-yo",
        fr: "Étudier → J'étudie / Travailler → Je travaille (하다 → 해요)",
        breakdown: [
          { part: "공부", role: "Nom", meaning: "étude" },
          { part: "해요", role: "하다 conjugué", meaning: "fais" }
        ]
      }
    ]
  },
  {
    id: "gram_6",
    level: "Base 6",
    title: "Les Particules de Lieu : 에 (Destination/Présence) vs 에서 (Lieu d'action)",
    subtitle: "Savoir dire « Je vais à Séoul » vs « J'habite / Je travaille à Séoul »",
    formula: "Lieu + 에 (Aller à / Être à)   |   Lieu + 에서 (Faire une action DANS un lieu)",
    explanation: `En français, le mot « à » ou « dans » sert à tout. En coréen, on distingue deux cas très précis :<br><br>
<strong>1. Lieu + 에 (e)</strong> : indique une <strong>destination</strong> (avec 가요 = aller, 와요 = venir) ou une <strong>présence statique</strong> (avec 있어요 = se trouver, 없어요 = ne pas être là).<br>
<strong>2. Lieu + 에서 (e-seo)</strong> : indique l'endroit où se déroule une <strong>action active</strong> (manger, travailler, étudier, acheter, voir un ami...).`,
    keyPoints: [
      "Astuce infaillible : si le verbe est 가요 (aller), 와요 (venir) ou 있어요 (être présent), utilisez 에. Si c'est une action dynamique (manger, étudier, travailler), utilisez 에서 !",
      "에서 signifie aussi « depuis / en provenance de » : 프랑스에서 왔어요 = Je viens de France."
    ],
    examples: [
      {
        kr: "학교에 가요.",
        roman: "Hak-gyo-e ga-yo.",
        fr: "Je vais à l'école. (Destination → 에)",
        breakdown: [
          { part: "학교", role: "Nom", meaning: "école" },
          { part: "에", role: "Particule Destination", meaning: "à / vers" },
          { part: "가요", role: "Verbe déplacement", meaning: "vais" }
        ]
      },
      {
        kr: "학교에서 공부해요.",
        roman: "Hak-gyo-e-seo gong-bu-hae-yo.",
        fr: "J'étudie à l'école. (Action active dans un lieu → 에서)",
        breakdown: [
          { part: "학교", role: "Nom", meaning: "école" },
          { part: "에서", role: "Particule Lieu d'action", meaning: "dans / à" },
          { part: "공부해요", role: "Verbe d'action", meaning: "étudie" }
        ]
      }
    ]
  },
  {
    id: "gram_7",
    level: "Base 7",
    title: "Avoir / Il y a (있어요 / 없어요) & La Négation (안)",
    subtitle: "Exprimer la possession, la présence et dire « je ne fais pas »",
    formula: "Nom + 이/가 있어요 (J'ai / Il y a)   |   안 + Verbe (Ne pas + verbe)",
    explanation: `<strong>1. 있어요 (i-sseo-yo) & 없어요 (eop-seo-yo)</strong> :<br>
En coréen, le verbe « avoir » et l'expression « il y a » sont le même mot : <strong>있다 → 있어요</strong>.<br>
Son opposé exact (« ne pas avoir / il n'y a pas ») est <strong>없다 → 없어요</strong>.<br><br>
<strong>2. Faire une phrase négative avec 안 (an)</strong> :<br>
Pour dire « je ne mange pas », « je n'y vais pas », placez simplement <strong>안</strong> juste devant le verbe conjugué : <strong>안 먹어요</strong> (je ne mange pas), <strong>안 가요</strong> (je n'y vais pas).`,
    keyPoints: [
      "Attention : pour les verbes en Noun + 해요 (comme 공부해요), « 안 » se place juste devant 해요 : 공부 안 해요 (je n'étudie pas).",
      "Avec 있어요 / 없어요, l'objet possédé prend la particule 이 / 가 : 시간이 있어요 (J'ai le temps), 돈이 없어요 (Je n'ai pas d'argent)."
    ],
    examples: [
      {
        kr: "질문이 있어요.",
        roman: "Jil-mu-ni i-sseo-yo.",
        fr: "J'ai une question. (Littéralement : Une question existe)",
        breakdown: [
          { part: "질문", role: "Nom (Batchim ㄴ)", meaning: "question" },
          { part: "이", role: "Particule Sujet", meaning: "(sujet)" },
          { part: "있어요", role: "Verbe d'existence", meaning: "il y a / j'ai" }
        ]
      },
      {
        kr: "오늘 안 가요.",
        roman: "O-neul an ga-yo.",
        fr: "Aujourd'hui, je n'y vais pas.",
        breakdown: [
          { part: "오늘", role: "Temps", meaning: "Aujourd'hui" },
          { part: "안", role: "Négation", meaning: "ne... pas" },
          { part: "가요", role: "Verbe", meaning: "vais" }
        ]
      }
    ]
  }
];

// ==========================================
// VOCABULAIRE STRUCTURÉ PAR THÈMES ESSENTIELS
// ==========================================
const VOCAB_CATEGORIES = [
  {
    id: "voc_survival",
    title: "1. Salutations & Expressions indispensables",
    icon: "👋",
    description: "Les vraies expressions utilisées au quotidien en Corée avec leur sens littéral.",
    words: [
      { kr: "안녕하세요", roman: "an-nyeong-ha-se-yo", fr: "Bonjour / Bonsoir (poli)", note: "Litt. « Êtes-vous en paix ? » — S'utilise toute la journée." },
      { kr: "감사합니다", roman: "gam-sa-ham-ni-da", fr: "Merci (formel)", note: "Le ㄱ de 합 devant ㄴ se prononce [m] -> gam-sa-ham-ni-da." },
      { kr: "고마워요", roman: "go-ma-wo-yo", fr: "Merci (poli courant)", note: "Plus chaleureux au quotidien que 감사합니다." },
      { kr: "네 / 아니요", roman: "ne / a-ni-yo", fr: "Oui / Non", note: "« 네 » sert aussi à dire « je vous écoute / d'accord »." },
      { kr: "죄송합니다", roman: "joe-song-ham-ni-da", fr: "Je suis désolé(e) / Pardon", note: "Pour s'excuser poliment." },
      { kr: "잠시만요", roman: "jam-si-man-yo", fr: "Excusez-moi (pour passer) / Un instant SVP", note: "Litt. « Juste un petit moment »." },
      { kr: "주세요", roman: "ju-se-yo", fr: "Donnez-moi ... s'il vous plaît", note: "Magique au restaurant : 물 주세요 = De l'eau s'il vous plaît !" },
      { kr: "괜찮아요", roman: "gwaen-cha-na-yo", fr: "Ça va / C'est bon / Pas de souci", note: "S'utilise avec une intonation montante pour demander « Ça va ? »." },
      { kr: "안녕히 가세요", roman: "an-nyeong-hi ga-se-yo", fr: "Au revoir (dit à quelqu'un qui part)", note: "Litt. « Allez en paix »." },
      { kr: "안녕히 계세요", roman: "an-nyeong-hi gye-se-yo", fr: "Au revoir (dit quand VOUS partez)", note: "Litt. « Restez en paix »." }
    ]
  },
  {
    id: "voc_people",
    title: "2. Pronoms, Personnes & Identité",
    icon: "🧑‍🤝‍🧑",
    description: "Comment parler de soi, des autres et des métiers.",
    words: [
      { kr: "저 / 나", roman: "jeo / na", fr: "Je, Moi (poli / familier)", note: "Avec 는 : 저는 (jeo-neun) / 나는 (na-neun)." },
      { kr: "우리", roman: "u-ri", fr: "Nous / Notre", note: "Les Coréens disent « notre pays » (우리 나라) ou « notre maison » (우리 집) au lieu de « mon »." },
      { kr: "사람", roman: "sa-ram", fr: "Personne / Être humain", note: "Pays + 사람 = Nationalité (프랑스 사람 = Français)." },
      { kr: "친구", roman: "chin-gu", fr: "Ami(e)", note: "En Corée, réservé en général aux personnes nées la même année." },
      { kr: "학생", roman: "hak-saeng", fr: "Étudiant(e) / Élève", note: "학 (étude) + 생 (personne/vie)." },
      { kr: "선생님", roman: "seon-saeng-nim", fr: "Professeur / Enseignant(e)", note: "-님 est un suffixe de grand respect." },
      { kr: "회사원", roman: "hoe-sa-won", fr: "Employé(e) de bureau", note: "회사 (entreprise) + 원 (membre)." },
      { kr: "의사", roman: "ui-sa", fr: "Médecin", note: "Sans Batchim -> 의사예요 (Je suis médecin)." },
      { kr: "이름", roman: "i-reum", fr: "Nom / Prénom", note: "이름이 뭐예요? = Quel est votre nom ?" },
      { kr: "한국 / 프랑스", roman: "han-guk / peu-rang-seu", fr: "Corée / France", note: "한국어 = la langue coréenne, 프랑스어 = le français." }
    ]
  },
  {
    id: "voc_verbs",
    title: "3. Les Verbes & Adjectifs indispensables",
    icon: "⚡",
    description: "Donnés avec leur infinitif (-다) ET leur forme conjuguée directe au présent poli (-아요/-어요) !",
    words: [
      { kr: "가다 → 가요", roman: "ga-da → ga-yo", fr: "Aller → Je vais", note: "Voyelle ㅏ -> +아요 (가요)." },
      { kr: "오다 → 와요", roman: "o-da → wa-yo", fr: "Venir → Je viens", note: "ㅗ + ㅏ요 fusionnent en 와요." },
      { kr: "먹다 → 먹어요", roman: "meok-da → meo-geo-yo", fr: "Manger → Je mange", note: "Voyelle ㅓ -> +어요." },
      { kr: "마시다 → 마셔요", roman: "ma-si-da → ma-syeo-yo", fr: "Boire → Je bois", note: "시 + 어요 fusionnent en 셔요." },
      { kr: "보다 → 봐요", roman: "bo-da → bwa-yo", fr: "Voir / Regarder → Je regarde", note: "영화를 봐요 = Je regarde un film." },
      { kr: "하다 → 해요", roman: "ha-da → hae-yo", fr: "Faire → Je fais", note: "Sert à former des centaines de verbes !" },
      { kr: "공부하다 → 공부해요", roman: "gong-bu-ha-da → gong-bu-hae-yo", fr: "Étudier → J'étudie", note: "공부 (étude) + 하다 (faire)." },
      { kr: "일하다 → 일해요", roman: "il-ha-da → i-rae-yo", fr: "Travailler → Je travaille", note: "일 (travail) + 하다 (faire)." },
      { kr: "좋아하다 → 좋아해요", roman: "jo-a-ha-da → jo-a-hae-yo", fr: "Aimer / Apprécier → J'aime", note: "Avec la particule 을/를 : 한국을 좋아해요." },
      { kr: "맛있다 → 맛있어요", roman: "ma-sit-da → ma-si-sseo-yo", fr: "Être délicieux → C'est bon", note: "맛 (goût) + 있다 (avoir)." },
      { kr: "좋다 → 좋아요", roman: "jo-ta → jo-a-yo", fr: "Être bon / bien → C'est super", note: "Le ㅎ est muet dans 좋아요 (jo-a-yo)." },
      { kr: "비싸다 → 비싸요", roman: "bi-ssa-da → bi-ssa-yo", fr: "Être cher → C'est cher", note: "Opposé : 싸다 -> 싸요 (pas cher)." }
    ]
  },
  {
    id: "voc_daily",
    title: "4. Quotidien, Nourriture, Lieux & Temps",
    icon: "🍜",
    description: "Les noms les plus utiles pour construire vos premières vraies phrases.",
    words: [
      { kr: "물", roman: "mul", fr: "Eau", note: "물을 마셔요 = Je bois de l'eau." },
      { kr: "밥", roman: "bap", fr: "Riz cuit / Repas", note: "밥 먹었어요? = As-tu mangé ? (façon coréenne de dire « Comment ça va ? »)" },
      { kr: "커피", roman: "keo-pi", fr: "Café", note: "커피 한 잔 주세요 = Un café s'il vous plaît." },
      { kr: "집", roman: "jip", fr: "Maison / Chez-soi", note: "집에 가요 = Je rentre à la maison." },
      { kr: "학교", roman: "hak-gyo", fr: "École / Université", note: "학교에서 공부해요 = J'étudie à l'école." },
      { kr: "회사", roman: "hoe-sa", fr: "Entreprise / Bureau", note: "회사에 가요 = Je vais au travail." },
      { kr: "식당", roman: "sik-ttang", fr: "Restaurant", note: "식당에서 밥을 먹어요 = Je mange au restaurant." },
      { kr: "오늘", roman: "o-neul", fr: "Aujourd'hui", note: "Pas besoin de particule après 오늘 !" },
      { kr: "내일", roman: "nae-il", fr: "Demain", note: "내일 봐요 ! = À demain ! (Litt. Voyons-nous demain)" },
      { kr: "지금", roman: "ji-geum", fr: "Maintenant", note: "지금 뭐 해요? = Que fais-tu maintenant ?" }
    ]
  },
  {
    id: "voc_numbers",
    title: "5. Les Nombres (Sino-Coréens vs Natifs Coréens)",
    icon: "🔢",
    description: "En coréen, il existe deux systèmes : Sino-coréen (dates, prix, minutes, téléphone) et Natif (heures, âge, compter des objets).",
    words: [
      { kr: "일 (1) / 하나 (1)", roman: "il / ha-na", fr: "Un (Sino / Natif)", note: "Sino : 일 (1), Natif : 하나 (devient 한 devant un compteur)." },
      { kr: "이 (2) / 둘 (2)", roman: "i / dul", fr: "Deux (Sino / Natif)", note: "Sino : 이, Natif : 둘 (devient 두 devant un compteur)." },
      { kr: "삼 (3) / 셋 (3)", roman: "sam / set", fr: "Trois (Sino / Natif)", note: "Sino : 삼, Natif : 셋 (devient 세 devant un compteur)." },
      { kr: "사 (4) / 넷 (4)", roman: "sa / net", fr: "Quatre (Sino / Natif)", note: "Sino : 사, Natif : 넷 (devient 네 devant un compteur)." },
      { kr: "오 (5) / 다섯 (5)", roman: "o / da-seot", fr: "Cinq (Sino / Natif)", note: "Sino : 오, Natif : 다섯." },
      { kr: "십 (10) / 열 (10)", roman: "sip / yeol", fr: "Dix (Sino / Natif)", note: "20 en sino = 이십 (2x10). 11 = 십일 (10+1)." },
      { kr: "백 (100) / 천 (1000) / 만 (10 000)", roman: "baek / cheon / man", fr: "100 / 1 000 / 10 000 (Sino)", note: "Pour les prix en Wons (원) : 오천 원 = 5 000 wons." }
    ]
  }
];

// ==========================================
// BANQUE D'EXERCICES DE GRAMMAIRE & PHRASES
// ==========================================
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
    explanation: "« 학생 » (étudiant) se termine par la consonne ㅇ (Batchim) : on utilise donc « 이에요 »."
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
    explanation: "« 의사 » (médecin) se termine par la voyelle ㅏ (sans Batchim) : on utilise donc « 예요 »."
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
    explanation: "« 물 » (eau) est l'objet du verbe boire et finit par la consonne ㄹ (Batchim) → particule d'objet « 을 »."
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
    explanation: "« 커피 » (café) est l'objet direct et finit par la voyelle ㅣ (sans Batchim) → particule d'objet « 를 »."
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
    explanation: "Avec le verbe de déplacement « 가요 » (aller), la destination est toujours marquée par « 에 »."
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
    explanation: "« 공부해요 » (étudier) est une action dynamique qui se déroule dans un lieu → on utilise « 에서 »."
  },
  {
    id: "gex_7",
    type: "fill_particle",
    category: "Présent Poli (-아요 / -어요 / -해요)",
    promptFr: "Je mange un repas (du riz). (Verbe : 먹다)",
    sentenceBefore: "밥을 ",
    sentenceAfter: ".",
    audioFull: "밥을 먹어요.",
    correct: "먹어요",
    options: ["먹어요", "먹아요", "먹해요", "먹다"],
    explanation: "Le radical « 먹 » contient la voyelle ㅓ (qui n'est ni ㅏ ni ㅗ) : on ajoute donc « -어요 » → 먹어요."
  },
  {
    id: "gex_8",
    type: "sentence_order",
    category: "Construction de phrase (Ordre S-O-V)",
    promptFr: "Remettez les blocs dans l'ordre coréen : « Je mange du riz au restaurant. »",
    audioFull: "식당에서 밥을 먹어요.",
    blocks: ["식당에서", "밥을", "먹어요"],
    distractors: ["학교에"],
    explanation: "En coréen : Lieu d'action (식당에서) + Objet (밥을) + Verbe à la toute fin (먹어요)."
  },
  {
    id: "gex_9",
    type: "sentence_order",
    category: "Construction de phrase (Ordre S-O-V)",
    promptFr: "Construisez la phrase : « J'étudie le coréen aujourd'hui. »",
    audioFull: "오늘 한국어를 공부해요.",
    blocks: ["오늘", "한국어를", "공부해요"],
    distractors: ["마셔요"],
    explanation: "Temps (오늘 = aujourd'hui) + Objet avec 를 (한국어를 = le coréen) + Verbe à la fin (공부해요 = j'étudie)."
  },
  {
    id: "gex_10",
    type: "sentence_order",
    category: "Construction de phrase (Ordre S-O-V)",
    promptFr: "Construisez la phrase : « Aujourd'hui, je ne vais pas au travail (à l'entreprise). »",
    audioFull: "오늘 회사에 안 가요.",
    blocks: ["오늘", "회사에", "안", "가요"],
    distractors: ["먹어요"],
    explanation: "Temps (오늘) + Destination (회사에) + Négation (안) placée juste devant le verbe final (가요)."
  }
];

// Données pour le Laboratoire de Syllabes
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
