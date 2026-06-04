/**
 * Gemini API Communication Module for Fujolingo
 */

async function generateEnglishMaterial({
  apiKey,
  charA,
  charB,
  relationship,
  intimacy,
  level,
  type,
  trope,
  customTrope,
  mode,          // "standalone" or "series"
  episodeNumber, // e.g., 2
  historySummary // e.g., "..."
}) {
  const modelName = "gemini-2.5-flash"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const intimacyDescs = {
    strangers: "Met recently / Rivals. They are hesitant, distant, or display light friction/tension. Not yet lovers.",
    crush: "One-sided crush / Conscious of each other. Subtle blushes, eye contact, but no confessions yet. Sweet tension.",
    slowburn: "Slow-burn mutual crush. They are deeply attracted to each other but hold back, creating a flustered, sweet, and torturous distance. Platonic but intensely charged emotional tension.",
    secret_lovers: "Secret lovers. They are already dating but must hide it. Displays secret physical touches, hidden sweet words, and cute flustered dynamics when others are around.",
    established: "Established lovers with deep physical and emotional intimacy (has physical/sexual relationship). They display comfortable affection, deep romance, and sweet physical closeness (初手からやることをやっている・肉体的にも親密な関係). Feel free to describe their passionate or physically intimate romance."
  };
  const intimacyDesc = intimacyDescs[intimacy] || intimacyDescs.slowburn;

  const targetLevelDesc = level === "pre2" 
    ? "Eiken Pre-2nd Grade level (equivalent to CEFR A2/high-beginner to intermediate, target vocabulary size around 3000 words, sentence length averaging 10-15 words, basic grammatical structures like simple relative clauses, connectors such as 'although', 'because', 'however')."
    : "Eiken 2nd Grade level (equivalent to CEFR B1/intermediate, target vocabulary size around 5000 words, sentence length averaging 15-22 words, slightly complex grammar like participle clauses, past perfect, passive voice, noun clauses, formal academic/business vocabulary).";

  const tropeText = trope === "custom" ? customTrope : trope;

  // Build the continuity context if in series mode
  let continuityPrompt = "";
  if (mode === "series" && episodeNumber > 1 && historySummary) {
    continuityPrompt = `
[Story Continuity Context]
This is Episode ${episodeNumber} of a continuous story featuring ${charA.name} and ${charB.name}.
Here is the summary of the previous episodes in Japanese:
"${historySummary}"

You MUST write this new story as a direct continuation (Episode ${episodeNumber}) based on the previous history and the new situation: "${tropeText}". Concurrently, develop their emotional connection. Make sure the event from previous chapters is respected (e.g. if they already shared coffee, do not repeat the coffee introduction; build upon it).`;
  }

  let prompt = "";
  if (type === "story") {
    prompt = `You are a professional ESL teacher and creative writer. 
Write a short story (SS) in English designed as a reading passage for Japanese English learners aiming for Eiken.

[Story Settings]
- Level: ${targetLevelDesc}
- Relationship Concept: "${relationship || 'Lovers'}"
- Intimacy Level & Phase: ${intimacyDesc}
- Characters to feature (Strict Seme x Uke Dynamic. Do not swap roles. Character A is Seme, Character B is Uke. Seme is younger, Uke is older):
  * Character A (Seme / Younger / Active partner): Name is "${charA.name}". Description: "${charA.description}". Speech style in Japanese translation: "${charA.speechStyle}".
  * Character B (Uke / Older / Passive or flustered partner): Name is "${charB.name}". Description: "${charB.description}". Speech style in Japanese translation: "${charB.speechStyle}".
- Situation/Trope: "${tropeText}"
${continuityPrompt}

[Requirements]
1. Word Count: 140 to 220 words.
2. Content & Dialogue Focus: 
   - Focus heavily on written dialogue (会話劇多め) between ${charA.name} and ${charB.name}. Include multiple lines of characteristic spoken dialogue for both characters.
   - The story should highlight the "Younger Seme x Older Uke" (年下攻め×年上受け) relationship dynamic. Make sure the younger ${charA.name} takes the lead with passion, reliability, or playful teasing, while the older ${charB.name} shows a mixture of maturity and cute shyness/flustered responses in their dialogue.
3. Japanese Translation: Translate the story into natural, appealing Japanese. Adjust their speech styles in the Japanese translation to match their character descriptions, dynamic, and current intimacy level. Character names in the Japanese translation MUST be written exactly as they are input (e.g., if Character A's name is "${charA.name}" and Character B's name is "${charB.name}", write them exactly as "${charA.name}" and "${charB.name}" in the Japanese translation text; DO NOT map or translate them into Japanese Kanji, Hiragana, or Katakana like "輝", "照", or "テル").
4. Vocabulary:
   - Identify 4 to 6 important vocabulary words in the story that are suitable for the target Eiken level (Pre-2 or 2nd Grade).
   - In Eiken Pre-2, focus on words like: hesitate, generous, appreciate, avoid, disappointed, etc.
   - In Eiken 2nd Grade, focus on words like: anxiety, mutual, isolation, demand, overcome, pretend, accidentally, conflict, reconciliation, etc.
   - Extract their part of speech (noun, verb, adj, adv), Japanese meaning, Eiken level, importance rating (1 to 5 stars), and the exact sentence they appear in.
5. Grammar Explanations:
   - Select 2 key sentences from the story that illustrate important Eiken grammar structures (such as relative clauses, passive voice, force someone to do, although clauses, participle clauses).
   - Provide a visual grammatical structure mapping (e.g., S + V + O + C notation) and a concise, clear explanation in Japanese.
6. Reading Comprehension Quizzes:
   - Create 2 multiple-choice reading comprehension questions in English based on the story.
   - Each question must have exactly 4 choices.
   - Specify the index of the correct answer (0-indexed).
   - Provide a Japanese explanation for why the correct answer is correct and why other choices are wrong.
7. Summary:
   - Provide a brief, one-sentence Japanese summary (about 20-30 characters) of what happened in this specific episode, to be used as history context for the next episode. (e.g., '残業中のオフィスで、AkiraがKenjiに差し入れを渡し、二人の会話が弾んだ。'). Put this in the 'summary' field.
8. No Japanese in English: Under no circumstances should Japanese characters (Kanji, Hiragana, Katakana) like '部長', '係長', or '先輩' appear inside the English story text or English dialogues. Any Japanese titles or honorifics mentioned in the characters' speechStyle must be translated into natural English equivalents (e.g. 'Director', 'Manager', 'Boss', 'Senior', or simply the character's name) in the English story.`;
  } else {
    // Essay Mode
    prompt = `You are a professional ESL teacher and literary analyst.
Write a short cultural or linguistic analysis essay in English designed as a reading passage for Japanese English learners aiming for Eiken.

[Essay Settings]
- Level: ${targetLevelDesc}
- Trope/Concept to analyze: "${tropeText}"
- Reference Characters (optional, use if helpful as examples):
  * ${charA.name} (${charA.description})
  * ${charB.name} (${charB.description})

[Requirements]
1. Word Count: 140 to 220 words.
2. Content: Analyze why the trope "${tropeText}" is so popular in fiction, what psychological dynamics make it appealing (e.g. the transition of emotions, tension, trust building), and how character interactions shape this dynamic. Reference the characters ${charA.name} and ${charB.name} as example models if relevant.
3. Japanese Translation: Translate the essay into natural, elegant Japanese. Character names in the Japanese translation MUST be written exactly as they are input (e.g. write them exactly as "${charA.name}" and "${charB.name}" in the Japanese translation text; DO NOT map or translate them into Japanese Kanji, Hiragana, or Katakana like "輝", "照", or "テル").
4. Vocabulary:
   - Identify 4 to 6 important vocabulary words in the essay that are suitable for the target Eiken level (Pre-2 or 2nd Grade).
   - Extract their part of speech, Japanese meaning, Eiken level, importance rating (1 to 5 stars), and the exact sentence they appear in.
5. Grammar Explanations:
   - Select 2 key sentences from the essay that demonstrate important Eiken grammar structures.
   - Provide a visual grammatical structure mapping (S + V + O + C notation) and a concise, clear explanation in Japanese.
6. Reading Comprehension Quizzes:
   - Create 2 multiple-choice reading comprehension questions in English based on the essay.
   - Each question must have exactly 4 choices.
   - Specify the index of the correct answer (0-indexed).
   - Provide a Japanese explanation for the answer.
7. Summary:
   - Provide a brief, one-sentence Japanese summary of the essay. Put this in the 'summary' field.
8. No Japanese in English: Ensure the English text is 100% written in English, containing absolutely no Japanese characters (Kanji, Hiragana, Katakana).`;
  }

  // Define response JSON schema to enforce strict format
  const responseSchema = {
    type: "OBJECT",
    properties: {
      title: { type: "STRING", description: "Title of the story or essay" },
      level: { type: "STRING", description: "The targeted Eiken level (e.g., 'pre2' or 'grade2')" },
      wordCount: { type: "INTEGER", description: "Total word count in English text" },
      english: { type: "STRING", description: "The complete English text. Do not wrap sentences in custom HTML." },
      japanese: { type: "STRING", description: "The complete Japanese translation." },
      summary: { type: "STRING", description: "A brief one-sentence Japanese summary of the episode." },
      words: {
        type: "ARRAY",
        description: "List of 4 to 6 vocabulary words to learn",
        items: {
          type: "OBJECT",
          properties: {
            word: { type: "STRING", description: "The word in base form (e.g. hesitate)" },
            pos: { type: "STRING", description: "Part of speech (noun, verb, adjective, adverb)" },
            meaning: { type: "STRING", description: "Japanese translation of the word" },
            level: { type: "STRING", description: "Eiken Level (e.g. 準2級, 2級)" },
            importance: { type: "INTEGER", description: "Importance stars (1 to 5)" },
            context: { type: "STRING", description: "The exact sentence in the text where this word appears" }
          },
          required: ["word", "pos", "meaning", "level", "importance", "context"]
        }
      },
      grammarExplanations: {
        type: "ARRAY",
        description: "Explanations of 2 grammatically rich sentences",
        items: {
          type: "OBJECT",
          properties: {
            sentence: { type: "STRING", description: "The original English sentence" },
            structure: { type: "STRING", description: "Grammatical structure breakdown (e.g., S + V + O + C mapping)" },
            explanation: { type: "STRING", description: "Concise grammar explanation in Japanese" }
          },
          required: ["sentence", "structure", "explanation"]
        }
      },
      questions: {
        type: "ARRAY",
        description: "Exactly 2 reading comprehension questions",
        items: {
          type: "OBJECT",
          properties: {
            question: { type: "STRING", description: "The English question" },
            choices: {
              type: "ARRAY",
              description: "4 multiple-choice options in English",
              items: { type: "STRING" }
            },
            answerIndex: { type: "INTEGER", description: "The index of the correct answer (0, 1, 2, or 3)" },
            explanation: { type: "STRING", description: "Detailed explanation of the answers in Japanese" }
          },
          required: ["question", "choices", "answerIndex", "explanation"]
        }
      }
    },
    required: ["title", "level", "wordCount", "english", "japanese", "summary", "words", "grammarExplanations", "questions"]
  };

  const requestBody = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 1.0
    }
  };

  try {
    let response;
    if (apiKey) {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
    } else {
      response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: requestBody.contents,
          generationConfig: requestBody.generationConfig,
          model: modelName
        })
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API returned error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const rawJsonText = apiKey ? data.candidates[0].content.parts[0].text : data.text;
    
    const parsedData = JSON.parse(rawJsonText);
    return parsedData;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

async function translateWordWithGemini(word, context, apiKey) {
  const modelName = "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const prompt = `You are an expert bilingual English-Japanese dictionary for Eiken exam candidates.
Analyze the English word "${word}" inside the context of this sentence: "${context}".
Translate the word into natural Japanese as it is used in this specific sentence context.
Identify its part of speech in Japanese (e.g. 名詞, 動詞, 形容詞, 副詞), Eiken exam level (e.g. 5級, 4級, 3級, 準2級, 2級, 準1級, 1級, or '対象外' if not a common target word), and Eiken importance rating (from 1 to 5 stars, where 5 is extremely common/important in Eiken).

Return a JSON object conforming exactly to this schema:
{
  "word": "${word}",
  "pos": "part of speech in Japanese",
  "meaning": "Japanese translation of the word reflecting its context",
  "level": "Eiken level (e.g. 準2級, 2級, 準1級, etc.)",
  "importance": 1 to 5 (integer representing importance stars)
}`;

  const responseSchema = {
    type: "OBJECT",
    properties: {
      word: { type: "STRING" },
      pos: { type: "STRING" },
      meaning: { type: "STRING" },
      level: { type: "STRING" },
      importance: { type: "INTEGER" }
    },
    required: ["word", "pos", "meaning", "level", "importance"]
  };

  const requestBody = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 0.2
    }
  };

  try {
    let response;
    if (apiKey) {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
    } else {
      response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: requestBody.contents,
          generationConfig: requestBody.generationConfig,
          model: modelName
        })
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API returned error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const rawJsonText = apiKey ? data.candidates[0].content.parts[0].text : data.text;
    return JSON.parse(rawJsonText);
  } catch (error) {
    console.error("Gemini Word Translation Error:", error);
    throw error;
  }
}

if (typeof window !== "undefined") {
  window.generateEnglishMaterial = generateEnglishMaterial;
  window.translateWordWithGemini = translateWordWithGemini;
}
