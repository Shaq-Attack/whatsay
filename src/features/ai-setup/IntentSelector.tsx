import { cn } from "@/lib/utils";
import { intentLabels, intentMap } from "@/lib/maps/intentMap";
import type { Intent } from "@/types";

const INTENTS: Intent[] = [
  "none", "clarify", "respond", "set-boundaries",
  "rebuild-connection", "de-escalate", "gain-respect",
  "end-conversation", "re-engage",
];

type Props = { value: Intent; onChange: (v: Intent) => void };

export function IntentSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">Intent</label>
      <div className="flex flex-wrap gap-2">
        {INTENTS.map((intent) => (
          <button
            key={intent}
            onClick={() => onChange(intent)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
              value === intent
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-zinc-600 border-zinc-200 hover:border-indigo-300 hover:text-indigo-600"
            )}
          >
            {intentLabels[intent]}
          </button>
        ))}
      </div>
      {value && (
        <p className="text-xs text-zinc-400 mt-1">{intentMap[value]}</p>
      )}
    </div>
  );
}
