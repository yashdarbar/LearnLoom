import { GetChapter } from "@/actions/get-chapter";
import Banner from "@/components/banner";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/video-player";


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

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter?.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
      <div>
          {userProgress?.isCompleted && (
              <div className="mt-[-12px]">
                  <Banner
                      variant="success"
                      label="You already completed this chapter."
                  />
              </div>
          )}
          {isLocked && (
              <div className="mt-[-12px]">
                  <Banner
                      variant="warning"
                      label="You need to purchase this course to watch this chapter."
                  />
              </div>
          )}
          <div className="flex flex-col max-w-4xl mx-auto pb-20">
            <div className="p-4">
              <VideoPlayer
                chapterId={params.chapterId}
                courseId={params.courseId}
                title={chapter.title}
                isLocked={isLocked}
                playbackId={muxData?.playbackId!}
                nextChapterId={nextChapter?.id}
                completeOnEnd={completeOnEnd}
              />
            </div>
          </div>
      </div>
  );
}

export default ChapterId