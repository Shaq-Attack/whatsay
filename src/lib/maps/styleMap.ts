import type { Style } from "@/types";

export const styleMap: Record<Style, string> = {
  plain: "Clear, simple language. No jargon. Easy to read.",
  mimic: "Match the vocabulary, rhythm, and energy of the YOU messages in the conversation. If there are none, use casual language.",
  casual: "Informal and relaxed. Like a text message between friends.",
  polished: "Sophisticated and refined. Precise word choices, varied sentence structure.",
  concise: "As few words as possible while keeping full meaning. Strip all filler.",
  corporate: "Formal business register. Professional email or meeting style.",
};

export const styleLabels: Record<Style, string> = {
  plain: "Plain",
  mimic: "Mimic My Style",
  casual: "Casual",
  polished: "Polished",
  concise: "Concise",
  corporate: "Corporate",
};
