import { Category, Course } from "@/src/app/generated/client";
import  CourseCard  from "@/components/course-card"

type CourseWithProgressWithCategory = Course & {
    //category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

interface CoursesListProps {
    items: CourseWithProgressWithCategory[];
}

const CoursesList = ({ items }: CoursesListProps) => {
    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {items.map((item) => (
                    <CourseCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl!}
                        price={item.price!}
                        progress={item.progress!}
                        chaptersLength={item.chapters.length}
                        //here we tell hardcodedly that all the thing will be there by using exclamation to the thing
                        //category={item?.category?.name}
                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No courses found.
                </div>
            )}
        </div>
    );
};

export default CoursesList;
