"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./themer-toggle";

const NavBarRoutes = () => {
    const pathname = usePathname();


    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes("/chapter");

    return (
        <div className="flex ml-auto gap-x-2 dark:bg-black">
            <ModeToggle/>
            {isTeacherPage || isPlayerPage ? (
                <Link href="/" className="mx-2">
                    <Button size="sm" variant={"ghost"}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Exit
                    </Button>
                </Link>
            ) : (
                <Link href="/teacher/courses" className="mx-2">
                    <Button size="sm" variant="ghost">
                        Teacher mode
                    </Button>
                </Link>
            )}
            <UserButton afterSignOutUrl="/" />
        </div>
    );
};

export default NavBarRoutes;
