import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const value = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const couse = await db.course.update({
        where: { 
            id: courseId,
            userId
        },
        data: {
            ...value,
        },
    })

    return new NextResponse(couse, { status: 200 })
  } catch (error) {
    console.error("[COURSE_ID]: ", error);
    return new NextResponse("internal error", { status: 500 })
  }
}