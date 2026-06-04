// api/gemini.js (Vercel Serverless Function)

export default async function handler(req, res) {
    // CORS headers setup
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    try {
        const { contents, generationConfig, model } = req.body;
        
        // Retrieve Gemini API Key from environment variables securely
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            res.status(500).json({ 
                error: 'サーバー側の環境変数 GEMINI_API_KEY が設定されていません。Vercel管理画面から登録してください。' 
            });
            return;
        }

        const modelName = model || "gemini-2.5-flash";
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

        const apiResponse = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contents, generationConfig })
        });

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            res.status(apiResponse.status).json({ 
                error: `Gemini API returned error: ${apiResponse.status} - ${errorText}` 
            });
            return;
        }

        const data = await apiResponse.json();
        const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        res.status(200).json({ text: textResult });

    } catch (error) {
        console.error('Serverless Function Error:', error);
        res.status(500).json({ error: error.message || '内部サーバーエラーが発生しました。' });
    }
}
