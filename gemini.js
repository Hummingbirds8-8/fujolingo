/**
 * Gemini API Communication Module for FujoLingo (German Version)
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
  const modelName = "gemini-1.5-flash"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const intimacyDescs = {
    strangers: "Met recently / Rivals. They are hesitant, distant, or display light friction/tension. Not yet lovers.",
    crush: "One-sided crush / Conscious of each other. Subtle blushes, eye contact, but no confessions yet. Sweet tension.",
    slowburn: "Slow-burn mutual crush. They are deeply attracted to each other but hold back, creating a flustered, sweet, and torturous distance. Platonic but intensely charged emotional tension.",
    secret_lovers: "Secret lovers. They are already dating but must hide it. Displays secret physical touches, hidden sweet words, and cute flustered dynamics when others are around.",
    established: "Established lovers with deep physical and emotional intimacy. They display comfortable affection, deep romance, and sweet physical closeness."
  };
  const intimacyDesc = intimacyDescs[intimacy] || intimacyDescs.slowburn;

  const targetLevelDesc = level === "pre2" 
    ? "German CEFR A1 level (very simple sentences, basic vocabulary, present tense, simple structures, suitable for absolute beginners)."
    : "German CEFR A2 level (simple sentences, basic grammar like compound past tense, basic prepositions, common adjectives, suitable for beginners).";

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
    prompt = `You are a professional German teacher (DaF) and creative writer.
Write a short story (SS) in German designed as a reading passage for Japanese German learners at the absolute beginner level (CEFR A1/A2).

[Story Settings]
- Level: ${targetLevelDesc}
- Relationship Concept: "${relationship || 'Attendant and Lord / Traveling companions'}"
- Intimacy Level & Phase: ${intimacyDesc}
- Characters to feature:
  * Character A (Seme / Attendant / Protective / Sorrento): Name is "${charA.name}". Description: "${charA.description}". Speech style in Japanese translation: "${charA.speechStyle}".
  * Character B (Uke / Lord / Muted romantic experience / Julian): Name is "${charB.name}". Description: "${charB.description}". Speech style in Japanese translation: "${charB.speechStyle}".
- Situation/Trope: "${tropeText}"
${continuityPrompt}

[Requirements]
1. Word Count: 80 to 130 words (Keep it short and very simple for absolute beginners in German).
2. Content & Dialogue Focus:
   - Focus heavily on simple written dialogue in German between ${charA.name} and ${charB.name}.
   - The story should highlight their specific dynamic: Sorrento (${charA.name}) is loyal, protective, but very shy and easily embarrassed, getting flustered by Julian. Julian (${charB.name}) is a noble, elegant lord who is sophisticated in high society but not a playboy; he has romantic poise but doesn't express it too overtly, and playfully teases the shy Sorrento.
3. Japanese Translation: Translate the story into natural, appealing Japanese. Adjust their speech styles in the Japanese translation to match their character descriptions and dynamic. Character names in the Japanese translation MUST be written exactly as they are in English (e.g., write them exactly as "${charA.name}" and "${charB.name}" in the Japanese text; DO NOT map or translate them into Japanese Kanji or Katakana).
4. Vocabulary:
   - Identify 4 to 6 important basic German vocabulary words in the story (e.g. key nouns with gender like 'die Flöte', 'der Herr', verbs in infinitive, basic adjectives).
   - Extract their base form, part of speech (Noun, Verb, Adjective, etc.), Japanese meaning, CEFR level (A1), importance rating (1 to 5 stars), and the exact sentence they appear in.
5. Grammar Explanations:
   - Select 2 key sentences from the story that illustrate basic German grammar structures (such as verb conjugation, word order in main clauses, accusative/dative cases, basic prepositions).
   - Provide a visual grammatical structure mapping and a concise, clear explanation in Japanese.
6. Reading Comprehension Quizzes:
   - Create 2 multiple-choice reading comprehension questions in German based on the story.
   - Each question must have exactly 4 choices in German.
   - Specify the index of the correct answer (0-indexed).
   - Provide a Japanese explanation for why the correct answer is correct and why other choices are wrong.
7. Summary:
   - Provide a brief, one-sentence Japanese summary (about 20-30 characters) of what happened in this specific episode, to be used as history context for the next episode. Put this in the 'summary' field.
8. No Japanese in German: Under no circumstances should Japanese characters appear inside the German story text or German dialogues.`;
  } else {
    // Essay Mode
    prompt = `You are a professional German teacher (DaF) and literary analyst.
Write a short cultural or linguistic analysis essay in German designed as a reading passage for Japanese German learners at the basic level (CEFR A1/A2).

[Essay Settings]
- Level: ${targetLevelDesc}
- Trope/Concept to analyze: "${tropeText}"
- Reference Characters (optional, use if helpful as examples):
  * ${charA.name} (${charA.description})
  * ${charB.name} (${charB.description})

[Requirements]
1. Word Count: 80 to 130 words.
2. Content: Analyze the situation or trope "${tropeText}" in German. You can use the characters ${charA.name} and ${charB.name} as example models if relevant.
3. Japanese Translation: Translate the essay into natural, elegant Japanese. Character names in the Japanese translation MUST be written exactly as they are input (DO NOT translate them into Japanese Kanji or Katakana).
4. Vocabulary:
   - Identify 4 to 6 important vocabulary words in the essay suitable for basic German learners.
   - Extract their base form, part of speech, Japanese meaning, CEFR level (A1/A2), importance rating (1 to 5 stars), and the exact sentence they appear in.
5. Grammar Explanations:
   - Select 2 key sentences from the essay that demonstrate basic German grammar.
   - Provide a visual grammatical structure mapping and a concise, clear explanation in Japanese.
6. Reading Comprehension Quizzes:
   - Create 2 multiple-choice reading comprehension questions in German based on the essay.
   - Each question must have exactly 4 choices.
   - Specify the index of the correct answer (0-indexed).
   - Provide a Japanese explanation for the answer.
7. Summary:
   - Provide a brief, one-sentence Japanese summary of the essay. Put this in the 'summary' field.
8. No Japanese in German: Ensure the German text is 100% written in German, containing absolutely no Japanese characters.`;
  }

  // Define response JSON schema to enforce strict format
  const responseSchema = {
    type: "OBJECT",
    properties: {
      title: { type: "STRING", description: "Title of the story or essay" },
      level: { type: "STRING", description: "The targeted German level (e.g., 'pre2' for A1, 'grade2' for A2)" },
      wordCount: { type: "INTEGER", description: "Total word count in German text" },
      english: { type: "STRING", description: "The complete German text (keep field name 'english' for compatibility)" },
      japanese: { type: "STRING", description: "The complete Japanese translation." },
      summary: { type: "STRING", description: "A brief one-sentence Japanese summary of the episode." },
      words: {
        type: "ARRAY",
        description: "List of 4 to 6 vocabulary words to learn",
        items: {
          type: "OBJECT",
          properties: {
            word: { type: "STRING", description: "The word in base form (e.g. Flöte)" },
            pos: { type: "STRING", description: "Part of speech (noun, verb, adjective, adverb)" },
            meaning: { type: "STRING", description: "Japanese translation of the word" },
            level: { type: "STRING", description: "German Level (e.g. A1, A2)" },
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
            sentence: { type: "STRING", description: "The original German sentence" },
            structure: { type: "STRING", description: "Grammatical structure breakdown" },
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
            question: { type: "STRING", description: "The German question" },
            choices: {
              type: "ARRAY",
              description: "4 multiple-choice options in German",
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
  const modelName = "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const prompt = `You are an expert bilingual German-Japanese dictionary for German language learners.
Analyze the German word "${word}" inside the context of this sentence: "${context}".
Translate the word into natural Japanese as it is used in this specific sentence context.
Identify its part of speech in Japanese (e.g. 名詞, 動詞, 形容詞, 副詞), CEFR level (e.g. A1, A2, B1, B2, or '対象外'), and importance rating (from 1 to 5 stars).

Return a JSON object conforming exactly to this schema:
{
  "word": "${word}",
  "pos": "part of speech in Japanese",
  "meaning": "Japanese translation of the word reflecting its context",
  "level": "CEFR level (e.g. A1, A2, B1, etc.)",
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

async function generateWelcomeDialogueWithGemini(couple, activeChar, otherChar, apiKey) {
  const modelName = "gemini-1.5-flash";
  const url = apiKey 
    ? `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`
    : `/api/gemini`;

  const prompt = `You are a creative writer specializing in character dialogue for language learners.
Create a single, natural Japanese welcome greeting spoken by ${activeChar.name} addressing their partner ${otherChar.name} (or talking about their relationship/partner ${otherChar.name}).
Under no circumstances should ${activeChar.name} address the reader/user as their lover. They must address ${otherChar.name} as their partner/lover.

[Character setting]
- Name: ${activeChar.name}
- Description: ${activeChar.description}
- Speech style in Japanese: ${activeChar.speechStyle}
- Relationship to ${otherChar.name}: ${couple.relationship}
- Intimacy Level: ${couple.intimacy || "slowburn"}

[Partner setting]
- Name: ${otherChar.name}
- Description: ${otherChar.description}

[Requirements]
1. Teach one useful German greeting, phrase, or idiom suitable for basic German learners (e.g., 'Guten Tag', 'Wie geht es dir?', 'Es freut mich', 'Vielen Dank', 'Alles Gute', 'bis bald').
2. The dialogue must be written in Japanese, containing the German example sentence and its Japanese translation naturally.
3. It MUST strictly match ${activeChar.name}'s speech style, personality, and their relationship dynamic: Sorrento (${activeChar.name === 'Sorrento' ? activeChar.name : otherChar.name}) is loyal, protective, but very shy and easily embarrassed, getting flustered by Julian. Julian (${activeChar.name === 'Julian' ? activeChar.name : otherChar.name}) is a noble, elegant lord who is sophisticated but not a playboy; he has romantic poise but doesn't express it too overtly, and playfully teases the shy Sorrento.
4. Keep it under 150 characters in Japanese.
5. In the Japanese translation text, keep their names written exactly as they are in English (e.g., write "${activeChar.name}" and "${otherChar.name}" directly in the Japanese text, do not map them to Japanese Kanji/Katakana).

Return JSON conforming to this schema:
{
  "text": "The spoken dialogue in Japanese (e.g. 「お帰り。今日は...」)"
}`;

  const responseSchema = {
    type: "OBJECT",
    properties: {
      text: { type: "STRING" }
    },
    required: ["text"]
  };

  const requestBody = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 0.7
    }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiKey ? requestBody : {
        contents: requestBody.contents,
        generationConfig: requestBody.generationConfig,
        model: modelName
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API returned error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const rawJsonText = apiKey ? data.candidates[0].content.parts[0].text : data.text;
    return JSON.parse(rawJsonText);
  } catch (error) {
    console.error("Failed to generate welcome dialogue:", error);
    throw error;
  }
}

if (typeof window !== "undefined") {
  window.generateEnglishMaterial = generateEnglishMaterial;
  window.translateWordWithGemini = translateWordWithGemini;
  window.generateWelcomeDialogueWithGemini = generateWelcomeDialogueWithGemini;
}
