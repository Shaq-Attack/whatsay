import type { Tone } from "@/types";

export const toneMap: Record<Tone, string> = {
  friendly: "Warm, approachable, and genuine. Feel like talking to a trusted friend.",
  professional: "Polished and respectful. Clear, composed, and suitable for a workplace.",
  direct: "Straightforward and unambiguous. Get to the point without filler.",
  assertive: "Confident and clear about needs and limits. Firm, not aggressive.",
  confident: "Self-assured and decisive. No hedging or apology for your position.",
  persuasive: "Logical and compelling. Guide the other person toward your preferred outcome.",
  empathetic: "Acknowledge feelings first. Show understanding before anything else.",
  apologetic: "Genuine and specific about what went wrong. Avoid hollow phrases.",
  playful: "Light, fun, and witty. Don't take things too seriously.",
  "high-status": "Calm and unhurried. Speak from a position of security and value.",
};

export const toneLabels: Record<Tone, string> = {
  friendly: "Friendly",
  professional: "Professional",
  direct: "Direct",
  assertive: "Assertive",
  confident: "Confident",
  persuasive: "Persuasive",
  empathetic: "Empathetic",
  apologetic: "Apologetic",
  playful: "Playful",
  "high-status": "High Status",
};
