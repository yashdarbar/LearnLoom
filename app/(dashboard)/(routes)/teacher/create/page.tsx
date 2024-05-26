"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const formSchema = z.object({
    userName: z.string().min(2, {
        message: "Username must be at least 2 <characters></characters>",
    }),
});

const CreatePage = () => {

  //const form = useForm();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          userName: "",
      },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values);
  }

  return (
      <div>
          CreatePage
          <div>
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                          control={form.control}
                          name="userName"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Username</FormLabel>
                                  <FormControl>
                                      <Input
                                          placeholder="userName"
                                          {...field}
                                      />
                                  </FormControl>
                                  <FormDescription>
                                      This is your public display name.
                                  </FormDescription>
                                  <FormMessage />
                              </FormItem>
                          )} />
                      <Button type="submit">Submit</Button>
                  </form>
              </Form>
          </div>
      </div>
  );
}

export default CreatePage