import { IconBagde } from "@/components/icon-bagde";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";

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
                <span className="text-sm text-slate-700">Complete all fields {completedText}</span>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
            <div>
                <div className="flex items-center gap-x-2">
                    <IconBagde icon={LayoutDashboard} />
                    <h1 className="text-xl">Customize your course</h1>
                </div>
                <TitleForm initialData={course} courseId={course.id}/>
            </div>
        </div>
    </div>;
};

export default CourseId;
