import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, format } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key Configuration Error" }, { status: 500 });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Act as a dedicated creative marketing manager copywriter for Fired Arts Studio. Tone is energetic, artistic, tactile, using metaphors of heat/kilns/clay/rebirth. Format: ${format}. Input Prompt: ${prompt}`
          }]
        }]
      })
    });

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Generation failure.";

    return NextResponse.json({ result: generatedText });
  } catch (error) {
    console.error("Gemini API route error:", error);
    return NextResponse.json({ error: "Internal Server Processing Error" }, { status: 500 });
  }
}
