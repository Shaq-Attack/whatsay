import { useState } from "react";
import { IconRobot, IconCheck, IconPencil } from "@tabler/icons-react";

type Props = {
  title: string;
  onRename: (title: string) => void;
  onOpenAISetup: () => void;
};

export function ConversationHeader({ title, onRename, onOpenAISetup }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);

  function commit() {
    if (value.trim()) onRename(value.trim());
    setEditing(false);
  }

  // Sync value if title changes externally (auto-title)
  if (!editing && value !== title) {
    setValue(title);
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 bg-white shrink-0">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {editing ? (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <input
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") commit();
                if (e.key === "Escape") setEditing(false);
              }}
              onBlur={commit}
              className="flex-1 min-w-0 text-sm font-medium bg-transparent border-b border-indigo-400 outline-none pb-0.5"
            />
            <button onClick={commit} className="text-green-600 shrink-0">
              <IconCheck className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="group flex items-center gap-2 min-w-0"
          >
            <h2 className="text-sm font-semibold text-zinc-800 truncate">{title}</h2>
            <IconPencil className="w-3 h-3 text-zinc-300 group-hover:text-zinc-500 shrink-0 transition-colors" />
          </button>
        )}
      </div>

      <button
        onClick={onOpenAISetup}
        title="AI Setup"
        className="ml-3 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-indigo-600 transition-colors shrink-0"
      >
        <IconRobot className="w-4 h-4" />
      </button>
    </div>
  );
}
