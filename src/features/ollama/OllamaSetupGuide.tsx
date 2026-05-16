import { useState } from "react";
import { IconBrain, IconRefresh, IconCopy, IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import type { OllamaStatus } from "@/lib/ollama";

type Props = {
  status: OllamaStatus;
  onRetry: () => void;
};

export function OllamaSetupGuide({ status, onRetry }: Props) {
  return (
    <div className="h-screen bg-zinc-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm max-w-md w-full p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
            <IconBrain className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-zinc-900">WhatSay</h1>
            <p className="text-sm text-zinc-500">Local AI reply assistant</p>
          </div>
        </div>

        {status === "checking" && <CheckingState />}
        {status === "unavailable" && <UnavailableState onRetry={onRetry} />}
        {status === "no_model" && <NoModelState onRetry={onRetry} />}
      </div>
    </div>
  );
}

function CheckingState() {
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      <p className="text-zinc-600">Connecting to Ollama…</p>
    </div>
  );
}

function UnavailableState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-semibold text-zinc-900">Ollama is not running</h2>
        <p className="text-sm text-zinc-500 mt-1">
          WhatSay uses Google Gemma 4 running locally on your machine. You need Ollama to continue.
        </p>
      </div>

      <ol className="space-y-3">
        <Step n={1}>
          Download and install Ollama from{" "}
          <a
            href="https://ollama.com/download"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline"
          >
            ollama.com
          </a>
        </Step>
        <Step n={2}>Open Ollama — it runs in your menu bar or system tray</Step>
        <Step n={3}>Click Retry below once it's running</Step>
      </ol>

      <Button onClick={onRetry} className="w-full gap-2">
        <IconRefresh className="w-4 h-4" />
        Retry
      </Button>
    </div>
  );
}

function NoModelState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-semibold text-zinc-900">Gemma 4 is not installed</h2>
        <p className="text-sm text-zinc-500 mt-1">
          Ollama is running but the Gemma 4 model isn't available yet.
        </p>
      </div>

      <div>
        <p className="text-sm text-zinc-600 mb-2">Run this in your terminal:</p>
        <CopyCommand command="ollama pull gemma4:e4b" />
        <p className="text-xs text-zinc-400 mt-2">~9.6 GB download. Only needed once.</p>
      </div>

      <Button onClick={onRetry} className="w-full gap-2">
        <IconRefresh className="w-4 h-4" />
        Retry
      </Button>
    </div>
  );
}

function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex items-center gap-2 bg-zinc-900 rounded-lg px-4 py-3">
      <code className="flex-1 text-green-400 text-sm font-mono">{command}</code>
      <button
        onClick={handleCopy}
        title="Copy command"
        className="shrink-0 p-1 rounded text-zinc-400 hover:text-white transition-colors"
      >
        {copied ? (
          <IconCheck className="w-4 h-4 text-green-400" />
        ) : (
          <IconCopy className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-sm text-zinc-600">
      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}
