import { PrismaClient }  from "@prisma/client"

declare global {
    var prisma: PrismaClient |  undefined;
}

//prevenet hot reload from creating prisma client
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = db;