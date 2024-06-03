import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import { Progress } from "@/components/ui/progress";
import { quests } from "@/constants";
import { getUserProgress } from "@/db/queries/user";
import Image from "next/image";
import { redirect } from "next/navigation";

const QuestsPage = async () => {
  const userProgressData = await getUserProgress();

  const [userProgress] = await Promise.all([userProgressData]);

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
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src="/img/icons/quests.svg"
            alt="Quests"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold    text-2xl my-6">Quests</h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Complete quests by earning points!
          </p>
          <ul className="w-full">
            {quests.map((quest) => {
              const progress = (userProgress?.points / quest.value) * 100;

              return (
                <div
                  key={quest.title}
                  className="flex items-center w-full p-4 gap-x-4 border-t-2"
                >
                  <Image
                    src="/img/icons/xp.svg"
                    alt="Points"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col gap-y-2 w-full">
                    <p className="  text-xl font-bold">{quest.title}</p>
                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
