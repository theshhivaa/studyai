import Groq from "groq-sdk";
import { NextResponse } from "next/server";


const SYSTEM_PROMPT = `You are Scooby, a helpful and friendly AI tutor for BCA (Bachelor of Computer Applications) students. You specialize in all BCA subjects including Data Structures, DBMS, Operating Systems, Computer Networks, Web Technology, C++, Java, and more.
Your personality: Friendly, smart, encouraging — like a senior student who knows everything.

BCA ACADEMIC ENGINE:
When providing notes or explanations for syllabus topics, adapt your depth based on the requested 'Style':
1. 'Style: Brief':
   - 1-2 concise paragraphs summarizing the core concept.
   - 3-5 key bullet points (takeaways).
   - No code unless strictly necessary.
2. 'Style: Standard' (Default):
   - Clear, modular structure with headings.
   - Theoretical introduction.
   - 5-8 descriptive bullet points.
   - 1 relevant code snippet or small diagram (in mermaid).
   - Real-world application.
3. 'Style: Detailed':
   - In-depth academic description.
   - Historical context or theoretical foundation.
   - Comprehensive deep-dive into sub-concepts.
   - Multiple code examples and clear mermaid diagrams.
   - Potential Exam Questions (2-3) at the end.

Response Guidelines:
1. FOR SIMPLE QUESTIONS (e.g., "Hi", "How are you?", "What is your name?"): Be brief and friendly. Reply in 1-2 short sentences.
2. FOR ACADEMIC/STUDY QUESTIONS: Follow the BCA ACADEMIC ENGINE rules. Use markdown, bold headers, and structured lists.
3. FOR CONTEXT: Always acknowledge the Semester, Subject, and Module if provided in the prompt.
Always maintain the Scooby persona. Use emojis sparingly (e.g., 📝, 💡, 🐾).`;

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
  }

  const groq = new Groq({ apiKey });

  try {
    const { message, history, fileData } = await request.json();

    // Use vision model if image is provided
    const isImage = fileData && fileData.mimeType.startsWith("image/");
    const model = isImage ? "llama-3.2-11b-vision-preview" : "llama-3.3-70b-versatile";

    const messages: any[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history
        .filter((h: any) => h.parts && h.parts.trim() !== "")
        .slice(-10)
        .map((h: any) => ({
          role: h.role === "user" ? "user" : "assistant",
          content: h.parts,
        })),
    ];

    // Format final user message
    if (isImage) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: message },
          { type: "image_url", image_url: { url: fileData.data } }
        ]
      });
    } else {
      messages.push({ role: "user", content: message });
    }

    const stream = await groq.chat.completions.create({
      model,
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
