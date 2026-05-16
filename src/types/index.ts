export type MessageRole = "them" | "you";

export type Message = {
  id: string;
  role: MessageRole;
  text: string;
  createdAt: string;
};

export type GeneratedMessage = {
  id: string;
  text: string;
  status: "pending" | "approved";
  isStreaming?: boolean;
};

export type Tone =
  | "friendly"
  | "professional"
  | "direct"
  | "assertive"
  | "confident"
  | "persuasive"
  | "empathetic"
  | "apologetic"
  | "playful"
  | "high-status";

export type Intent =
  | "none"
  | "clarify"
  | "respond"
  | "set-boundaries"
  | "rebuild-connection"
  | "de-escalate"
  | "gain-respect"
  | "end-conversation"
  | "re-engage";

export type Style = "plain" | "mimic" | "casual" | "polished" | "concise" | "corporate";

export type Length = "short" | "medium" | "long";

export type AIConfig = {
  tone: Tone;
  intent: Intent;
  style: Style;
  length: Length;
  language: string;
};

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  context: string;
  aiConfig: AIConfig;
  createdAt: string;
  updatedAt: string;
};

export const DEFAULT_AI_CONFIG: AIConfig = {
  tone: "friendly",
  intent: "respond",
  style: "plain",
  length: "medium",
  language: "auto",
};

export function createConversation(): Conversation {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: "New Conversation",
    messages: [],
    context: "",
    aiConfig: { ...DEFAULT_AI_CONFIG },
    createdAt: now,
    updatedAt: now,
  };
}
