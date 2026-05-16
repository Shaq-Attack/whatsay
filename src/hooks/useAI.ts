import { useState, useCallback } from "react";
import { generateStream } from "@/lib/ollama";
import { buildPrompt } from "@/lib/prompt";
import type { Message, AIConfig } from "@/types";

export function useAI(model: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (params: {
      messages: Message[];
      context: string;
      aiConfig: AIConfig;
      onChunk: (chunk: string) => void;
      onComplete: () => void;
      onError: () => void;
    }) => {
      setIsLoading(true);
      setError(null);

      const prompt = buildPrompt({
        messages: params.messages,
        context: params.context,
        aiConfig: params.aiConfig,
      });

      try {
        for await (const chunk of generateStream({
          model,
          messages: prompt.messages,
          temperature: 0.75,
          maxTokens: prompt.maxTokens,
        })) {
          params.onChunk(chunk);
        }
        params.onComplete();
      } catch {
        setError("Could not reach Ollama. Is it still running?");
        params.onError();
      } finally {
        setIsLoading(false);
      }
    },
    [model]
  );

  return { generate, isLoading, error };
}
