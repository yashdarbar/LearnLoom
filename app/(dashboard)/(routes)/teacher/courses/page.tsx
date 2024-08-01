import { Button } from "@/components/ui/button";
import Link from "next/link";



const Courses = () => {
    return (
        <div className="dark:bg-black h-full">
            <div className="p-6">
                <Link href="/teacher/create">
                    <Button>New Course</Button>
                </Link>
            </div>
        </div>
    );
};

export default Courses;
