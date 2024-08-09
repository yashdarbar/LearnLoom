import { GetChapter } from "@/actions/get-chapter";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

const ChapterId =  async ({params}: {params: {
  courseId: string;
  chapterId: string;
}}) => {

  const { userId } = auth();

  if(!userId) {
    redirect("/");
  }

  const {
    chapter,
    course,
    attachments,
    muxData,
    userProgress,
    purchase,
    nextChapter,
  } = await GetChapter({userId,
    courseId: params.courseId,
    chapterId: params.chapterId
  });

  return (
    <div>ChapterId</div>
  )
}

export default ChapterId