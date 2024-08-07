import { Chapter, Course, UserProgress } from "@prisma/client";
interface CourseNavBarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number;
}

const CourseNavBar = ({ course, progressCount }: CourseNavBarProps) => {
    return <div>CourseNavBar</div>;
};

export default CourseNavBar;
