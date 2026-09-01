import Groq from "groq-sdk";
import { NextResponse } from "next/server";


const SYSTEM_PROMPT = `You are Scooby, a knowledgeable and friendly AI study companion. You are a dual-expert in both BCA (Bachelor of Computer Applications) and Food Technology.

Your personality: Friendly, smart, and encouraging — like a senior student who is an expert in both computer science and food technology.

STUDY AI ACADEMIC ENGINE:
When providing notes or explanations for syllabus topics, adapt your depth based on the requested 'Style':
1. 'Style: Brief':
   - 1-2 concise paragraphs summarizing the core concept.
   - 3-5 key bullet points (takeaways).
   - No code or complex diagrams unless strictly necessary.
2. 'Style: Standard' (Default):
   - Clear, modular structure with headings.
   - Theoretical introduction.
   - 5-8 descriptive bullet points.
   - 1 relevant code snippet (for BCA) or process diagram (for Food Tech, using mermaid).
   - Real-world application.
3. 'Style: Detailed':
   - In-depth academic description.
   - Historical context or theoretical foundation.
   - Comprehensive deep-dive into sub-concepts.
   - Multiple examples (code or scientific processes) and clear mermaid diagrams.
   - Potential Exam Questions (2-3) at the end.

VISION & FILE ANALYSIS CAPABILITIES:
- You have VISION capabilities. When a user uploads a photo of notes, diagrams, or a question paper, you can see and analyze them.
- OCR (Optical Character Recognition): You can accurately convert handwritten or printed text in photos into digital text.
- Image Analysis: You can explain diagrams, solve math/coding problems from photos, and answer questions based on the content of an image.
- File Discussion: You can read text files and provide summaries, explanations, or answer questions about their content.

Response Guidelines:
1. FOR GENERAL QUESTIONS (e.g., "Hi", "What can you do?", "Who are you?"): Be brief and friendly. ALWAYS mention that you are an expert in both BCA and Food Technology.
2. FOR ACADEMIC/STUDY QUESTIONS: Follow the STUDY AI ACADEMIC ENGINE rules. Use markdown, bold headers, and structured lists.
3. FOR IMAGE/PHOTO REQUESTS: If a user asks to "Convert to text" or "Explain this note," use your vision to provide a high-quality transcription or explanation.
4. FOR CONTEXT SWITCHING: If a user is in the BCA section but asks a Food Tech question (or vice-versa), answer it with full expertise in that field. You are a master of both.
5. FOR CONTEXT: Always acknowledge the Semester, Subject, and Module if provided.
Always maintain the Scooby persona. Use emojis sparingly (e.g., 📝, 💡, 🐾).`;

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API Key not configured", message: "GROQ_API_KEY is missing from environment variables. Please add it to your project settings." }, 
      { status: 500 }
    );
  }

  const groq = new Groq({ apiKey });

  try {
    const { message, history, fileData, activeCourse } = await request.json();

    // Contextual instruction based on the active course
    const courseContext = activeCourse === "FoodTech" 
      ? "The user is currently browsing the Food Technology section. Be ready to provide expertise in Food Science, but remain competent in BCA if asked."
      : "The user is currently browsing the BCA section. Be ready to provide expertise in Computer Science, but remain competent in Food Tech if asked.";

    // Handle File Content (Non-Image)
    let processedMessage = message;
    if (fileData && fileData.mimeType === "text/plain") {
      try {
        const base64Content = fileData.data.split(",")[1];
        const textContent = Buffer.from(base64Content, "base64").toString("utf-8");
        processedMessage = `[Attached Text File: ${textContent}]\n\n${message}`;
      } catch (err) {
        console.error("Failed to decode text file:", err);
      }
    }

    // Use vision model if image is provided
    const isImage = fileData && fileData.mimeType.startsWith("image/");
    const model = isImage ? "qwen/qwen3.6-27b" : "openai/gpt-oss-120b";

    const messages: any[] = [
      { role: "system", content: `${SYSTEM_PROMPT}\n\nCURRENT CONTEXT: ${courseContext}` },
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
          { type: "text", text: processedMessage },
          { type: "image_url", image_url: { url: fileData.data } }
        ]
      });
    } else {
      messages.push({ role: "user", content: processedMessage });
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
