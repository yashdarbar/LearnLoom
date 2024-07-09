import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}: { params: { courseId: string}}) {
    try {
        const { userId } = auth();
        const { courseId } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }
    } catch (error) {
        console.log("[COURES_ID", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}