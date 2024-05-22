import React from "react";
import SideBar from "./_components/sidebar";
import NavBar from "./_components/navbar";

const dashBoardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <div className="h-[80px] w-full md:pl-56 fixed z-50 inset-y-0">
                <NavBar/>
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
