import { useState, useEffect, useCallback } from "react";
import { checkOllamaHealth, getAvailableModels, type OllamaStatus } from "@/lib/ollama";

// Gemma 4 uses "e" prefix for edge models: e4b = effective 4B, e2b = effective 2B
const MODEL_PREFERENCE = ["gemma4:e4b", "gemma4:e2b", "gemma4", "gemma4:26b", "gemma3:4b", "gemma3"];

export function useOllama() {
  const [status, setStatus] = useState<OllamaStatus>("checking");
  const [selectedModel, setSelectedModel] = useState<string>("gemma4:e4b");
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  const check = useCallback(async () => {
    setStatus("checking");
    const health = await checkOllamaHealth();
    setStatus(health);

    if (health === "ready") {
      const models = await getAvailableModels();
      setAvailableModels(models);
      const best = MODEL_PREFERENCE.find((pref) =>
        models.some((m) => m.startsWith(pref))
      );
      if (best) {
        const match = models.find((m) => m.startsWith(best));
        if (match) setSelectedModel(match);
      }
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  return { status, selectedModel, setSelectedModel, availableModels, retry: check };
}
