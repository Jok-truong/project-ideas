"use client";
import { refillHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL } from "@/constants";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  hearts: number;
  points: number;
};

const Items = ({ hearts, points }: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
      return;
    }

    startTransition(() => {
      refillHearts()
        .then(() => toast.success("Hearts added successfully"))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/img/icons/heart.svg" alt="Heart" height={60} width={60} />
        <div className="flex-1">
          <p className="  text-base lg:text-xl font-bold">Refill Hearts</p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={hearts === 5 || points < POINTS_TO_REFILL}
        >
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image
                src="/img/icons/xp.svg"
                alt="Points"
                height={20}
                width={20}
              />
              <p className="ml-2">{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
    </ul>
  );
};

export default Items;
