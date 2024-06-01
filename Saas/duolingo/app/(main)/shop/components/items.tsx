"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  hearts: number;
  points: number;
};

export const POINTS_TO_REFILL = 10;

const Items = ({ hearts, points }: Props) => {
  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/img/icons/heart.svg" alt="Heart" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill Hearts
          </p>
        </div>
        <Button disabled={hearts === 5 || points < POINTS_TO_REFILL}>
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
    </ul>
  );
};

export default Items;
