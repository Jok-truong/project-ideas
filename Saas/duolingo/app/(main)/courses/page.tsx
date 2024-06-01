import { getCourses } from "@/db/queries/course";
import { getUserProgress } from "@/db/queries/user";
import List from "./components/list";

const CoursesPage = async () => {
  const coursesData = await getCourses();
  const userProgressData = await getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);
  return (
    <div className="mx-auto w-full h-full max-w-[912px] px-3">
      <h1 className="text-2xl font-bold  ">Language Courses</h1>

      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
};

export default CoursesPage;
