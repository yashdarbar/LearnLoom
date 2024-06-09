import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CourseId = async ({ params }: { params: { courseId: string } }) => {

    const { userId } = auth()

    if (!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        }
    })

    if (!course) { return redirect("/"); }

    const allTheFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
    ]

    const totalFields = allTheFields.length;
    const completedFields = allTheFields.filter(Boolean).length;
    const completedText = `(${completedFields}/${totalFields})`

    return <div>CourseId: {params.courseId}
    <div>{completedText}</div></div>;
};

export default CourseId;
