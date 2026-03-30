export async function getScoobyResponse(
  message: string, 
  history: { role: string; parts: string }[] = [],
  fileData?: { mimeType: string; data: string },
  onChunk?: (chunk: string) => void
) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, history, fileData }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (errorData.error === "API Key not configured") {
        return "I'm sorry, but my brain (API Key) isn't connected yet! Please add a GROQ_API_KEY to the .env.local file.";
      }
      throw new Error(errorData.message || response.statusText || "Failed to fetch response");
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    if (!reader) {
      const text = await response.text();
      return text || "I received an empty response from the server. Please try again.";
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      fullText += chunk;
      if (onChunk) {
        onChunk(chunk);
      }
    }

    return fullText;
  } catch (error: any) {
    console.error("Error calling Scooby API:", error);
    if (error.message?.includes("Failed to fetch")) {
      return "I'm having trouble connecting to my brain right now. Please check your internet connection or try again later!";
    }
    return error.message || "Oops! I ran into a bit of a technical glitch. Can you try asking me again?";
  }
}
