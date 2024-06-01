import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import { getUserProgress } from "@/db/queries/user";
import Image from "next/image";
import { redirect } from "next/navigation";
import Items from "./components/items";
import { Quests } from "@/components/Quests";

const ShopPage = async () => {
  const userProgressData = await getUserProgress();

  const [userProgress] = await Promise.all([userProgressData, ,]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6 w-full">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/img/icons/xp.svg" alt="Shop" height={90} width={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Shop
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Spend your points on cool stuff
          </p>
          <Items hearts={userProgress.hearts} points={userProgress.points} />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
