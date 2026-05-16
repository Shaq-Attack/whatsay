import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { GeneratedMessageBubble } from "./GeneratedMessageBubble";
import type { Message, GeneratedMessage } from "@/types";

type Props = {
  messages: Message[];
  generated: GeneratedMessage[];
  themName: string;
  youName: string;
  onEditMessage: (id: string, text: string) => void;
  onDeleteMessage: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: () => void;
  onRegenerate: () => void;
  onMessageBlur?: (message: Message) => void;
};

export function MessageList({
  messages,
  generated,
  themName,
  youName,
  onEditMessage,
  onDeleteMessage,
  onApprove,
  onReject,
  onRegenerate,
  onMessageBlur,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, generated.length, generated[0]?.text]);

  if (messages.length === 0 && generated.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-2">
          <p className="text-zinc-400 text-sm">No messages yet.</p>
          <p className="text-zinc-300 text-xs">Use the buttons below to add messages from the conversation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          label={msg.role === "them" ? (themName || "Them") : (youName || "You")}
          onEdit={onEditMessage}
          onDelete={onDeleteMessage}
          onBlur={onMessageBlur}
        />
      ))}

      {generated.map((gen) => (
        <GeneratedMessageBubble
          key={gen.id}
          message={gen}
          onApprove={onApprove}
          onReject={onReject}
          onRegenerate={onRegenerate}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
