import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import { getUserProgress } from "@/db/queries/user";
import { redirect } from "next/navigation";
import { Header } from "./components/header";
import { getUnits } from "@/db/queries/unit";
import Unit from "./components/unit";
import { getCourseProgress } from "@/db/queries/course";
import { lessons, units as unitsSchema } from "@/db/schema";

const LearnPage = async () => {
  const userProgressData = await getUserProgress();
  const unitsData = await getUnits();
  const courseProgressData = await getCourseProgress();

  const [userProgress, units, courseProgress] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
  ]);
  console.log(units, "units");

  if (!userProgress || !userProgress.activeCourse || !courseProgress) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] w-full px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id}>
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={
                courseProgress.activeLesson as
                  | (typeof lessons.$inferSelect & {
                      unit: typeof unitsSchema.$inferSelect;
                    })
                  | undefined
              }
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};
export default LearnPage;
