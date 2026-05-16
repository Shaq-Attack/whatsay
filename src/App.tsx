import { useOllama } from "@/hooks/useOllama";
import { useConversation } from "@/hooks/useConversation";
import { useAI } from "@/hooks/useAI";
import { OllamaSetupGuide } from "@/features/ollama/OllamaSetupGuide";
import { AppLayout } from "@/components/AppLayout";
import { Sidebar } from "@/features/conversation/Sidebar";
import { ConversationPage } from "@/features/conversation/ConversationPage";

export default function App() {
  const ollama = useOllama();
  const conv = useConversation();
  const ai = useAI(ollama.selectedModel);

  if (ollama.status !== "ready") {
    return <OllamaSetupGuide status={ollama.status} onRetry={ollama.retry} />;
  }

  async function handleGenerate() {
    if (!conv.active || conv.active.messages.length === 0) return;

    const genId = conv.startGenerating();

    await ai.generate({
      messages: conv.active.messages,
      context: conv.active.context,
      aiConfig: conv.active.aiConfig,
      onChunk: (chunk) => conv.appendChunk(genId, chunk),
      onComplete: () => conv.finishGenerating(genId),
      onError: () => conv.rejectGenerated(),
    });
  }

  async function handleRegenerate() {
    conv.rejectGenerated();
    await new Promise((r) => setTimeout(r, 50));
    handleGenerate();
  }

  return (
    <AppLayout
      sidebar={
        <Sidebar
          conversations={conv.conversations}
          activeId={conv.activeId}
          onNew={conv.newConversation}
          onSelect={conv.selectConversation}
          onDelete={conv.deleteConversation}
          onRename={conv.renameConversation}
        />
      }
    >
      {conv.active && (
        <ConversationPage
          conversation={conv.active}
          generated={conv.generated}
          isLoading={ai.isLoading}
          error={ai.error}
          model={ollama.selectedModel}
          onAddMessage={conv.addMessage}
          onEditMessage={conv.editMessage}
          onDeleteMessage={conv.deleteMessage}
          onContextChange={conv.setContext}
          onAIConfigChange={conv.setAIConfig}
          onRename={(title) => conv.renameConversation(conv.active!.id, title)}
          onGenerate={handleGenerate}
          onApprove={conv.approveGenerated}
          onReject={conv.rejectGenerated}
          onRegenerate={handleRegenerate}
          onMessageBlur={(msg) => {
            if (msg.role === "them") conv.autoTitle(msg.text);
          }}
        />
      )}
    </AppLayout>
  );
}
