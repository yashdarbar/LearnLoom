"use client";

import React from "react";
import { IconType } from "react-icons";

interface CategoryItemProps {
    value?: string;
    icon?: IconType;
    label: string;
}

const CategoryItem = ({ label, value, icon: Icon }: CategoryItemProps) => {
    return (
        <div>
            <button className="flex items-center border px-3 text-sm hover:border-sky-600 transition py-2 rounded-full gap-x-1">
                {Icon && <Icon size={20} />}
                <div className="truncate">{label}</div>
            </button>
        </div>
    );
};

export default CategoryItem;
