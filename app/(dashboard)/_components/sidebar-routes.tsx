"use client";

import { Compass, Layout } from "lucide-react";
import SideBarItem from "./sidebar-item";

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search",
    },
];

const SideBarRoutes = () => {
    const routes = guestRoutes;
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SideBarItem
                    key={route.href}
                    label={route.label}
                    href={route.href}
                    icon={route.icon}
                />
            ))}
        </div>
    );
};

export default SideBarRoutes;
