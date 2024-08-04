"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";


const SearchInput = () => {
    return <div className="relative">
        <Search className="h-4 w-4 top-3 left-3 text-slate-600 absolute"/>
        <Input className="w-full md:w-[300px] bg-slate-100 pl-9 rounded-full focus-visible:ring-slate-200" placeholder="Search for a course"/>
    </div>;
};

export default SearchInput;
