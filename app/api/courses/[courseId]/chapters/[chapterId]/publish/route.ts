import CourseId from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/page";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH (
    req: Request,
    { params } : { params: {courseId: string, chapterId: string}}
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const couseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        });

        if (!couseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const chpater = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }
        });

        const muxData = await db.muxData.findUnique({
            where: {
                chapterId: params.chapterId
            }
        });

        if (!chpater || !muxData || !chpater.title || !chpater.description || !chpater.videoUrl) {
            return new NextResponse("Missing the required fields", { status: 404})
        }

        const publishedchapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            },
            data: {
                isPublished: true,
            }
        });

        return NextResponse.json(publishedchapter);

    } catch (error) {
        console.log("[CHAPTER_PUBLISH_ERROR]", { status: 500})
    }
}