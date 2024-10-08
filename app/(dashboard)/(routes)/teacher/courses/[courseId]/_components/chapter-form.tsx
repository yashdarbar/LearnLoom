"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Chapter, Course } from "@/src/app/generated/client";
import { Input } from "@/components/ui/input";
import ChaptersList from "./chapters-list";

interface ChapterFormProps {
    initialData: Course & { chapters: Chapter[] };
    courseId: string;
}

const formSchema = z.object({
    title: z.string().min(1),
});

const ChapterForm = ({ initialData, courseId }: ChapterFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const { isSubmitting, isValid } = form.formState;

    const toggleCreating = () => setIsCreating((current) => !current);

    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/chapters`, values);
            toast.success("Chapter created");
            toggleCreating();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    const onReorder = async (updateData: { id: string; position: number;}[]) => {
        try {
            setIsUpdating(true);
            console.log("sfa", updateData);
            await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
                list: updateData,
            });
            toast.success("Chapters reordered");
            router.refresh();
        } catch {
            toast.error("Something went wrong!");
        } finally {
            setIsUpdating(false);
        }
    }

    const onEdit = (id: string) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`);
    }
    //console.log(isCreating);

    return (
        <div className="relative mt-6 border bg-slate-100 rounded-md p-4 dark:bg-black">
            {isUpdating && (
                <div className="absolute w-full h-full top-0 right-0 opacity-40 bg-slate-200 rounded-md flex justify-center items-center">
                    <Loader2 className="animate-spin h-6 w-6 text-sky-700"/>
                </div>
            )}
            <div className="font-medium flex items-center justify-between">
                Course chapters
                <Button variant="ghost" onClick={toggleCreating}>
                    {isCreating ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2 " />
                            Add chapter
                        </>
                    )}
                </Button>
            </div>
            {isCreating && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Introduction to the course ...'"
                                            {...field}
                                            className="dark:bg-black"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                        >
                            Create
                        </Button>
                    </form>
                </Form>
            )}
            {!isCreating && (
                <div
                    className={cn(
                        "text-sm mt-2",
                        !initialData.chapters.length && "text-slate-500 italic"
                    )}
                >
                    {!initialData.chapters.length && "No chapters"}
                    <ChaptersList
                        onEdit={onEdit}
                        onReorder={onReorder}
                        items={initialData.chapters || []}
                    />
                </div>
            )}
            {!isCreating && (
                <p className="text-xs text-muted-foreground mt-4">
                    Drag and drop to reorder the chapters
                </p>
            )}
        </div>
    );
};

export default ChapterForm;
