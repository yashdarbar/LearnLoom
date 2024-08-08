"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CoursesSideItemProps {
    id: string;
    courseId: string;
    label: string;
    isLocked: boolean;
    isCompleted: boolean;
}

const CoursesSideItem = ({
    id,
    courseId,
    label,
    isCompleted,
    isLocked,
}: CoursesSideItemProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;

    const isActive = pathname?.includes(id);

    const onClick = () => {
        router.push(`courses/${courseId}/chapter/${id}`);
    };

    return (
        <button type="button" onClick={onClick} className={cn("h-10 flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 dark:bg-black", isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-200/20", isCompleted && "text-emerald-700 hover:text-emerald-700", isActive && isCompleted && "bg-emerald-200/20")}>
            <div className="flex items-center gap-x-2 p-y-6">
                <Icon size={22} className={cn("text-slate-500", isActive && "text-slate-700", isCompleted && "text-emerald-700")}/>
                {label}
            </div>
            <div className={cn("ml-auto opacity-0 border-2 border-slate-500 h-full transition-all",isActive && "opacity-100",isCompleted && "bg-emerald-700" )}/>
        </button>
    );
};

export default CoursesSideItem;
