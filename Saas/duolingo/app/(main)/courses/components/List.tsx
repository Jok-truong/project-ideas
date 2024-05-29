"use client";

import { courses, userProgress } from "@/db/schema";
import Card from "./card";
import { useTransition } from "react";
import { toast } from "sonner";
import { upsertUserProgress } from "@/actions/user-progress";
import { useRouter } from "next/navigation";

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

function List({ courses, activeCourseId }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onClick = async (id: number) => {
    if (isPending) return;

    if (id === activeCourseId) return router.push("/learn");

    startTransition(() => {
      upsertUserProgress(id).catch((error) => {
        console.log(error, "error");
        toast.error("Something went wrong.");
      });
    });
  };
  return (
    <div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={isPending}
          isActive={course.id === activeCourseId}
        />
      ))}
    </div>
  );
}

export default List;
