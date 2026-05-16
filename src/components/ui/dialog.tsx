import * as React from "react";
import { cn } from "@/lib/utils";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

type DialogContentProps = {
  className?: string;
  children: React.ReactNode;
};

export function DialogContent({ className, children }: DialogContentProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-xl border border-zinc-200 p-6 mx-auto",
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

type DialogHeaderProps = { children: React.ReactNode; className?: string };

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return <div className={cn("space-y-1 mb-4", className)}>{children}</div>;
}

type DialogTitleProps = { children: React.ReactNode; className?: string };

export function DialogTitle({ children, className }: DialogTitleProps) {
  return <h2 className={cn("text-base font-semibold text-zinc-900", className)}>{children}</h2>;
}
