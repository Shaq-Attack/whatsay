import { useState } from "react";
import { ConversationHeader } from "./ConversationHeader";
import { MessageList } from "./MessageList";
import { AddMessageControls } from "./AddMessageControls";
import { ContextInput } from "./ContextInput";
import { GenerateBar } from "./GenerateBar";
import { AISetupModal } from "@/features/ai-setup/AISetupModal";
import type { Conversation, GeneratedMessage, Message, MessageRole, AIConfig } from "@/types";

type Props = {
  conversation: Conversation;
  generated: GeneratedMessage[];
  isLoading: boolean;
  error: string | null;
  model: string;
  availableModels: string[];
  onAddMessage: (role: MessageRole) => void;
  onEditMessage: (id: string, text: string) => void;
  onDeleteMessage: (id: string) => void;
  onContextChange: (value: string) => void;
  onThemNameChange: (value: string) => void;
  onYouNameChange: (value: string) => void;
  onAIConfigChange: (config: AIConfig) => void;
  onRename: (title: string) => void;
  onGenerate: () => void;
  onApprove: (id: string) => void;
  onReject: () => void;
  onRegenerate: () => void;
  onModelChange: (model: string) => void;
  onMessageBlur?: (message: Message) => void;
};

export function ConversationPage({
  conversation,
  generated,
  isLoading,
  error,
  model,
  availableModels,
  onAddMessage,
  onEditMessage,
  onDeleteMessage,
  onContextChange,
  onThemNameChange,
  onYouNameChange,
  onAIConfigChange,
  onRename,
  onGenerate,
  onApprove,
  onReject,
  onRegenerate,
  onModelChange,
  onMessageBlur,
}: Props) {
  const [aiSetupOpen, setAiSetupOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <ConversationHeader
        title={conversation.title}
        onRename={onRename}
        onOpenAISetup={() => setAiSetupOpen(true)}
      />

      <MessageList
        messages={conversation.messages}
        generated={generated}
        themName={conversation.themName}
        youName={conversation.youName}
        onEditMessage={onEditMessage}
        onDeleteMessage={onDeleteMessage}
        onApprove={onApprove}
        onReject={onReject}
        onRegenerate={onRegenerate}
        onMessageBlur={onMessageBlur}
      />

      <div className="shrink-0 border-t border-zinc-200 bg-white px-4 py-3 space-y-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-[10px] text-zinc-400 mb-0.5 block">Them</label>
            <input
              value={conversation.themName}
              onChange={(e) => onThemNameChange(e.target.value)}
              placeholder="Their name"
              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white text-zinc-700 placeholder:text-zinc-300 focus:outline-none focus:border-indigo-300"
            />
          </div>
          <div className="flex-1">
            <label className="text-[10px] text-zinc-400 mb-0.5 block">You</label>
            <input
              value={conversation.youName}
              onChange={(e) => onYouNameChange(e.target.value)}
              placeholder="Your name"
              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white text-zinc-700 placeholder:text-zinc-300 focus:outline-none focus:border-indigo-300"
            />
          </div>
        </div>
        <AddMessageControls themName={conversation.themName} youName={conversation.youName} onAdd={onAddMessage} />
        <ContextInput value={conversation.context} onChange={onContextChange} />
        <GenerateBar
          model={model}
          models={availableModels}
          loading={isLoading}
          disabled={conversation.messages.length === 0}
          error={error}
          onClick={onGenerate}
          onModelChange={onModelChange}
        />
      </div>

      <AISetupModal
        isOpen={aiSetupOpen}
        config={conversation.aiConfig}
        onSave={(cfg) => {
          onAIConfigChange(cfg);
          setAiSetupOpen(false);
        }}
        onClose={() => setAiSetupOpen(false)}
      />
    </div>
  );
}
