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
        onEditMessage={onEditMessage}
        onDeleteMessage={onDeleteMessage}
        onApprove={onApprove}
        onReject={onReject}
        onRegenerate={onRegenerate}
        onMessageBlur={onMessageBlur}
      />

      <div className="shrink-0 border-t border-zinc-200 bg-white px-4 py-3 space-y-3">
        <AddMessageControls onAdd={onAddMessage} />
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
