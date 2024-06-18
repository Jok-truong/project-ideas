import { getLesson } from "@/db/queries/lesson";
import Quiz from "./components/quiz";
import { redirect } from "next/navigation";
import { getUserProgress } from "@/db/queries/user";

type Props = {
  params: {
    lessonId: number;
  };
};
const LessonPage = async ({ params }: Props) => {
  const lessonData = await getLesson(params.lessonId);
  const userProgressData = await getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const challengeLength = lesson.challenges.length;
  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      challengeLength) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialPercentage={initialPercentage}
      initialHearts={userProgress.hearts}
      initialLessonChallenges={lesson.challenges}
    />
  );
};

export default LessonPage;
