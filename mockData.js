const DEFAULT_CHARACTERS = [
  {
    id: "char-1",
    name: "Sorrento",
    role: "seme",
    description: "海魔女（セイレーン）のソレント。ジュリアン・ソロの従者であり守護者。非常にシャイで照れ屋であり、自分から強引にリードすることはないが、心からジュリアン様を護ろうとする誠実な年下攻め。",
    color: "#8b8ec7", // Wisteria
    speechStyle: "基本は丁寧で実直な敬語口調。ジュリアン様に対して誠実かつ献身的に接するが、からかわれたり距離が近くなるとすぐに赤くなって照れてしまうシャイなトーン。"
  },
  {
    id: "char-2",
    name: "Julian",
    role: "uke",
    description: "ジュリアン・ソロ。ソロ家を率いる若き貴公子。社交界に堪能で優雅で気品があり、恋愛や色ごとにも慣れている。シャイなソレントをからかったり翻弄したりする上品で余裕のある美しい年上受け。",
    color: "#70aabf", // Calm Blue
    speechStyle: "気品に溢れた優雅な言葉遣い。ソレントを信頼し、彼の照れる反応を優しく楽しむ大人びた余裕のあるトーン。"
  }
];

const PRESET_STORIES = [
  {
    id: "preset-1",
    title: "Ein ruhiger Nachmittag (穏やかな午後)",
    type: "story",
    level: "pre2",
    characters: ["Sorrento", "Julian"],
    characterProfiles: [
      { 
        name: "Sorrento", 
        description: "海魔女（セイレーン）のソレント。ジュリアン・ソロの従者であり守護者。非常にシャイで照れ屋であり、自分から強引にリードすることはないが、心からジュリアン様を護ろうとする誠実な年下攻め。", 
        speechStyle: "基本は丁寧で実直な敬語口調。ジュリアン様に対して誠実かつ献身的に接するが、からかわれたり距離が近くなるとすぐに赤くなって照れてしまうシャイなトーン。" 
      },
      { 
        name: "Julian", 
        description: "ジュリアン・ソロ。ソロ家を率いる若き貴公子。社交界に堪能で優雅で気品があり、恋愛や色ごとにも慣れている。シャイなソレントをからかったり翻弄したりする上品で余裕のある美しい年上受け。", 
        speechStyle: "気品に溢れた優雅な言葉遣い。ソレントを信頼し、彼の照れる反応を優しく楽しむ大人びた余裕のあるトーン。" 
      }
    ],
    situation: "Resting at a cozy cafe during their travels",
    wpm: 90,
    wordCount: 84,
    english: "Der Nachmittag war sehr warm. Sorrento und Julian saßen in einem kleinen Cafe an der Straße. Julian trank eine Tasse Kaffee. Sorrento spielte eine leise Melodie auf seiner Flöte.\n\"Deine Musik ist wunderschön, Sorrento\", sagte Julian mit einem Lächeln.\nSorrento wurde rot und sah nach unten. \"Danke, Julian. Ich spiele nur für dich.\"\nJulian lachte leise. Er sah Sorrento in die Augen. \"Ich bin glücklich, dass du bei mir bist.\"\nIn diesem ruhigen Moment fühlte Sorrento eine große Wärme in seinem Herzen. Er versprach, Julian für immer zu schützen.",
    japanese: "午後はとてもあたたかでした。SorrentoとJulianは通りの小さなカフェに座っていました。Julianは一杯のコーヒーを飲んでいました。Sorrentoはフルートで静かなメロディを奏でていました。\n「君の音楽は本当に美しいね、Sorrento」Julianは微笑みながら言いました。\nSorrentoは赤くなってうつむきました。「ありがとうございます、Julian。私はただ、あなたのために奏でているのです」\nJulianは静かに笑いました。彼はSorrentoの目を見つめました。「君がそばにいてくれて嬉しいよ」\nこの穏やかな瞬間、Sorrentoは胸の中に大きな温もりを感じていました。彼はJulianを永遠に守ることを誓いました。",
    words: [
      { word: "wunderschön", pos: "Adjektiv (形容詞)", meaning: "とても美しい", level: "A1", importance: 5, context: "Deine Musik ist wunderschön, Sorrento." },
      { word: "das Lächeln", pos: "Substantiv (名詞)", meaning: "微笑み", level: "A1", importance: 4, context: "Julian sagte mit einem Lächeln." },
      { word: "glücklich", pos: "Adjektiv (形容詞)", meaning: "幸せな、嬉しい", level: "A1", importance: 4, context: "Ich bin glücklich, dass du bei mir bist." },
      { word: "schützen", pos: "Verb (動詞)", meaning: "守る、保護する", level: "A1", importance: 5, context: "Er versprach, Julian für immer zu schützen." },
      { word: "ruhig", pos: "Adjektiv (形容詞)", meaning: "静かな、穏やかな", level: "A1", importance: 3, context: "In diesem ruhigen Moment fühlte Sorrento eine große Wärme..." }
    ],
    grammarExplanations: [
      {
        sentence: "Deine Musik ist wunderschön.",
        structure: "Deine Musik [S] + ist [V] + wunderschön [C].",
        explanation: "Deine は所有代名詞の二人称単数形（君の）で、ist は sein の三人称単数現在形、wunderschön は形容詞（とても美しい）です。"
      },
      {
        sentence: "Ich bin glücklich, dass du bei mir bist.",
        structure: "Ich [S] + bin [V] + glücklich [C], + dass [接続詞] + du [S'] + bei mir [前置詞句] + bist [V'].",
        explanation: "接続詞 dass（〜ということ）に導かれる従属節（副文）では、定動詞（bist）が文の最後に置かれます。"
      }
    ],
    questions: [
      {
        question: "Was trank Julian im Cafe?",
        choices: [
          "Eine Tasse Kaffee (コーヒー)",
          "Eine Tasse Tee (紅茶)",
          "Ein Glas Wasser (お水)",
          "Ein Glas Wein (ワイン)"
        ],
        answerIndex: 0,
        explanation: "本文に「Julian trank eine Tasse Kaffee.」と書かれているため、コーヒーである1番目の選択肢が正解です。"
      },
      {
        question: "Wie reagierte Sorrento, als Julian ihn lobte?",
        choices: [
          "Er wurde wütend. (怒った)",
          "Er wurde rot. (赤くなって照れた)",
          "Er lief weg. (走り去った)",
          "Er fing an zu weinen. (泣き出した)"
        ],
        answerIndex: 1,
        explanation: "本文に「Sorrento wurde rot und sah nach unten.」とあるため、顔を赤くして照れた2番目の選択肢が正解です。"
      }
    ]
  }
];

if (typeof window !== "undefined") {
  window.DEFAULT_CHARACTERS = DEFAULT_CHARACTERS;
  window.PRESET_STORIES = PRESET_STORIES;
}
