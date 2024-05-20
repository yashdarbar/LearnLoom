import React from "react";
import SideBar from "./_components/sidebar";

const dashBoardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <div>
                
            </div>
            <div className="hidden md:flex h-full w-56 flex-col fixed z-50 inset-y-0">
                <SideBar/>
            </div>
            <main className="ml-56">
            {children}
            </main>
        </div>
    );
};

export default dashBoardLayout;
