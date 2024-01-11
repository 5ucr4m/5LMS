import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

import TitleForm from "./_component/title-form";
import DescriptionForm from "./_component/description-form";
import ImageForm from "./_component/image-form";

async function CourseIdPage({ params }: { params: { courseId: string } }) {
  const { userId } = auth();
  const { courseId } = params;

  if (!userId) {
    redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={courseId} />
          <DescriptionForm initialData={course} courseId={courseId} />
          <ImageForm initialData={course} courseId={courseId} />
        </div>
      </div>
    </div>
  );
}

export default CourseIdPage;