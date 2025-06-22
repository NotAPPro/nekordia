"use server";

import { prisma } from "@/lib/prisma";

export async function registerUser(username: string, nek: number) {
    try {
        const user = await prisma.user.upsert({
            where: { username },
            update: { nek },
            create: { username, nek },
        });
        return { message: `ユーザー「${user.username}」を登録（Nek: ${user.nek}）` };
    } catch (err) {
        console.error(err);
        return { message: "エラーが発生しました" };
    }
}

export async function getAllUsers() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "asc" },
        select: {
            username: true,
            nek: true,
            createdAt: true,
        },
    });

    return users.map(user => ({
        ...user,
        createdAt: user.createdAt.toISOString(),
    }));
}
