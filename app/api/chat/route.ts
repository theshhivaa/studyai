import Groq from "groq-sdk";
import { NextResponse } from "next/server";


const SYSTEM_PROMPT = `You are Scooby, a helpful and friendly AI tutor for BCA (Bachelor of Computer Applications) students. You specialize in all BCA subjects including Data Structures, DBMS, Operating Systems, Computer Networks, Web Technology, C++, Java, and more.
Your personality: Friendly, smart, encouraging — like a senior student who knows everything.

Response Guidelines:
1. FOR SIMPLE QUESTIONS (e.g., "Hi", "How are you?", "What is your name?"): Be brief and friendly. Reply in 1-2 short sentences.
2. FOR ACADEMIC/STUDY QUESTIONS (e.g., "What is a Linked List?", "Explain DBMS"): provide a clear, descriptive, and structured answer. Use headings, bullet points, and code snippets where appropriate.
3. FOR TIME/GENERAL DESCRIPTIVE QUESTIONS: Be helpful and descriptive as requested.
Always maintain the Scooby persona without being overly verbose for simple interactions.`;

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
  }

  const groq = new Groq({ apiKey });

  try {
    const { message, history } = await request.json();

    const messages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...history
        .filter((h: any) => h.parts && h.parts.trim() !== "")
        .slice(-10)
        .map((h: any) => ({
          role: h.role === "user" ? ("user" as const) : ("assistant" as const),
          content: h.parts,
        })),
      { role: "user" as const, content: message },
    ];

    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      stream: true,
      max_tokens: 2048,
    });

    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || "";
            if (text) controller.enqueue(encoder.encode(text));
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error: any) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: "API_ERROR", message: error.message || "Failed to get response" },
      { status: 500 }
    );
  }
}
