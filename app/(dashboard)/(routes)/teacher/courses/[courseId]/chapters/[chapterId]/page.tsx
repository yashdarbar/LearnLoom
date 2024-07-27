import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

const ChapterId = async ({
    params
}: {
    params: { courseId: string; chapterId: string };
}) => {
    const { userId } = auth();
    if (!userId) {
        return redirect("/");
    }

    const chapter = await db.chapter.findUnique({
        where: { courseId: params.courseId, id: params.chapterId },
        include: {
            muxData: true,
        },
    });

    if (!chapter) {
        return redirect("/")
    }

    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `${completedFields}/${totalFields}`

    return <div>Chapter ID: {completionText}</div>;
};

export default ChapterId;
