import type { Length } from "@/types";

export const lengthMap: Record<Length, string> = {
  short: "1–2 sentences. Around 100–180 characters.",
  medium: "2–4 sentences. Around 180–350 characters.",
  long: "4–7 sentences. Around 350–700 characters.",
};

export const lengthMaxTokens: Record<Length, number> = {
  short: 120,
  medium: 280,
  long: 550,
};
