import { IconCheck, IconRefresh, IconX, IconCopy } from "@tabler/icons-react";
import type { GeneratedMessage } from "@/types";

type Props = {
  message: GeneratedMessage;
  onApprove: (id: string) => void;
  onReject: () => void;
  onRegenerate: () => void;
};

export function GeneratedMessageBubble({ message, onApprove, onReject, onRegenerate }: Props) {
  return (
    <div className="flex justify-end mb-3">
      <div className="max-w-[55%] min-w-[120px]">
        {/* Bubble */}
        <div className="relative rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed border-2 border-amber-300 bg-amber-50 text-zinc-800">
          {message.text ? (
            <span className="whitespace-pre-wrap break-words">
              {message.text}
              {message.isStreaming && (
                <span className="inline-block w-0.5 h-4 bg-amber-500 ml-0.5 animate-pulse align-middle" />
              )}
            </span>
          ) : (
            <span className="flex items-center gap-2 text-amber-600">
              <span className="w-3 h-3 rounded-full border-2 border-amber-500 border-t-transparent animate-spin inline-block" />
              Generating…
            </span>
          )}
        </div>

        {/* Label */}
        <p className="text-xs text-amber-600 text-right mt-1 mr-1">AI suggestion</p>

        {/* Actions — only show when not streaming */}
        {!message.isStreaming && message.text && (
          <div className="flex gap-1.5 justify-end mt-1.5">
            <ActionButton
              onClick={() => navigator.clipboard.writeText(message.text)}
              title="Copy"
              className="text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
            >
              <IconCopy className="w-3.5 h-3.5" />
            </ActionButton>
            <ActionButton
              onClick={onRegenerate}
              title="Regenerate"
              className="text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100"
            >
              <IconRefresh className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </ActionButton>
            <ActionButton
              onClick={onReject}
              title="Reject"
              className="text-zinc-400 hover:text-red-500 hover:bg-red-50"
            >
              <IconX className="w-3.5 h-3.5" />
            </ActionButton>
            <ActionButton
              onClick={() => onApprove(message.id)}
              title="Approve"
              className="text-white bg-indigo-600 hover:bg-indigo-700 px-3"
            >
              <IconCheck className="w-3.5 h-3.5" />
              <span>Use this</span>
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({
  onClick,
  title,
  className,
  children,
}: {
  onClick: () => void;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex items-center gap-1 text-xs rounded-lg px-2 py-1.5 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
