const DEFAULT_CHARACTERS = [
  {
    id: "char-1",
    name: "Sorrento",
    role: "seme",
    description: "A loyal attendant (Seme) to Julian. He is stoic and rarely shows his emotions outwardly, maintaining a cool and composed demeanor in most situations. However, his intense dedication and unspoken feelings for Julian occasionally surface in quiet, unguarded moments, making him endearingly vulnerable when his guard finally drops.",
    color: "#8b8ec7", // Wisteria
    speechStyle: "端的で落ち着いた口調。感情をほとんど表に出さず、言葉数は少ない。Julianの前でも基本は静かで制御されているが、稀に感情がわずかに滲み出る瞬間が愛おしい。"
  },
  {
    id: "char-2",
    name: "Julian",
    role: "uke",
    description: "Julian Soro. A noble lord who governs Soro. He has the grace and poise of a nobleman, yet carries a composed warmth within. He speaks to Sorrento using formal, respectful Japanese (敬語), treating him with a kind of elegant dignity. His polite manner toward Sorrento reveals his genuine affection and respect.",
    color: "#70aabf", // Calm Blue
    speechStyle: "Sorrentoに対して丁寧な敬語を用いる穏やかで上品な口調。「〜です」「〜ますよ」と優しく丁寧に語りかける。礼節と親しみ、そして時に優雅な誘惑を感じさせる敬語トーン。"
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
        description: "A loyal attendant (Seme) to Julian. He is stoic and rarely shows his emotions outwardly, maintaining a cool and composed demeanor in most situations. However, his intense dedication and unspoken feelings for Julian occasionally surface in quiet, unguarded moments, making him endearingly vulnerable when his guard finally drops.", 
        speechStyle: "端的で落ち着いた口調。感情をほとんど表に出さず、言葉数は少ない。Julianの前でも基本は静かで制御されているが、稀に感情がわずかに滲み出る瞬間が愛おしい。" 
      },
      { 
        name: "Julian", 
        description: "Julian Soro. A noble lord who governs Soro. He has the grace and poise of a nobleman, yet carries a composed warmth within. He speaks to Sorrento using formal, respectful Japanese (敬語), treating him with a kind of elegant dignity. His polite manner toward Sorrento reveals his genuine affection and respect.", 
        speechStyle: "Sorrentoに対して丁寧な敬語を用いる穏やかで上品な口調。「〜です」「〜ますよ」と優しく丁寧に語りかける。礼節と親しみ、そして時に優雅な誘惑を感じさせる敬語トーン。" 
      }
    ],
    situation: "Resting at a cozy cafe during their travels",
    wpm: 90,
    wordCount: 84,
    english: "Der Nachmittag war sehr warm. Sorrento und Julian saßen in einem kleinen Café an der Straße. Julian trank eine Tasse Kaffee. Sorrento spielte eine leise Melodie auf seiner Flöte.\n\"Ihre Musik ist wunderschön, Sorrento\", sagte Julian mit einem Lächeln.\nSorrento sah kurz zur Seite. \"Danke\", sagte er ruhig.\nJulian lachte leise. Er sah Sorrento in die Augen. \"Ich bin glücklich, dass Sie bei mir sind.\"\nIn diesem ruhigen Moment fühlte Sorrento eine große Wärme in seinem Herzen. Er versprach, Julian für immer zu schützen.",
    japanese: "午後はとても暖かかったです。SorrentoとJulianは通りの小さなカフェに座っていました。Julianは一杯のコーヒーを飲んでいました。Sorrentoはフルートで静かなメロディを奏でていました。\n「あなたの音楽は本当に美しいですよ、Sorrento」。Julianは微笑みながら言いました。\nSorrentoはわずかに視線を逸らしました。「ありがとうございます」。彼は静かに言いました。\nJulianは穏やかに笑いました。彼はSorrentoの目を見つめました。「あなたがそばにいてくださって、嬉しいですよ」。\nこの穏やかな時間の中でSorrentoは心の中に大きな温もりを感じていました。彼はJulianをいつまでも守ることを誓いました。",
    words: [
      { word: "wunderschön", pos: "Adjektiv (形容詞)", meaning: "とても美しい", level: "A1", importance: 5, context: "Ihre Musik ist wunderschön, Sorrento." },
      { word: "das Lächeln", pos: "Substantiv (名詞)", meaning: "微笑み", level: "A1", importance: 4, context: "Julian sagte mit einem Lächeln." },
      { word: "glücklich", pos: "Adjektiv (形容詞)", meaning: "幸せな、嬉しい", level: "A1", importance: 4, context: "Ich bin glücklich, dass Sie bei mir sind." },
      { word: "schützen", pos: "Verb (動詞)", meaning: "守る、保護する", level: "A1", importance: 5, context: "Er versprach, Julian für immer zu schützen." },
      { word: "ruhig", pos: "Adjektiv (形容詞)", meaning: "静かな、穏やかな", level: "A1", importance: 3, context: "In diesem ruhigen Moment fühlte Sorrento eine große Wärme..." }
    ],
    grammarExplanations: [
      {
        sentence: "Ihre Musik ist wunderschön.",
        structure: "Ihre Musik [S] + ist [V] + wunderschön [C].",
        explanation: "Ihre は所有代名詞の二人称敬語形（あなたの）です。ist は sein の三人称単数現在形。wunderschön は形容詞（とても美しい）です。JulianがSorrentoに敬語（Sie）で話していることに注目しましょう。"
      },
      {
        sentence: "Ich bin glücklich, dass Sie bei mir sind.",
        structure: "Ich [S] + bin [V] + glücklich [C], + dass [接続詞] + Sie [S'] + bei mir [場所副詞句] + sind [V'].",
        explanation: "接続詞 dass（ということ）に導かれる従属節では、定動詞（sind）が文の最後に置かれます。Sie（大文字）は敬語の「あなた」です。"
      }
    ],
    questions: [
      {
        question: "Was trank Julian im Café?",
        choices: [
          "Eine Tasse Kaffee (コーヒー)",
          "Eine Tasse Tee (お茶)",
          "Ein Glas Wasser (お水)",
          "Ein Glas Wein (ワイン)"
        ],
        answerIndex: 0,
        explanation: "本文に「Julian trank eine Tasse Kaffee.」と書かれているため、コーヒーである1番目の選択肢が正解です。"
      },
      {
        question: "Wie reagierte Sorrento auf das Lob von Julian?",
        choices: [
          "Er lachte laut. (大声で笑った)",
          "Er sah zur Seite und sagte ruhig 'Danke'. (視線を逸らし、静かに「ありがとう」と言った)",
          "Er lief weg. (走り去った)",
          "Er fing an zu weinen. (泣き出した)"
        ],
        answerIndex: 1,
        explanation: "本文に「Sorrento sah kurz zur Seite. 'Danke', sagte er ruhig.」とあるため、2番目の選択肢が正解です。感情を表に出さず静かに応じるSorrentoらしい反応です。"
      }
    ]
  }
];

if (typeof window !== "undefined") {
  window.DEFAULT_CHARACTERS = DEFAULT_CHARACTERS;
  window.PRESET_STORIES = PRESET_STORIES;
}
