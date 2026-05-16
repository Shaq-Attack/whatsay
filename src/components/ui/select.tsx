import * as React from "react";
import { cn } from "@/lib/utils";

type SelectContextType = {
  value: string;
  onValueChange: (v: string) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const SelectContext = React.createContext<SelectContextType>({
  value: "",
  onValueChange: () => {},
  open: false,
  setOpen: () => {},
});

type SelectProps = {
  value: string;
  onValueChange: (v: string) => void;
  children: React.ReactNode;
};

export function Select({ value, onValueChange, children }: SelectProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

type SelectTriggerProps = { className?: string; children: React.ReactNode };

export function SelectTrigger({ className, children }: SelectTriggerProps) {
  const { open, setOpen } = React.useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex items-center justify-between w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white text-zinc-700 hover:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-indigo-300",
        className
      )}
    >
      {children}
      <span className="ml-2 text-zinc-400">▾</span>
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = React.useContext(SelectContext);
  return <span>{value || placeholder}</span>;
}

type SelectContentProps = { children: React.ReactNode; className?: string };

export function SelectContent({ children, className }: SelectContentProps) {
  const { open, setOpen } = React.useContext(SelectContext);
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      <div
        className={cn(
          "absolute z-50 w-full mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg max-h-60 overflow-y-auto",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}

type SelectItemProps = { value: string; children: React.ReactNode };

export function SelectItem({ value, children }: SelectItemProps) {
  const ctx = React.useContext(SelectContext);
  return (
    <div
      onClick={() => {
        ctx.onValueChange(value);
        ctx.setOpen(false);
      }}
      className={cn(
        "px-3 py-2 text-sm cursor-pointer hover:bg-zinc-50",
        ctx.value === value && "bg-indigo-50 text-indigo-700 font-medium"
      )}
    >
      {children}
    </div>
  );
}
