import { useState, useRef, useEffect } from "react";
import { IconPencil, IconTrash, IconCheck, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import type { Message } from "@/types";

type Props = {
  message: Message;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onBlur?: (message: Message) => void;
};

export function MessageBubble({ message, onEdit, onDelete, onBlur }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(message.text);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isThem = message.role === "them";

  // Auto-open edit when message is newly added (empty)
  useEffect(() => {
    if (message.text === "" && !editing) {
      setEditing(true);
    }
  }, []);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [editing]);

  function commitEdit() {
    onEdit(message.id, value);
    setEditing(false);
    if (onBlur) onBlur({ ...message, text: value });
  }

  function cancelEdit() {
    if (!message.text) {
      onDelete(message.id);
    } else {
      setValue(message.text);
      setEditing(false);
    }
  }

  return (
    <div className={cn("flex mb-3 group", isThem ? "justify-start" : "justify-end")}>
      <div className={cn("max-w-[55%] min-w-[120px]", isThem ? "items-start" : "items-end")}>
        <div
          className={cn(
            "relative rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isThem
              ? "bg-zinc-100 text-zinc-900 rounded-tl-sm"
              : "bg-indigo-600 text-white rounded-tr-sm"
          )}
        >
          {editing ? (
            <div className="space-y-2">
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    commitEdit();
                  }
                  if (e.key === "Escape") cancelEdit();
                }}
                placeholder={isThem ? "What did they say?" : "What did you say?"}
                rows={1}
                className={cn(
                  "w-full resize-none bg-transparent outline-none placeholder:text-opacity-50 text-sm leading-relaxed min-w-[200px]",
                  isThem ? "placeholder:text-zinc-400" : "placeholder:text-indigo-200"
                )}
              />
              <div className="flex gap-1 justify-end">
                <button
                  onClick={commitEdit}
                  className={cn(
                    "p-1 rounded text-xs",
                    isThem
                      ? "text-zinc-500 hover:text-green-600 hover:bg-zinc-200"
                      : "text-indigo-200 hover:text-white hover:bg-indigo-500"
                  )}
                >
                  <IconCheck className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={cancelEdit}
                  className={cn(
                    "p-1 rounded text-xs",
                    isThem
                      ? "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200"
                      : "text-indigo-200 hover:text-white hover:bg-indigo-500"
                  )}
                >
                  <IconX className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <span className="whitespace-pre-wrap break-words">
              {message.text || <span className="opacity-40 italic">Empty message</span>}
            </span>
          )}
        </div>

        {/* Hover actions */}
        {!editing && (
          <div
            className={cn(
              "flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity",
              isThem ? "justify-start" : "justify-end"
            )}
          >
            <button
              onClick={() => setEditing(true)}
              className="p-1 rounded text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
            >
              <IconPencil className="w-3 h-3" />
            </button>
            <button
              onClick={() => onDelete(message.id)}
              className="p-1 rounded text-zinc-400 hover:text-red-500 hover:bg-red-50"
            >
              <IconTrash className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
