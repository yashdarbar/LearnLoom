"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TitleFormProps {
    initialData: {
        title: string;
    };
    courseId: string;
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "title is required",
    }),
});

const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const [isEditing, setIsEditing] = useState(false);

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    const toggleEdit = () => setIsEditing((current)=>(!current));

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course title
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2 " />
                            Edit title
                        </>
                    )}
                </Button>
            </div>
                {!isEditing && (<p className="text-sm mt-2">{initialData.title}</p>)}
                {isEditing && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4" >
                            <FormField control={form.control} name="title"
                            render={({field}) => (<FormItem>
                                <FormControl>
                                    <Input disabled={isSubmitting} placeholder="e.g. 'web Development, UI/UX'" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>)}
                            />
                            <div className="flex items-center gap-x-2">
                                <Button disabled={!isValid || isSubmitting}
                                type="submit">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
        </div>
    );
};

//creating the form fields
//creating the form fields

//m3

export default TitleForm;
