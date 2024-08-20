// import { PrismaClient } from "@prisma/client";

// declare global {
//     var prisma: PrismaClient | undefined;
// }

// const prisma = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

// export const db = prisma;
"use client";

import { PrismaClient } from "@/src/app/generated/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export const db = prisma;
