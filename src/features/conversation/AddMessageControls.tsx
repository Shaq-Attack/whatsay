import { IconPlus } from "@tabler/icons-react";
import type { MessageRole } from "@/types";

type Props = {
  themName: string;
  youName: string;
  onAdd: (role: MessageRole) => void;
};

export function AddMessageControls({ themName, youName, onAdd }: Props) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onAdd("them")}
        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:border-zinc-300 transition-colors"
      >
        <IconPlus className="w-3.5 h-3.5" />
        {themName || "Them"}
      </button>
      <button
        onClick={() => onAdd("you")}
        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
      >
        <IconPlus className="w-3.5 h-3.5" />
        {youName || "You"}
      </button>
    </div>
  );
}
