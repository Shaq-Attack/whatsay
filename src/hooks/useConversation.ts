import { useState, useEffect, useCallback } from "react";
import { loadConversations, saveConversations, loadActiveId, saveActiveId } from "@/lib/storage";
import { createConversation } from "@/types";
import type { Conversation, Message, MessageRole, AIConfig, GeneratedMessage } from "@/types";

export function useConversation() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [generated, setGenerated] = useState<GeneratedMessage[]>([]);

  useEffect(() => {
    const stored = loadConversations();
    const savedId = loadActiveId();

    if (stored.length === 0) {
      const first = createConversation();
      setConversations([first]);
      setActiveId(first.id);
      saveConversations([first]);
      saveActiveId(first.id);
    } else {
      setConversations(stored);
      const validId = savedId && stored.find((c) => c.id === savedId) ? savedId : stored[0].id;
      setActiveId(validId);
    }
  }, []);

  useEffect(() => {
    if (conversations.length > 0) saveConversations(conversations);
  }, [conversations]);

  useEffect(() => {
    if (activeId) saveActiveId(activeId);
  }, [activeId]);

  const active = conversations.find((c) => c.id === activeId) ?? null;

  const updateActive = useCallback(
    (patch: Partial<Conversation>) => {
      if (!activeId) return;
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId ? { ...c, ...patch, updatedAt: new Date().toISOString() } : c
        )
      );
    },
    [activeId]
  );

  function newConversation() {
    const c = createConversation();
    setConversations((prev) => [c, ...prev]);
    setActiveId(c.id);
    setGenerated([]);
  }

  function selectConversation(id: string) {
    setActiveId(id);
    setGenerated([]);
  }

  function deleteConversation(id: string) {
    setConversations((prev) => {
      const next = prev.filter((c) => c.id !== id);
      if (next.length === 0) {
        const fresh = createConversation();
        setActiveId(fresh.id);
        return [fresh];
      }
      if (activeId === id) setActiveId(next[0].id);
      return next;
    });
  }

  function renameConversation(id: string, title: string) {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title, updatedAt: new Date().toISOString() } : c))
    );
  }

  function addMessage(role: MessageRole) {
    if (!active) return;
    const msg: Message = {
      id: crypto.randomUUID(),
      role,
      text: "",
      createdAt: new Date().toISOString(),
    };
    updateActive({ messages: [...active.messages, msg] });
  }

  function editMessage(msgId: string, text: string) {
    if (!active) return;
    updateActive({
      messages: active.messages.map((m) => (m.id === msgId ? { ...m, text } : m)),
    });
  }

  function deleteMessage(msgId: string) {
    if (!active) return;
    updateActive({ messages: active.messages.filter((m) => m.id !== msgId) });
  }

  function setContext(context: string) {
    updateActive({ context });
  }

  function setAIConfig(aiConfig: AIConfig) {
    updateActive({ aiConfig });
  }

  function autoTitle(text: string) {
    if (!active || active.title !== "New Conversation" || !text.trim()) return;
    const title = text.length > 40 ? text.slice(0, 40) + "…" : text;
    renameConversation(active.id, title);
  }

  // Generated message management

  function startGenerating(): string {
    const id = crypto.randomUUID();
    setGenerated([{ id, text: "", status: "pending", isStreaming: true }]);
    return id;
  }

  function appendChunk(id: string, chunk: string) {
    setGenerated((prev) =>
      prev.map((g) => (g.id === id ? { ...g, text: g.text + chunk } : g))
    );
  }

  function finishGenerating(id: string) {
    setGenerated((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isStreaming: false } : g))
    );
  }

  function approveGenerated(id: string) {
    const selected = generated.find((g) => g.id === id);
    if (!selected || !active) return;

    const newMsg: Message = {
      id: crypto.randomUUID(),
      role: "you",
      text: selected.text,
      createdAt: new Date().toISOString(),
    };

    updateActive({ messages: [...active.messages, newMsg] });
    setGenerated([]);

    navigator.clipboard.writeText(selected.text).catch(() => {});
  }

  function rejectGenerated() {
    setGenerated([]);
  }

  return {
    conversations,
    active,
    activeId,
    generated,
    newConversation,
    selectConversation,
    deleteConversation,
    renameConversation,
    addMessage,
    editMessage,
    deleteMessage,
    setContext,
    setAIConfig,
    autoTitle,
    startGenerating,
    appendChunk,
    finishGenerating,
    approveGenerated,
    rejectGenerated,
  };
}
