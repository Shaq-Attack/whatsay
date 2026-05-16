import { IconPlus, IconBrain } from "@tabler/icons-react";
import { ConversationList } from "./ConversationList";
import type { Conversation } from "@/types";

type Props = {
  conversations: Conversation[];
  activeId: string | null;
  onNew: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
};

export function Sidebar({ conversations, activeId, onNew, onSelect, onDelete, onRename }: Props) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <IconBrain className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-zinc-800">WhatSay</span>
        </div>
        <button
          onClick={onNew}
          title="New conversation"
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 transition-colors"
        >
          <IconPlus className="w-4 h-4" />
        </button>
      </div>

      {/* List */}
      <ConversationList
        conversations={conversations}
        activeId={activeId}
        onSelect={onSelect}
        onDelete={onDelete}
        onRename={onRename}
      />

      {/* Footer */}
      <div className="px-4 py-3 border-t border-zinc-100">
        <p className="text-xs text-zinc-400 text-center">
          Powered by Google Gemma 4 · 100% local
        </p>
      </div>
    </div>
  );
}
