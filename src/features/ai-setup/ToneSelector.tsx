import { cn } from "@/lib/utils";
import { toneLabels, toneMap } from "@/lib/maps/toneMap";
import type { Tone } from "@/types";

const TONES: Tone[] = [
  "friendly", "professional", "direct", "assertive",
  "confident", "persuasive", "empathetic", "apologetic",
  "playful", "high-status",
];

type Props = { value: Tone; onChange: (v: Tone) => void };

export function ToneSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">Tone</label>
      <div className="flex flex-wrap gap-2">
        {TONES.map((tone) => (
          <button
            key={tone}
            onClick={() => onChange(tone)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
              value === tone
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-zinc-600 border-zinc-200 hover:border-indigo-300 hover:text-indigo-600"
            )}
          >
            {toneLabels[tone]}
          </button>
        ))}
      </div>
      {value && (
        <p className="text-xs text-zinc-400 mt-1">{toneMap[value]}</p>
      )}
    </div>
  );
}
