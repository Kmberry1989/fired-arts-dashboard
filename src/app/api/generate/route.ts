import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, format } = await request.json();

    const response = await fetch(`https://googleapis.com{process.env.GEMINI_API_KEY}`, {
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
    const generatedText = data.candidates?.?.content?.parts?.?.text || "Generation failure.";

    return NextResponse.json({ result: generatedText });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Processing Error" }, { status: 500 });
  }
}
