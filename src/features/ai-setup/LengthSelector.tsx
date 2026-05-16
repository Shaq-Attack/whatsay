import { cn } from "@/lib/utils";
import type { Length } from "@/types";

const OPTIONS: { value: Length; label: string; desc: string }[] = [
  { value: "short", label: "Short", desc: "1–2 sentences" },
  { value: "medium", label: "Medium", desc: "2–4 sentences" },
  { value: "long", label: "Long", desc: "4–7 sentences" },
];

type Props = { value: Length; onChange: (v: Length) => void };

export function LengthSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">Length</label>
      <div className="flex gap-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex-1 flex flex-col items-center gap-0.5 py-2.5 rounded-lg border text-xs font-medium transition-colors",
              value === opt.value
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-zinc-600 border-zinc-200 hover:border-indigo-300 hover:text-indigo-600"
            )}
          >
            <span>{opt.label}</span>
            <span className={cn("font-normal", value === opt.value ? "text-indigo-200" : "text-zinc-400")}>
              {opt.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
