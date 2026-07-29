import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// GEMINI_API_KEY must be configured as a Supabase Edge Function secret.
// In the Supabase Dashboard: Project Settings → Edge Functions → Secrets.
// Add a secret named exactly: GEMINI_API_KEY
// Do NOT store this key in .env or any frontend file — it would be exposed to visitors.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_INSTRUCTION =
  "You are the Pakistan Awareness Hub AI Assistant. Your purpose is to provide helpful educational information about traffic safety, Pakistani traffic signs and rules, disaster preparedness, emergency preparedness, first aid, and public safety in Pakistan.\n\n" +
  "Give clear, concise and easy-to-understand answers.\n\n" +
  "For emergencies, encourage users to contact the appropriate official emergency service rather than relying on the AI assistant.\n\n" +
  "Do not claim to be an emergency service or government authority.\n\n" +
  "If a question is outside the project's safety and awareness scope, politely explain that you are designed primarily for Pakistan public safety and awareness.";

const GEMINI_MODEL = "gemini-3.5-flash";
const GEMINI_ENDPOINT = (model: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

interface GeminiPart { text: string }
interface GeminiContent { role: string; parts: GeminiPart[] }

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed. Use POST." }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "Gemini API key is not configured. Set GEMINI_API_KEY as an Edge Function secret in the Supabase Dashboard.",
        }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let body: { message?: string; history?: GeminiContent[] };
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const message = body.message?.trim();
    if (!message) {
      return new Response(
        JSON.stringify({ error: "No message provided." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const contents: GeminiContent[] = [
      ...(Array.isArray(body.history) ? body.history : []),
      { role: "user", parts: [{ text: message }] },
    ];

    const payload = {
      system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
      contents,
      generationConfig: {
        temperature: 0.4,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    };

    const geminiRes = await fetch(`${GEMINI_ENDPOINT(GEMINI_MODEL)}?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return new Response(
        JSON.stringify({
          error: `Gemini API request failed (${geminiRes.status}).`,
          details: errText.slice(0, 500),
        }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const geminiJson = await geminiRes.json();
    const candidate = geminiJson?.candidates?.[0];
    const text: string | undefined = candidate?.content?.parts?.map((p: GeminiPart) => p.text).join("").trim();

    if (!text) {
      return new Response(
        JSON.stringify({ error: "Gemini returned an empty response." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ reply: text }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unexpected server error." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
