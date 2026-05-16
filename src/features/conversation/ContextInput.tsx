import { useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const MAX = 1000;

export function ContextInput({ value, onChange }: Props) {
  const [focused, setFocused] = useState(false);
  const near = value.length > MAX * 0.85;

  return (
    <div className="space-y-1">
      <label className="text-xs text-zinc-400 font-medium">
        Context <span className="text-zinc-300">(optional)</span>
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder='Background info for the AI — e.g. "This is my boss" or "We argued last week"'
        maxLength={MAX}
        rows={2}
        className={`w-full resize-none text-sm rounded-lg border px-3 py-2 bg-white outline-none transition-colors placeholder:text-zinc-300 leading-relaxed
          ${focused ? "border-indigo-300 ring-1 ring-indigo-200" : "border-zinc-200"}
        `}
      />
      {(focused || near) && (
        <p className={`text-xs text-right ${near ? "text-amber-500" : "text-zinc-300"}`}>
          {value.length}/{MAX}
        </p>
      )}
    </div>
  );
}
