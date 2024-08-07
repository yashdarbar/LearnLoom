import { UserButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <h1 className="hidden">
            <UserButton afterSignOutUrl="/"/>
        </h1>
    );
}
