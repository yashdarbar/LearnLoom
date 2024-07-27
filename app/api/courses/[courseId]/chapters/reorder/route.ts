import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            },
        });

        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { list } = await req.json();
        console.log("serverlist", list);
        for (let item of list) {
            await db.chapter.update({
                where: {
                    id: item.id,
                },
                data: { position: item.position },
            });
        }

        return NextResponse.json(list);

    } catch (error) {
        console.log("[CHAPTER_REORDER]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
