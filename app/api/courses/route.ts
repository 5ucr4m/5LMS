import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function GET(req: Request, res: Response) {
    return NextResponse.json({ message: "Hello World" });
}

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();
    const { title } = await req.json();


    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!title) {
      return new NextResponse("Missing title", { status: 400 });
    }

    const course = await db.course.create({
      data: {
        title,
        userId, 
      },
    });

    return NextResponse.json(course);

  } catch (error) {
    console.log("[COURSES]", error)
    return new  NextResponse("Internal Error", { status: 500 })
  } 
}