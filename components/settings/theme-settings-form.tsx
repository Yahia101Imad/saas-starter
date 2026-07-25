"use client";

import { useTransition } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { updateTheme } from "@/app/(dashboard)/dashboard/settings/actions";

const themeOptions = [
  { value: "LIGHT", label: "Light", icon: Sun },
  { value: "DARK", label: "Dark", icon: Moon },
  { value: "SYSTEM", label: "System", icon: Monitor },
] as const;

export function ThemeSettingsForm() {
  const { theme, setTheme } = useTheme();
  const [isPending, startTransition] = useTransition();

  const handleSelect = (value: "LIGHT" | "DARK" | "SYSTEM") => {
    setTheme(value.toLowerCase());

    startTransition(async () => {
      const result = await updateTheme(value);
      if (!result.success) {
        toast.error(result.error ?? "Failed to save theme preference");
      }
    });
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {themeOptions.map((option) => {
        const isActive = theme === option.value.toLowerCase();

        return (
          <button
            key={option.value}
            type="button"
            disabled={isPending}
            onClick={() => handleSelect(option.value)}
            className={cn(
              "relative flex flex-col items-center gap-2 rounded-md border p-4 text-sm transition-colors",
              isActive
                ? "border-primary bg-accent"
                : "border-border hover:bg-accent/50",
              isPending && "pointer-events-none opacity-60",
            )}
          >
            {isActive && (
              <Check className="text-primary absolute top-2 right-2 h-4 w-4" />
            )}
            <option.icon className="h-5 w-5" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
