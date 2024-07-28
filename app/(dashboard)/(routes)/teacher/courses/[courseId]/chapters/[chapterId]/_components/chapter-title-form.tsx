"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface ChapterTitleFormProps {
    initialData: {
        title: string;
    },
    chapterId: string;
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required.",
    })
})

export const ChapterTitleForm = ({initialData, chapterId}: ChapterTitleFormProps) => {

    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: initialData
    // });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    return <div className="mt-6 bg-slate-100 border rounded-md p-4">titile form</div>;
};
