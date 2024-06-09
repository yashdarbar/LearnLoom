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

    return <div className="p-6">
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Course setup</h1>
                <span>Complete all fields {completedText}</span>
            </div>
        </div>
    </div>;
};

export default CourseId;
