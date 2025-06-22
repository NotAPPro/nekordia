"use server";

import { prisma } from "@/lib/prisma";

export async function registerItem(name: string, price: number, description: string) {
    try {
        const item = await prisma.item.create({
            data: { name, price, description },
        });
        return { success: true, item };
    } catch (error) {
        console.error(error);
        return { success: false, error: "登録失敗" };
    }
}

export async function getItems() {
    return prisma.item.findMany({ orderBy: { price: "asc" } });
}
