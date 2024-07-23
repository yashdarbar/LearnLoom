import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import {  NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string; attachmentId: string } }
) {
    console.log("api", params.attachmentId);
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                userId: userId,
                id: params.courseId
            }
        });

        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401});
        }

        const attachment = await db.attachment.delete({
            where: {
                courseId: params.courseId,
                id: params.attachmentId
            }
        });

        return NextResponse.json(attachment);


    } catch (error) {
        console.log("ATTACHMENT_ID",error);
        return new NextResponse("Internal Error", { status: 500});
    }
}
