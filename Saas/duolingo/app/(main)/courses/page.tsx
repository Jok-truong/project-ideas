import { getCourses } from "@/db/queries";
import List from "./components/List";

const CoursesPage = async () => {
  const coursesData = await getCourses();
  console.log(coursesData, "coursesData");
  return (
    <div className="mx-auto w-full h-full max-w-[912px] px-3">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>

      <List courses={coursesData} />
    </div>
  );
};

export default CoursesPage;
