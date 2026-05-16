import type { Conversation } from "@/types";

const CONVERSATIONS_KEY = "whatsay_conversations";
const ACTIVE_ID_KEY = "whatsay_active_id";

export function loadConversations(): Conversation[] {
  try {
    const raw = localStorage.getItem(CONVERSATIONS_KEY);
    return raw ? (JSON.parse(raw) as Conversation[]) : [];
  } catch {
    return [];
  }
}

export function saveConversations(conversations: Conversation[]): void {
  try {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
  } catch {
    // localStorage full — caller handles notification
  }
}

export function loadActiveId(): string | null {
  return localStorage.getItem(ACTIVE_ID_KEY);
}

export function saveActiveId(id: string): void {
  localStorage.setItem(ACTIVE_ID_KEY, id);
}
