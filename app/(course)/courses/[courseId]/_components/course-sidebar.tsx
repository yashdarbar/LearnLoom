import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";

interface CourseSideBarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number;
}

const CourseSideBar = async ({ course, progressCount }: CourseSideBarProps) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId: userId,
                courseId: course.id,
            }
        }
    });

    return (
        <div className="h-full flex flex-col w-full border-r shadow-sm overflow-y-auto">
            <div className="p-8 border-b shadow-sm">
                <h1>{course.title}</h1>
            </div>
            {/* <div className="flex flex-col w-full">{
                course.chapters.map((chapter)=>(
                    <CoursesSideBarItem
                    key={chapter.id}
                    id={chapter.id}
                    label={chapter.title}

                    />
                ))
                }</div> */}
        </div>
    );
};

export default CourseSideBar;
