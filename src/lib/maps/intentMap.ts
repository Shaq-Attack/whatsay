import type { Intent } from "@/types";

export const intentMap: Record<Intent, string> = {
  none: "No specific goal. Respond naturally to continue the conversation.",
  clarify: "Seek clarity on something unclear. Ask a focused question.",
  respond: "Give a thoughtful, appropriate response to what was said.",
  "set-boundaries": "Politely but clearly establish a limit or expectation.",
  "rebuild-connection": "Reduce distance and re-establish warmth between the two parties.",
  "de-escalate": "Lower tension and steer toward calm, productive ground.",
  "gain-respect": "Communicate in a way that signals competence and self-respect.",
  "end-conversation": "Bring the conversation to a natural, graceful close.",
  "re-engage": "Reignite a conversation that has gone quiet or cold.",
};

export const intentLabels: Record<Intent, string> = {
  none: "None",
  clarify: "Clarify",
  respond: "Respond",
  "set-boundaries": "Set Boundaries",
  "rebuild-connection": "Rebuild Connection",
  "de-escalate": "De-escalate",
  "gain-respect": "Gain Respect",
  "end-conversation": "End Conversation",
  "re-engage": "Re-engage",
};
