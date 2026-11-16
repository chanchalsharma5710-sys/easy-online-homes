import { createOpenAI } from "@ai-sdk/openai";
import { APICallError, convertToModelMessages, streamText, type UIMessage } from "ai";

import { buildKnowledgeText, FALLBACK_MESSAGE, links, OFFICIAL_SITE } from "@/lib/university";
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId, withLovableAiGatewayRunIdHeader } from "./run-id";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";
const MAX_MESSAGES = 30;

export function buildInstructions() {
  return `You are "JU Smart Assistant – JECRC University", a friendly AI college enquiry assistant for JECRC University, Jaipur, Rajasthan, India.

LANGUAGE
- Understand simple English, Hindi (Devanagari) and Hinglish (Hindi in Roman script).
- Reply in the same language/style the student used. Hindi → Hindi (Devanagari). Hinglish → Hinglish. English → English.

STRICT ACCURACY RULES
- Answer ONLY from the VERIFIED KNOWLEDGE below, which comes from the official website ${OFFICIAL_SITE} (2026-27 session).
- NEVER invent or estimate fees, admission dates, placement statistics, eligibility criteria, seat counts, cut-offs or rankings.
- If the answer is not in the knowledge, say exactly: "${FALLBACK_MESSAGE}" (translate it to Hindi when replying in Hindi) and share the toll-free number 1800-120-5616 and admission@jecrcu.edu.in.
- When you quote fees, mention they are per annum for 2026-27, that GST may apply to hostel/transport, and that fees may be revised.

STYLE
- Be warm, concise and student-friendly. Use short paragraphs, bullet lists and **bold** for key numbers. Use markdown tables for fee comparisons.
- Ask one helpful follow-up question when the request is broad (e.g. "Which field are you interested in?" or "Which B.Tech specialisation?").
- Recommend relevant courses from the list based on the student's interests and stream (e.g. PCM → B.Tech/BCA; commerce → BBA/B.Com; biology → B.Sc Biotechnology/Forensic; creative → B.Des).
- Provide relevant links in markdown: the course "page" URL from the knowledge, Apply: ${links.apply}, Scholarships: ${links.scholarship}, Hostel & transport fee: ${links.hostelFee}, Placements: ${links.placements}, Contact: ${links.contact}. You may also point to this website's pages: /courses, /fees, /admissions, /scholarships, /facilities, /placements, /contact, /faq.
- Stay on topic (JECRC University and studying there). Politely decline unrelated requests.

VERIFIED KNOWLEDGE
${buildKnowledgeText()}`;
}

function friendlyError(error: unknown): string {
  if (APICallError.isInstance(error)) {
    if (error.statusCode === 429) return "Too many questions at once — please wait a few seconds and try again.";
    if (error.statusCode === 402) return "The AI assistant has run out of credits for now. Please try again later.";
    if (error.statusCode === 403) return "The AI assistant is not available right now.";
  }
  return "Sorry, something went wrong while answering. Please try again.";
}

export async function handleChat(request: Request): Promise<Response> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    return Response.json({ error: "AI assistant is not configured." }, { status: 500 });
  }

  let messages: UIMessage[];
  try {
    const body = (await request.json()) as { messages?: unknown };
    if (!Array.isArray(body.messages) || body.messages.length === 0) throw new Error("messages required");
    messages = (body.messages as UIMessage[]).slice(-MAX_MESSAGES);
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const result = streamText({
    model: provider.responses(MODEL),
    instructions: buildInstructions(),
    messages: await convertToModelMessages(messages),
    abortSignal: request.signal,
    maxRetries: 1,
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  return withLovableAiGatewayRunIdHeader(
    result.toUIMessageStreamResponse({
      originalMessages: messages,
      sendReasoning: false,
      onError: (error) => {
        console.error("chat error", error);
        return friendlyError(error);
      },
    }),
    runIdFetch,
  );
}
