import { cn } from "@/lib/utils";
import { styleLabels, styleMap } from "@/lib/maps/styleMap";
import type { Style } from "@/types";

const STYLES: Style[] = ["plain", "mimic", "casual", "polished", "concise", "corporate"];

type Props = { value: Style; onChange: (v: Style) => void };

export function StyleSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">Writing Style</label>
      <div className="flex flex-wrap gap-2">
        {STYLES.map((style) => (
          <button
            key={style}
            onClick={() => onChange(style)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
              value === style
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-zinc-600 border-zinc-200 hover:border-indigo-300 hover:text-indigo-600"
            )}
          >
            {styleLabels[style]}
          </button>
        ))}
      </div>
      {value && (
        <p className="text-xs text-zinc-400 mt-1">{styleMap[value]}</p>
      )}
    </div>
  );
}
