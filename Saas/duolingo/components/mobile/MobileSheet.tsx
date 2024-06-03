import { PropsWithChildren } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

function MobileSheet({ children }: PropsWithChildren) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-10"
          aria-label="Open menu"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-11/12 max-w-xs p-0">
        {children}
      </SheetContent>
    </Sheet>
  );
}

export default MobileSheet;
