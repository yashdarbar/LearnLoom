import { Category, Course } from "@prisma/client";
import React from "react";

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
            <div>
                {items.map((item) => (
                    <div key={item.id}>{item.title}</div>
                ))}
            </div>
            {items.length === 0 && (
              <div className="text-center text-sm text-muted-foreground mt-10">No courses found.</div>
            )}
        </div>
    );
};

export default CoursesList;
