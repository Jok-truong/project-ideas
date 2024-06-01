"use client";

import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/useExitModal";
import { InfinityIcon, X } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

type Props = {
  hearts: number;
  percentage: number;
  hasActiveSubscription?: boolean;
};
const Header = ({ hearts, percentage, hasActiveSubscription }: Props) => {
  const { open } = useExitModal();
  const searchParams = useSearchParams();
  const isCompleted = searchParams.get("isCompleted") === "true";

  return (
    <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      <X
        onClick={open}
        className="   hover:opacity-75 transition cursor-pointer"
      />
      <Progress value={percentage} />
      <div className="text-rose-500 flex items-center font-bold">
        <Image
          src="/img/icons/heart.svg"
          height={28}
          width={28}
          alt="Heart"
          className="mr-2"
        />
        {isCompleted || hasActiveSubscription ? (
          <InfinityIcon className="h-6 w-6 stroke-[3] shrink-0" />
        ) : (
          hearts
        )}
      </div>
    </header>
  );
};

export default Header;
