import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        console.log("id", userId);
        const { title } = await req.json();

        console.log(userId);

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized user" },
                { status: 401 }
            );
        }

        const course = await db.course.create({ data: { userId, title } });
        return NextResponse.json(course);
    } catch (error) {
        console.log("[COURSES]", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
