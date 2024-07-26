"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";
import { Grip } from "lucide-react";

interface ChaptersListProps {
    onEdit: (id: string) => void;
    onReorder: (updateData: { id: string; position: number }[]) => void;
    items: Chapter[];
}

const ChaptersList = ({ onEdit, onReorder, items }: ChaptersListProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setChapters(items);
    }, [items]);

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId="chapters">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {chapters.map((chapter, index) => (
                                <Draggable
                                    key={chapter.id}
                                    index={index}
                                    draggableId={chapter.id}
                                >
                                    {(provided) => (
                                        <div
                                            className={cn(
                                                "flex items-center gap-x-2 mb-4 rounded-md bg-slate-200 border-slate-200 text-sm text-slate-700",
                                                chapter.isPublished &&
                                                    "text-sky-700 bg-sky-700"
                                            )}
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                        >
                                            <div
                                                className={cn(
                                                    "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                                    chapter.isPublished &&
                                                        "border-r-sky-200 hover:bg-sky-200"
                                                )}
                                                {...provided.dragHandleProps}
                                            >
                                                <Grip className="h-4 w-4" />
                                            </div>
                                            {chapter.title}
                                            <div></div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};
{
    /* <DragDropContext onDragEnd={()=>{}}>
            <Droppable droppableId="chapters">
                {(provided)=>(
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter, index)=>(
                            <Draggable
                            key={chapter.id}
                            index={index}
                            draggableId={chapter.id}
                            >
                                {(provided)=>(
                                    <div className={cn("flex items-center gap-x-2 bg-slate-200 border-slate-200 rounded-md text-slate-700 mb-4 text-sm", chapter.isPublished && " bg-sky-200 text-sky-700")} ref={provided.innerRef}
                                    {...provided.draggableProps}>

                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext> */
}

export default ChaptersList;
