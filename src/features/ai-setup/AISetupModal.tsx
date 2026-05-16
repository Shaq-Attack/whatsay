import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ToneSelector } from "./ToneSelector";
import { IntentSelector } from "./IntentSelector";
import { StyleSelector } from "./StyleSelector";
import { LengthSelector } from "./LengthSelector";
import { LanguageSelector } from "./LanguageSelector";
import type { AIConfig } from "@/types";

type Props = {
  isOpen: boolean;
  config: AIConfig;
  onSave: (config: AIConfig) => void;
  onClose: () => void;
};

export function AISetupModal({ isOpen, config, onSave, onClose }: Props) {
  const [draft, setDraft] = useState<AIConfig>(config);

  // Reset draft to current config each time the modal opens
  useEffect(() => {
    if (isOpen) setDraft(config);
  }, [isOpen]);

  function handleOpenChange(open: boolean) {
    if (!open) onClose();
  }

  function handleSave() {
    onSave(draft);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>AI Setup</span>
          </DialogTitle>
          <p className="text-sm text-zinc-500 mt-1">
            Configure how the AI should respond. These settings apply to this conversation.
          </p>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <ToneSelector value={draft.tone} onChange={(v) => setDraft((d) => ({ ...d, tone: v }))} />
          <div className="border-t border-zinc-100" />
          <IntentSelector value={draft.intent} onChange={(v) => setDraft((d) => ({ ...d, intent: v }))} />
          <div className="border-t border-zinc-100" />
          <StyleSelector value={draft.style} onChange={(v) => setDraft((d) => ({ ...d, style: v }))} />
          <div className="border-t border-zinc-100" />
          <LengthSelector value={draft.length} onChange={(v) => setDraft((d) => ({ ...d, length: v }))} />
          <div className="border-t border-zinc-100" />
          <LanguageSelector value={draft.language} onChange={(v) => setDraft((d) => ({ ...d, language: v }))} />
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
