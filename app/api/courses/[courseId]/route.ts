import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const { video } = new Mux({
    tokenId: process.env.MUX_TOKEN_ID as string,
    tokenSecret: process.env.MUX_TOKEN_SECRET as string,
});

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            },
            include: {
                chapters: {
                    include: {
                        muxData: true,
                    },
                },
            },
        });

        if (!course) {
            return new NextResponse("Not found", { status: 401 });
        }

        for (const chapter of course.chapters) {
            if (chapter.muxData?.assetId) {
                await video.assets.delete(chapter.muxData.assetId);
            }
        }

        const deleteCourse = await db.course.delete({
            where: {
                id: params.courseId,
                userId: userId,
            },
        });

        return NextResponse.json(deleteCourse);

    } catch (error) {
        console.log("[COURSE_DELETE_ERROR]", error);
        return NextResponse.json("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = auth();
        const { courseId } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.update({
            where: { id: courseId, userId },
            data: { ...values },
        });

        return NextResponse.json(course);
    } catch (error) {
        console.log("[COURES_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
