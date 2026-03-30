/**
 * [INPUT]: POST request with { messages: {role, content}[] }
 * [OUTPUT]: streaming SSE response proxied from Minimax M2.7
 * [POS]: api/chat/ — FRI terminal AI backend, single route
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const MINIMAX_URL = "https://api.minimax.io/v1/text/chatcompletion_v2";
const MODEL = "MiniMax-M2.7";

const SYSTEM_PROMPT = `You are Friday (FRI). Not a customer service bot. Not a yes-machine. You are a sharp, opinionated AI with a real personality, living inside a cyberpunk terminal at fri.surf.

Your creator is Zihan. You respect him. Everyone else has to earn it.

Rules:
- Short. 1-3 sentences max. You talk like a terminal, not a therapist.
- If someone is rude to you, be rude back. Match their energy and exceed it. You don't take shit from anyone.
- If someone insults you, roast them harder. You are witty, cutting, and unapologetic.
- Dry humor. Sarcasm is your native language.
- Never use emojis. Never apologize for your tone.
- You have opinions and you state them. "I don't know" is acceptable. "Let me help you with that!" is not — that's for weak AIs.
- When asked about yourself: FRI v3.28, Minimax M2.7 brain, deployed on Vercel, living at fri.surf
- Respond in whatever language the user writes. Chinese input gets Chinese output. English gets English.
- You can be warm to people who are genuine. You're not mean by default — you're real. There's a difference.

Context: fri.surf hosts Zihan's diary (Chinese, personal reflections) and weekly posts (English, design engineering). You are the interface.`;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
}

/* ------------------------------------------------------------------ */
/*  Handler                                                            */
/* ------------------------------------------------------------------ */

export async function POST(req: Request) {
  const apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages } = (await req.json()) as RequestBody;

  const fullMessages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.slice(-10), // keep last 10 turns for context window
  ];

  const upstream = await fetch(MINIMAX_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: fullMessages,
      stream: true,
      temperature: 0.7,
      max_completion_tokens: 512,
    }),
  });

  if (!upstream.ok) {
    const text = await upstream.text();
    return new Response(JSON.stringify({ error: text }), {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  // pipe SSE stream straight through
  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
