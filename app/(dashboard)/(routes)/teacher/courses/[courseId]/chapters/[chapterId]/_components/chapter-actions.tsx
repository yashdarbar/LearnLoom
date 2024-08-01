"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface ChapterActionsProps {
    chapterId: string;
    courseId: string;
    isPublished: boolean;
    disabled: boolean;
}

const ChapterActions = ({
    chapterId,
    courseId,
    isPublished,
    disabled
}: ChapterActionsProps) => {
    return <div className="flex items-center gap-x-2">
        <Button size="sm" variant="outline" disabled={disabled} onClick={()=>{}}>
            {isPublished ? "Unpublished" : "Published"}
        </Button>
        <Button size="sm">
            <Trash className="h-4 w-4"/>
        </Button>
    </div>;
};

export default ChapterActions;
