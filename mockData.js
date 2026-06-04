const DEFAULT_CHARACTERS = [
  {
    id: "char-1",
    name: "Akira",
    role: "cheerful",
    description: "34歳の営業係長。優秀で仕事ができるが、上司のKenjiに対して並々ならぬ執着を抱き、時に甘え、時に強引に迫る年下攻め。",
    color: "#f59e0b", // Amber
    speechStyle: "基本は丁寧な部下口調だが、二人きりになると熱情が漏れる大人のトーン。相手を「部長」と呼ぶ。"
  },
  {
    id: "char-2",
    name: "Kenji",
    role: "cool",
    description: "48歳の営業部長。威厳があって部下思いだが、優秀な年下部下Akiraの好意や独占欲に翻弄され、普段のクールさを崩してしまう可愛い年上受け。",
    color: "#0d9488", // Teal
    speechStyle: "包容力のある大人の口調、Akiraの猛アプローチに少しタジタジしつつも受け入れる態度。"
  }
];

const PRESET_STORIES = [
  {
    id: "preset-1",
    title: "Late Night Coffee (深夜の温かいコーヒー)",
    type: "story",
    level: "pre2",
    characters: ["Akira", "Kenji"],
    characterProfiles: [
      { name: "Akira", description: "34歳の営業係長。優秀で仕事ができるが、上司のKenjiに対して並々ならぬ執着を抱き、時に甘え、時に強引に迫る年下攻め。", speechStyle: "基本は丁寧な部下口調だが、二人きりになると熱情が漏れる大人のトーン。相手を「部長」と呼ぶ。" },
      { name: "Kenji", description: "48歳の営業部長。威厳があって部下思いだが、優秀な年下部下Akiraの好意や独占欲に翻弄され、普段のクールさを崩してしまう可愛い年上受け。", speechStyle: "包容力のある大人の口調、Akiraの猛アプローチに少しタジタジしつつも受け入れる態度。" }
    ],
    situation: "Working late at the office together",
    wpm: 110,
    wordCount: 171,
    english: "The office was quiet after nine o'clock. Akira noticed that Kenji, the department director, was still rubbing his eyes at his desk. Kenji looked exhausted, but he continued working on the screen. Akira walked to the breakroom and prepared two cups of warm coffee. He placed a cup on Kenji's desk with a gentle smile.\n\"You should take a short break, Director. You look exhausted,\" Akira said softly.\nKenji was surprised and looked up. \"I'm fine, Akira. I just need to finish this report before tomorrow.\"\n\"No, I hesitated to interrupt you, but you need rest,\" Akira insisted, leaning closer. \"I prepared this for us.\"\nKenji smiled, his cheeks slightly warm. \"You are always so generous, Akira. Thank you.\"\n\"I appreciate your hard work, Kenji,\" Akira whispered, using his first name for a moment.\nAlthough Kenji pretended to focus on his document, he secretly watched Akira drink the coffee. In the silent room, Kenji felt Akira's passionate eyes and warm kindness melted his stress.",
    japanese: "夜9時を過ぎると、オフィスは静まり返っていました。アキラは、営業部長のケンジがデスクでまだ目をこすっていることに気づきました。ケンジは疲れ切っているように見えましたが、画面に向かって仕事を続けていました。アキラは休憩室へ歩いていき、温かいコーヒーを2杯用意しました。彼は優しい笑みを浮かべ、ケンジのデスクにカップを置きました。\n「少し休憩を取るべきですよ、部長。お疲れのように見えます」とアキラは静かに言いました。\nケンジは驚いて顔を上げました。「大丈夫だ、アキラ。明日までにこのレポートを終わらせるだけでいいんだ」\n「いいえ、お仕事の邪魔をするのをためらいましたが、休息が必要です」アキラは身を乗り出して主張しました。「二人のために用意したんです」\nケンジは微笑み、頬を少し上気させました。「お前はいつも本当に優しいな、アキラ。ありがとう」\n「部長の頑張りに、いつも感謝していますよ、ケンジさん」アキラは一瞬だけファーストネームで呼び、囁きました。\nケンジは書類に集中するふりをしていましたが、アキラがコーヒーを飲むのを密かに見守っていました。静まり返った部屋の中で、ケンジはアキラの情熱的な視線と温かい優しさが、自分のストレスを溶かしていくのを感じていました。",
    words: [
      { word: "exhausted", pos: "adjective", meaning: "疲れ切った、消耗した", level: "準2級", importance: 4, context: "Kenji looked exhausted, but he continued working on the screen." },
      { word: "hesitated", pos: "verb", meaning: "ためらった、躊躇した", level: "準2級", importance: 4, context: "No, I hesitated to interrupt you, but you need rest." },
      { word: "generous", pos: "adjective", meaning: "寛大な、思いやりのある、気前の良い", level: "準2級", importance: 3, context: "You are always so generous, Akira. Thank you." },
      { word: "appreciate", pos: "verb", meaning: "感謝する、正しく評価する", level: "準2級", importance: 5, context: "I appreciate your hard work, Kenji." },
      { word: "pretended", pos: "verb", meaning: "〜のふりをした", level: "準2級", importance: 4, context: "Although Kenji pretended to focus on his document, he secretly..." }
    ],
    grammarExplanations: [
      {
        sentence: "Akira noticed that Kenji, the department director, was still rubbing his eyes.",
        structure: "Akira [S] + noticed [V] + that [接続詞] + Kenji, the department director [S'] + was still rubbing [V'] + his eyes [O'].",
        explanation: "接続詞 that が名詞節（〜ということ）を作り、noticed の目的語になっています。Kenji と the department director は同格の関係です。"
      },
      {
        sentence: "Although Kenji pretended to focus on his document, he secretly watched Akira drink the coffee.",
        structure: "Although [接続詞] + Kenji [S'] + pretended [V'] + to focus on his document [O'], he [S] + secretly [M] + watched [V] + Akira [O] + drink [C: 原形不定詞] + the coffee [O'].",
        explanation: "Although（〜だけれども）の接続詞が譲歩を表し、主節には watch + O + 原形不定詞（Oが〜するのを見つめる）という知覚動詞の構文が使われています。"
      }
    ],
    questions: [
      {
        question: "Why did Akira bring coffee to Kenji?",
        choices: [
          "Because Kenji ordered him to make some.",
          "Because Kenji looked exhausted working late.",
          "Because Akira wanted to leave the office early.",
          "Because they had to test a new coffee machine."
        ],
        answerIndex: 1,
        explanation: "本文第3文「Kenji looked exhausted... Akira walked to the breakroom and prepared two cups of warm coffee.」から、ケンジが疲れて見えたためにコーヒーを持ってきたので2番目が正解です。"
      },
      {
        question: "How did Kenji feel when Akira called him 'Kenji'?",
        choices: [
          "He got angry and scolded Akira immediately.",
          "He fell asleep and ignored Akira's words.",
          "He smiled and felt his cheeks get slightly warm.",
          "He decided to cancel tomorrow's presentation."
        ],
        answerIndex: 2,
        explanation: "アキラが「Kenji」と名前で呼んだ際、ケンジは「Kenji smiled, his cheeks slightly warm.」とあるため、微笑み頬を赤らめた3番目が正解です。"
      }
    ]
  },
  {
    id: "preset-2",
    title: "Rainy Ride Home (雨の夜のタクシー相乗り)",
    type: "story",
    level: "grade2",
    characters: ["Akira", "Kenji"],
    characterProfiles: [
      { name: "Akira", description: "34歳の営業係長。優秀で仕事ができるが、上司のKenjiに対して並々ならぬ執着を抱き、時に甘え、時に強引に迫る年下攻め。", speechStyle: "基本は丁寧な部下口調だが、二人きりになると熱情が漏れる大人のトーン。相手を「部長」と呼ぶ。" },
      { name: "Kenji", description: "48歳の営業部長。威厳があって部下思いだが、優秀な年下部下Akiraの好意や独占欲に翻弄され、普段のクールさを崩してしまう可愛い年上受け。", speechStyle: "包容力のある大人の口調、Akiraの猛アプローチに少しタジタジしつつも受け入れる態度。" }
    ],
    situation: "Sharing a taxi in the rain after a business dinner",
    wpm: 120,
    wordCount: 179,
    english: "A heavy rainfall hit the city after a long business dinner. Akira found a taxi on the crowded street and waved to Kenji, who was shivering under his umbrella.\n\"Director, the rain is too strong. Let's share this ride,\" Akira proposed, gently pulling Kenji's arm.\n\"Are you sure? We live in the same direction, but I don't want to trouble you,\" Kenji said, looking slightly flustered.\n\"It is no trouble at all. Sharing is a mutual benefit,\" Akira smiled inside the vehicle.\nInside the quiet car, the isolation from the storm created a cozy atmosphere. Kenji sighed, \"Honestly, I feel anxiety about tomorrow's board presentation.\"\n\"You shouldn't worry,\" Akira replied, looking directly into Kenji's eyes. \"Your dedication to this project is clear to everyone. I will support you.\"\nKenji felt comforted by the younger man's confident words. \"Thank you, Akira. You are very reliable.\"\nWhen the taxi arrived at Akira's apartment, Kenji thanked him. This brief journey had established a deeper understanding between them, transforming their professional relationship.",
    japanese: "長いビジネス会食の後、激しい豪雨が街を襲いました。アキラは混雑した通りでタクシーを見つけ、傘の下で身を震わせているケンジに向けて手を振りました。\n「部長、雨が強すぎます。相乗りしましょう」アキラはケンジの腕を優しく引っ張りながら提案しました。\n「本当かい？住んでいる方向は同じだが、君に迷惑をかけたくないんだが」ケンジは少し戸惑った様子で言いました。\n「迷惑だなんてとんでもない。相乗りはお互いのためですよ」アキラは車内で微笑みました。\n静かな車内、嵐から隔離された空間が心地よい雰囲気を醸し出していました。ケンジはため息をつき、「正直なところ、明日の役員プレゼンに対して不安があるんだ」と言いました。\n「心配する必要はありませんよ」アキラはケンジの目を真っ直ぐ見つめて答えました。「このプロジェクトに対する部長の献身的な取り組みは、誰もが知っています。僕が支えますから」\nケンジは、年下のアキラの自信に満ちた言葉に慰められました。「ありがとう、アキラ。お前は本当に頼もしいな」\nタクシーがアキラのマンション前に到着すると、ケンジはお礼を言いました。この短い移動が二人の間に深い相互理解を築き、仕事上の関係を変化させていました。",
    words: [
      { word: "anxiety", pos: "noun", meaning: "不安、心配、切望", level: "2級", importance: 5, context: "Honestly, I feel anxiety about tomorrow's board presentation." },
      { word: "dedication", pos: "noun", meaning: "献身、熱心さ、貢献", level: "2級", importance: 4, context: "Your dedication to this project is clear to everyone." },
      { word: "isolation", pos: "noun", meaning: "孤立、隔離した環境", level: "2級", importance: 4, context: "the isolation from the storm created a cozy atmosphere." },
      { word: "established", pos: "verb", meaning: "確立した、築いた", level: "2級", importance: 5, context: "This brief journey had established a deeper understanding..." },
      { word: "mutual", pos: "adjective", meaning: "相互の、共通の、お互いの", level: "2級", importance: 5, context: "Sharing is a mutual benefit." }
    ],
    grammarExplanations: [
      {
        sentence: "Akira found a taxi on the crowded street and waved to Kenji, who was shivering under his umbrella.",
        structure: "Akira [S] + found [V1] + a taxi [O] ... and + waved [V2] + to Kenji, + who [関係代名詞・非制限用法] + was shivering [V'] + under his umbrella.",
        explanation: "whoは関係代名詞の非制限用法（コンマ＋who）で、先行詞 Kenji について「（その時）彼は傘の下で震えていた」と補足的に説明を追加しています。"
      },
      {
        sentence: "This brief journey had established a deeper understanding between them, transforming their relationship.",
        structure: "This brief journey [S] + had established [V: 過去完了形] + a deeper understanding [O] ..., + transforming [分詞構文] + their relationship [O'].",
        explanation: "transforming は現在分詞を用いた分詞構文で、主節の動作「理解を築いた」の結果として「その結果関係性を変えた」という継続的な結果（〜して、そして…した）を説明しています。"
      }
    ],
    questions: [
      {
        question: "Why did Kenji feel flustered when Akira offered a ride?",
        choices: [
          "Because he forgot his umbrella at the restaurant.",
          "Because they lived in completely different directions.",
          "Because he didn't want to cause trouble to his younger colleague.",
          "Because the taxi fare was too expensive."
        ],
        answerIndex: 2,
        explanation: "本文第3文「I don't want to trouble you（君に迷惑をかけたくない）」とあるため、年下の部下に迷惑をかけまいと戸惑った3番目が正解です。"
      },
      {
        question: "How did Akira comfort Kenji about his presentation?",
        choices: [
          "By offering to do the entire presentation for him.",
          "By reminding him of his dedication and promising support.",
          "By suggesting that they cancel the business dinner.",
          "By telling him that the board members are not important."
        ],
        answerIndex: 1,
        explanation: "アキラは「Your dedication... is clear. I will support you.（部長の献身は明らかです。私が支えます）」と励ましているため、2番目が正解です。"
      }
    ]
  },
  {
    id: "preset-3",
    title: "The Librarian's Quiet Smile (静かな書庫での出会い)",
    type: "story",
    level: "pre2",
    characters: ["Riku", "Arthur"],
    characterProfiles: [
      { name: "Riku", description: "22歳の元気な大学生。表情豊かで人懐っこいワンコ系だが、ここぞという時は男らしくリードする年下攻め。Arthurに一途。", speechStyle: "明るく元気な敬語口調。「司書さん！」と懐きつつ、時に真っ直ぐ好意を伝える。" },
      { name: "Arthur", description: "45歳の知的な図書館司書。眼鏡の奥の瞳が妖艶で底知れない雰囲気があるが、年下のRikuの一途な情熱にペースを乱される優雅な年上受け。", speechStyle: "物腰柔らかで丁寧、どこかからかうような余裕があるが、Rikuに迫られると照れる大人の口調。" }
    ],
    situation: "A quiet study at the library",
    wpm: 105,
    wordCount: 161,
    english: "The university library was peaceful on Saturday afternoon. Riku was searching for a history book, carrying a heavy stack of novels. Suddenly, he dropped them with a loud noise. Embarrassed, Riku tried to collect them. Arthur, the chief librarian wearing thin glasses, walked over silently. Riku expected to be scolded, but Arthur knelt down to help.\n\"I am so embarrassed, librarian,\" Riku whispered nervously.\nArthur smiled gently. \"Be careful, young man. You shouldn't rush.\"\n\"I hesitated to look up because I thought you would scold me,\" Riku admitted, his heart beating fast. \"But I wanted to see you.\"\nArthur's cheeks blushed slightly, but he kept his cool smile. \"You are very honest. I praise your sincere passion for reading so many books.\"\n\"Thank you! Your words make me happy,\" Riku smiled brightly.\nIn the quiet sunlight of the library, Riku realized his sincere feelings for Arthur grew stronger every single day.",
    japanese: "土曜日の午後、大学の図書館は穏やかでした。リクは重い小説の山を抱えながら、歴史の参考書を探していました。突然、彼は大きな音を立ててそれらを落としてしまいました。恥ずかしさのあまり、リクは急いで本を集めようとしました。薄い眼鏡をかけた主任司書のアーサーが、静かに歩み寄ってきました。リクは怒られるのではないかと思いましたが、アーサーは膝をついて手伝ってくれました。\n「本当に恥ずかしいです、司書さん」リクは緊張して囁きました。\nアーサーは優しく微笑みました。「気をつけなさい、若者よ。急いではいけません」\n「怒られると思って、顔を上げるのをためらいました」リクは心臓を高鳴らせながら打ち明けました。「でも、司書さんに会いたかったんです」\nアーサーの頬はわずかに赤らみましたが、冷静な微笑みを崩しませんでした。「君はとても素直ですね。そんなにたくさんの本を読む、君の誠実な情熱を褒めてあげましょう」\n「ありがとうございます！そう言ってもらえて嬉しいです！」リクは明るく微笑みました。\n図書館の静かな木漏れ日の中で、リクはアーサーに対する自分の誠実な気持ちが、日に日に強くなっていることを実感していました。",
    words: [
      { word: "embarrassed", pos: "adjective", meaning: "恥ずかしがった、気まずい思いをした", level: "準2級", importance: 4, context: "Embarrassed, Riku tried to collect them." },
      { word: "hesitated", pos: "verb", meaning: "ためらった、躊躇した", level: "準2級", importance: 4, context: "I hesitated to look up because I thought you would scold me." },
      { word: "scold", pos: "verb", meaning: "叱る、怒る", level: "準2級", importance: 3, context: "I thought you would scold me." },
      { word: "sincere", pos: "adjective", meaning: "心からの、誠実な", level: "準2級", importance: 4, context: "I praise your sincere passion for reading so many books." },
      { word: "praise", pos: "verb", meaning: "褒める", level: "準2級", importance: 4, context: "I praise your sincere passion for reading..." }
    ],
    grammarExplanations: [
      {
        sentence: "Riku admitted his heart was beating fast, expecting to be scolded.",
        structure: "Riku [S] + admitted [V] + (that) his heart was beating fast [O], + expecting [分詞構文] + to be scolded [O'].",
        explanation: "expecting... は分詞構文で、「叱られると予想しながら（告白した）」という同時状況を表します。to be scolded は受動態の不定詞（叱られること）です。"
      },
      {
        sentence: "Arthur praised him for reading so many books.",
        structure: "Arthur [S] + praised [V] + him [O] + for [前置詞] + reading [動名詞] + so many books [O'].",
        explanation: "praise A for B（BのことでAを褒める）という重要表現です。前置詞 for の後に動名詞 reading が来ています。"
      }
    ],
    questions: [
      {
        question: "Why did Riku hesitate to look up at Arthur?",
        choices: [
          "Because he dropped his glasses on the floor.",
          "Because he thought Arthur would scold him for dropping books.",
          "Because the sunlight in the library was too bright.",
          "Because he did not like Arthur's new novels."
        ],
        answerIndex: 1,
        explanation: "本文「I hesitated to look up because I thought you would scold me（叱られると思って顔を上げるのをためらった）」とあるため、2番目が正解です。"
      },
      {
        question: "What did Arthur praise Riku for?",
        choices: [
          "For cleaning the history bookshelves.",
          "For wearing a clean university uniform.",
          "For his sincere passion for reading books.",
          "For arriving at the library on time."
        ],
        answerIndex: 2,
        explanation: "アーサーは「I praise your sincere passion for reading so many books（本を読む誠実な情熱を褒めましょう）」と述べているため、3番目が正解です。"
      }
    ]
  },
  {
    id: "preset-4",
    title: "Rainy Evening in the Archives (閉館後の書庫の雨宿り)",
    type: "story",
    level: "grade2",
    characters: ["Riku", "Arthur"],
    characterProfiles: [
      { name: "Riku", description: "22歳の元気な大学生。表情豊かで人懐っこいワンコ系だが、ここぞという時は男らしくリードする年下攻め。Arthurに一途。", speechStyle: "明るく元気な敬語口調。「司書さん！」と懐きつつ、時に真っ直ぐ好意を伝える。" },
      { name: "Arthur", description: "45歳の知的な図書館司書。眼鏡の奥の瞳が妖艶で底知れない雰囲気があるが、年下のRikuの一途な情熱にペースを乱される優雅な年上受け。", speechStyle: "物腰柔らかで丁寧、どこかからかうような余裕があるが、Rikuに迫られると照れる大人の口調。" }
    ],
    situation: "Rainy evening waiting at the library entrance",
    wpm: 120,
    wordCount: 172,
    english: "Outside the library, a sudden storm was raging. Riku finished his graduation paper after closing time. When he reached the lobby, he saw Arthur organizing documents. Riku had no umbrella.\n\"The storm is raging, Riku. You cannot walk home,\" Arthur said. \"Why don't we wait in the private archive room?\"\n\"Is that okay? Just the two of us?\" Riku asked, his voice filled with tension.\nArthur smiled with a sophisticated charm. \"Of course. Follow me.\"\nIn the historic room, Arthur prepared hot tea. Riku felt a nervous tension, but he was deeply comfortable.\n\"I feel anxiety about the future after graduation,\" Riku confessed.\nArthur listened patiently and said, \"You have a great talent, Riku. Believe in yourself.\"\n\"I believe in you, Arthur,\" Riku said, leaning closer. \"This unexpected isolation feels like a magical dream.\"\nArthur looked surprised, his elegant composure breaking slightly. \"You are bold, Riku.\"\nRiku smiled, realizing his admiration had turned into deep love.",
    japanese: "図書館の外では、突然の激しい嵐が吹き荒れていました。リクは閉館時間になってようやく卒業論文を書き終えました。ロビーに下りると、アーサーが古い資料を整理しているのが見えました。リクは傘を持っていませんでした。\n「嵐が吹き荒れていますよ、リク。歩いては帰れませんね」アーサーは言いました。「私の個人書庫で雨宿りをしませんか？」\n「いいんですか？二人きりで？」リクは少し緊張した声で尋ねました。\nアーサーは洗練された魅力的な微笑みを浮かべました。「もちろん。付いてきなさい」\n歴史を感じさせるその部屋で、アーサーは温かい紅茶を淹れてくれました。リクは奇妙な緊張を感じつつも、深く安らいでいました。\n「卒業後の将来について、不安を感じているんです」リクは告白しました。\nアーサーは辛抱強く耳を傾け、「君には素晴らしい才能がありますよ、リク。自分を信じなさい」と言いました。\n「僕は司書さんを信じています」リクは身を乗り出し、アーサーに近づきました。「この予想外の二人きりの空間は、まるで魔法の夢のようです」\nアーサーは少し驚き、その優雅な落ち着きをわずかに崩しました。「大胆な子ですね、リク」\nリクは微笑みました。アーサーへの純粋な憧れが、すでに深い愛へと変わっていることに気づいたのです。",
    words: [
      { word: "raging", pos: "verb/adjective", meaning: "吹き荒れている、激怒している", level: "2級", importance: 3, context: "Outside the library, a sudden storm was raging." },
      { word: "anxiety", pos: "noun", meaning: "不安、心配", level: "2級", importance: 5, context: "I feel anxiety about the future after graduation." },
      { word: "tension", pos: "noun", meaning: "緊張、張りつめた空気", level: "2級", importance: 5, context: "Riku asked, his voice filled with tension." },
      { word: "sophisticated", pos: "adjective", meaning: "洗練された、知的な、精巧な", level: "2級", importance: 4, context: "Arthur smiled with a sophisticated charm." },
      { word: "isolation", pos: "noun", meaning: "孤立、隔離された状況", level: "2級", importance: 4, context: "This unexpected isolation feels like a magical dream." }
    ],
    grammarExplanations: [
      {
        sentence: "When he reached the lobby, he saw Arthur organizing documents.",
        structure: "When [接続詞] + he [S'] + reached [V'] + the lobby [O'], he [S] + saw [V: 知覚動詞] + Arthur [O] + organizing [C: 現在分詞] + documents [O'].",
        explanation: "see + O + doing（Oが〜しているのを見る）という知覚動詞の構文が使われています。現在分詞 organizing が使われることで、進行中の動作を強調しています。"
      },
      {
        sentence: "Riku smiled, realizing his admiration had turned into deep love.",
        structure: "Riku [S] + smiled [V], + realizing [分詞構文] + (that) [省略された接続詞] + his admiration [S'] + had turned [V': 過去完了] + into deep love.",
        explanation: "realizing... は分詞構文で、主節の動作「微笑んだ」とほぼ同時の心理「〜を実感しながら」を表します。admirationの後に接続詞 that が省略されています。"
      }
    ],
    questions: [
      {
        question: "Why did Arthur invite Riku to the private archive room?",
        choices: [
          "Because they had to clean the library together.",
          "Because a heavy storm was raging and Riku had no umbrella.",
          "Because Riku wanted to buy some expensive ancient books.",
          "Because Arthur needed help with his homework."
        ],
        answerIndex: 1,
        explanation: "本文「The storm is raging, Riku. You cannot walk home. Why don't we wait...」とあるため、嵐で帰れないリクを気遣って書庫に誘った2番目が正解です。"
      },
      {
        question: "How did Arthur react when Riku said the isolation felt like a dream?",
        choices: [
          "He became extremely angry and asked Riku to leave.",
          "He laughed out loud and ignored Riku's confession.",
          "He looked surprised, and his composure broke slightly.",
          "He fell asleep immediately in his chair."
        ],
        answerIndex: 2,
        explanation: "リクが「魔法の夢のようだ」と近づいたとき、アーサーは「Arthur looked surprised, his elegant composure breaking slightly（少し驚き、落ち着きをわずかに崩した）」とあるため、3番目が正解です。"
      }
    ]
  },
  {
    id: "preset-5",
    title: "ワークプレイスにおける大人関係性の心理 (Workplace Dynamics)",
    type: "essay",
    level: "grade2",
    characters: [],
    characterProfiles: [],
    situation: "Trope Analysis",
    wpm: 125,
    wordCount: 162,
    english: "In modern literature and fan culture, relationships between mature working adults, especially with a age gap, attract significant interest. The dynamic between a younger passionate colleague and an older manager starts with a professional gap. However, as they cooperate under work pressure, the younger colleague's reliability helps the older colleague discover his own vulnerabilities. Psychologically, this transition is powerful because it creates dramatic tension. The contrast between professional distance and emotional closeness makes their interaction highly satisfying. Unlike youthful romance, these stories require deep communication to overcome prejudices and build mutual trust. For language learners, reading about workplace dynamics is useful because it teaches vocabulary related to professional settings, conflict resolution, and personal growth. Understanding these mature feelings helps readers acquire practical English expressions naturally. This combination of realistic office scenarios and emotional depth makes adult-centered stories a highly effective tool for studying advanced English vocabulary.",
    japanese: "現代の文学やファン文化において、成熟した社会人、特に年齢差のある関係性は大きな関心を集めています。情熱的な年下の同僚と年上の上司との間のダイナミクスは、仕事上の格差から始まります。しかし、仕事のプレッシャーの下で協力するうちに、年下の同僚の頼もしさが、年上の上司に自分自身の弱み（脆弱性）を発見させます。心理学的に、この変化はドラマチックな緊張感を生み出すため非常に強力です。仕事上の距離感と感情的な近さのコントラストが、彼らの対話を非常に満足度の高いものにします。若々しい恋愛とは異なり、これらの物語は偏見を克服し、相互の信頼を築くために深いコミュニケーションを必要とします。語学学習者にとって、職場のダイナミクスについて読むことは、プロフェッショナルな設定、葛藤の解決、個人の成長に関連する語彙を学べるため非常に有益です。これらの成熟した感情を理解することは、実用的な英語表現を自然に習得するのに役立ちます。現実的なオフィスのシナリオと感情的な深さの組み合わせにより、大人中心のストーリーは高度な英語語彙を学習するための非常に効果的なツールになります。",
    words: [
      { word: "vulnerabilities", pos: "noun", meaning: "脆弱性、弱み、傷つきやすさ", level: "2級", importance: 4, context: "helps the older colleague discover his own vulnerabilities." },
      { word: "tension", pos: "noun", meaning: "緊張、緊迫感", level: "2級", importance: 5, context: "it creates dramatic tension." },
      { word: "prejudices", pos: "noun", meaning: "偏見、先入観", level: "2級", importance: 4, context: "overcome prejudices and build mutual trust." },
      { word: "acquire", pos: "verb", meaning: "習得する、獲得する", level: "2級", importance: 5, context: "helps readers acquire practical English expressions naturally." },
      { word: "scenarios", pos: "noun", meaning: "シナリオ、状況、想定される展開", level: "2級", importance: 3, context: "This combination of realistic office scenarios..." }
    ],
    grammarExplanations: [
      {
        sentence: "The contrast between professional distance and emotional closeness makes their interaction highly satisfying.",
        structure: "The contrast [S] + between professional distance and emotional closeness [修飾句] + makes [V] + their interaction [O] + highly satisfying [C: 形容詞/分詞].",
        explanation: "make + O + C（OをCの状態にする）という第5文型（使役的意味）の構文です。closeness は「親密さ」、satisfying は「満足のいく、心地よい」という意味です。"
      },
      {
        sentence: "Understanding these mature feelings helps readers acquire practical English expressions naturally.",
        structure: "Understanding these mature feelings [S: 動名詞句] + helps [V] + readers [O] + acquire [C: 原形不定詞] + practical English expressions [O'].",
        explanation: "help + O + 原形不定詞（Oが〜するのを助ける、役立つ）の構文です。helps の後に to acquire ではなく原形不定詞の acquire が直接来ています。"
      }
    ],
    questions: [
      {
        question: "According to the essay, why are adult workplace stories appealing?",
        choices: [
          "Because they have no grammatical errors.",
          "Because they create dramatic tension from the contrast of professional distance and emotional closeness.",
          "Because they only focus on sports and high school events.",
          "Because they do not require deep communication."
        ],
        answerIndex: 1,
        explanation: "本文中盤に「The contrast between professional distance and emotional closeness makes their interaction highly satisfying.」とあるため、2番目が正解です。"
      },
      {
        question: "What is a benefit of reading about workplace dynamics for language learners?",
        choices: [
          "It teaches vocabulary related to professional settings and personal growth.",
          "It helps them learn how to write programming codes.",
          "It allows them to skip Eiken exams.",
          "It explains how to buy expensive books."
        ],
        answerIndex: 0,
        explanation: "本文後半に「useful because it teaches vocabulary related to professional settings, conflict resolution, and personal growth」とあるため、1番目が正解です。"
      }
    ]
  }
];

if (typeof window !== "undefined") {
  window.DEFAULT_CHARACTERS = DEFAULT_CHARACTERS;
  window.PRESET_STORIES = PRESET_STORIES;
}
