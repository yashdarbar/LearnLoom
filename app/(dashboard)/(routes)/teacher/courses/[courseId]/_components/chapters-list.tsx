"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult
} from "@hello-pangea/dnd"


interface ChaptersListProps {
    onEdit:(id: string) => void;
    onReorder: (updateData: {id: string; position: number }[]) => void;
    items: Chapter[];
}


const ChaptersList = ({onEdit, onReorder, items}: ChaptersListProps) => {

    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(()=>{
        setIsMounted(true);
    }, [])

    useEffect(()=>{
        setChapters(items);
    }, [items])

    if (!isMounted) {
        return null;
    }

    return <div>ChaptersList</div>;
};

export default ChaptersList;
