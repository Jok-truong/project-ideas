import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";
import { useMedia } from "react-use";

type Props = {
  title: string;
  description: string;
};

function UnitBanner({ title, description }: Props) {
  const isMobile = useMedia("(max-width: 1024px)");
  console.log(isMobile, "isMobile");

  return (
    <div className="w-full rounded-xl bg-green-500 p-5 flex items-center justify-between mt-[28px]">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>
      <Link href="/lesson">
        <Button
          size={isMobile ? "sm" : "lg"}
          variant="secondary"
          className="xl:flex border-2 border-b-4 active:border-b-2 text-white"
        >
          <NotebookText className="mr-2" />
          Continue
        </Button>
      </Link>
    </div>
  );
}

export default UnitBanner;
