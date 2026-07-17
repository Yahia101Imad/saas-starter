import { Separator } from "@/components/ui/separator";

type AuthDividerProps = {
  text?: string;
};

export function AuthDivider({ text = "OR" }: AuthDividerProps) {
  return (
    <div className="flex items-center gap-4">
      <Separator className="flex-1" />

      <span className="text-muted-foreground text-sm">{text}</span>

      <Separator className="flex-1" />
    </div>
  );
}
