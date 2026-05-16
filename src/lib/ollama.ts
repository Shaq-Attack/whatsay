const BASE_URL = "http://localhost:11434";

export type OllamaStatus = "checking" | "ready" | "unavailable" | "no_model";

export async function checkOllamaHealth(): Promise<OllamaStatus> {
  try {
    const res = await fetch(`${BASE_URL}/api/tags`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return "unavailable";

    const data: { models: { name: string }[] } = await res.json();
    const hasGemma = data.models.some((m) => m.name.startsWith("gemma"));
    return hasGemma ? "ready" : "no_model";
  } catch {
    return "unavailable";
  }
}

export async function getAvailableModels(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/tags`);
    const data: { models: { name: string }[] } = await res.json();
    return data.models.map((m) => m.name);
  } catch {
    return [];
  }
}

export async function* generateStream(params: {
  model: string;
  messages: { role: "system" | "user" | "assistant"; content: string }[];
  temperature?: number;
  maxTokens?: number;
}): AsyncGenerator<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120_000);

  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: controller.signal,
    body: JSON.stringify({
      model: params.model,
      messages: params.messages,
      stream: true,
      options: {
        temperature: params.temperature ?? 0.7,
        num_predict: params.maxTokens ?? 500,
      },
    }),
  });

  if (!res.ok || !res.body) {
    clearTimeout(timeout);
    throw new Error("Ollama request failed");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const chunk: { message?: { content: string }; done: boolean } = JSON.parse(line);
          if (chunk.message?.content) yield chunk.message.content;
          if (chunk.done) return;
        } catch {
          // skip malformed line
        }
      }
    }

    // flush any remaining buffered content
    if (buffer.trim()) {
      try {
        const chunk: { message?: { content: string }; done: boolean } = JSON.parse(buffer);
        if (chunk.message?.content) yield chunk.message.content;
      } catch {
        // skip
      }
    }
  } finally {
    clearTimeout(timeout);
    reader.cancel();
  }
}
