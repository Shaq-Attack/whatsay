import { useState } from "react";
import { IconTrash, IconPencil, IconCheck, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/types";

type Props = {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
};

export function ConversationList({ conversations, activeId, onSelect, onDelete, onRename }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const sorted = [...conversations].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  function startEdit(conv: Conversation, e: React.MouseEvent) {
    e.stopPropagation();
    setEditingId(conv.id);
    setEditValue(conv.title);
  }

  function commitEdit(id: string) {
    if (editValue.trim()) onRename(id, editValue.trim());
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function handleDelete(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    onDelete(id);
  }

  return (
    <div className="flex-1 overflow-y-auto py-1">
      {sorted.map((conv) => {
        const isActive = conv.id === activeId;
        const isEditing = editingId === conv.id;

        return (
          <div
            key={conv.id}
            onClick={() => !isEditing && onSelect(conv.id)}
            className={cn(
              "group relative flex items-center gap-2 px-3 py-2.5 mx-2 rounded-lg cursor-pointer text-sm",
              isActive
                ? "bg-indigo-50 text-indigo-900"
                : "text-zinc-700 hover:bg-zinc-100"
            )}
          >
            {isEditing ? (
              <div className="flex items-center gap-1 flex-1 min-w-0" onClick={(e) => e.stopPropagation()}>
                <input
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitEdit(conv.id);
                    if (e.key === "Escape") cancelEdit();
                  }}
                  className="flex-1 min-w-0 text-sm bg-white border border-indigo-300 rounded px-2 py-0.5 outline-none focus:ring-1 focus:ring-indigo-400"
                />
                <button onClick={() => commitEdit(conv.id)} className="text-green-600 hover:text-green-700 p-0.5">
                  <IconCheck className="w-3.5 h-3.5" />
                </button>
                <button onClick={cancelEdit} className="text-zinc-400 hover:text-zinc-600 p-0.5">
                  <IconX className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                <span className="flex-1 truncate">{conv.title}</span>
                <div className="hidden group-hover:flex items-center gap-0.5 shrink-0">
                  <button
                    onClick={(e) => startEdit(conv, e)}
                    className="p-1 rounded hover:bg-zinc-200 text-zinc-400 hover:text-zinc-600"
                  >
                    <IconPencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(conv.id, e)}
                    className="p-1 rounded hover:bg-red-100 text-zinc-400 hover:text-red-500"
                  >
                    <IconTrash className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
