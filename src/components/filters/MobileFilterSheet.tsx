import { type ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface MobileFilterSheetProps {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  activeCountLabel: string;
  closeA11yLabel: string;
  footerHint: string;
  clearLabel: string;
  applyLabel: string;
  onClear: () => void;
  onApply: () => void;
  children: ReactNode;
}

export function MobileFilterSheet({
  id,
  open,
  onOpenChange,
  title,
  activeCountLabel,
  closeA11yLabel,
  footerHint,
  clearLabel,
  applyLabel,
  onClear,
  onApply,
  children
}: MobileFilterSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        id={id}
        className="h-[85vh] max-h-[85vh] rounded-t-3xl border-border/70 p-0 focus-visible:outline-none [&>button]:hidden"
      >
        <div className="grid h-full grid-rows-[auto,minmax(0,1fr),auto] overflow-hidden">
          <SheetHeader className="border-b border-border/70 px-4 py-4 text-left">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <SheetTitle className="text-lg">{title}</SheetTitle>
                <SheetDescription className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {activeCountLabel}
                </SheetDescription>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-11 w-11 rounded-xl"
                onClick={() => onOpenChange(false)}
                aria-label={closeA11yLabel}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          <div className="overflow-y-auto overscroll-contain px-4 pb-6 pt-3">
            <div className="grid gap-3">{children}</div>
          </div>

          <div className="border-t border-border/70 bg-background/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur">
            <p className="mb-3 text-xs text-muted-foreground">{footerHint}</p>
            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant="outline" className="min-h-11 rounded-xl" onClick={onClear}>
                {clearLabel}
              </Button>
              <Button type="button" className="min-h-11 rounded-xl" onClick={onApply}>
                {applyLabel}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
