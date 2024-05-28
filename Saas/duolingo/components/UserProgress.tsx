import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";

type Props = {
  activeCourse?: { title: string; img: string };
  hearts?: number;
  points?: number;
  hasActiveSubscription?: boolean;
  muted?: boolean;
};

function UserProgress({
  activeCourse = { title: "French", img: "/img/flags/fr.svg" },
  hearts = 5,
  points = 100,
  hasActiveSubscription,
  muted,
}: Props) {
  return (
    <div className="flex w-full items-center justify-between gap-x-2">
      <Button variant="ghost" asChild>
        <Link href="/courses">
          <Image
            src={activeCourse.img}
            alt={activeCourse.title}
            width={32}
            height={32}
            className="rounded-md border-2 border-border/80 dark:border-muted-foreground"
          />
        </Link>
      </Button>
      <Button
        variant="ghost"
        className={muted ? "text-inherit" : "text-orange-500"}
        asChild
      >
        <Link href="/shop">
          <Image
            src="/img/icons/xp.svg"
            alt="points"
            width={28}
            height={28}
            className="mr-2"
          />
          {points}
        </Link>
      </Button>

      <Button
        variant="ghost"
        className={muted ? "text-inherit" : "text-rose-500"}
        asChild
      >
        <Link href="/shop">
          <Image
            src="/img/icons/heart.svg"
            alt="hearts"
            width={22}
            height={22}
            className="mr-2"
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="size-4" strokeWidth={3} />
          ) : (
            hearts
          )}
        </Link>
      </Button>
    </div>
  );
}

export default UserProgress;
