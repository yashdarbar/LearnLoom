"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti";

interface VideoPlayerProps {
    chapterId: string;
    courseId: string;
    title: string;
    playbackId: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    nextChapterId?: string;
}

const VideoPlayer = ({
    chapterId,
    courseId,
    title,
    nextChapterId,
    playbackId,
    isLocked,
    completeOnEnd,
}: VideoPlayerProps) => {
    return <div>VideoPlayer</div>;
};

export default VideoPlayer;
