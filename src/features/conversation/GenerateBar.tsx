import { IconSparkles, IconAlertCircle, IconSelector } from "@tabler/icons-react";

type Props = {
  model: string;
  models: string[];
  loading: boolean;
  disabled: boolean;
  error: string | null;
  onClick: () => void;
  onModelChange: (model: string) => void;
};

export function GenerateBar({ model, models, loading, disabled, error, onClick, onModelChange }: Props) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="relative">
          <select
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            disabled={loading}
            className="appearance-none text-xs text-zinc-400 hover:text-zinc-600 bg-transparent pr-5 py-1 cursor-pointer disabled:cursor-not-allowed focus:outline-none truncate max-w-[200px]"
          >
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <IconSelector className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
        </div>
        <button
          onClick={onClick}
          disabled={disabled || loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <IconSparkles className="w-3.5 h-3.5" />
              Generate Reply
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">
          <IconAlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </div>
      )}

      {disabled && !loading && (
        <p className="text-xs text-zinc-400 text-right">
          Add at least one message to generate a reply.
        </p>
      )}
    </div>
  );
}
