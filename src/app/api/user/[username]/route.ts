import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, { params }: { params: { username: string } }) {
    const user = await prisma.user.findUnique({
        where: { username: params.username },
        include: {
            items: {
                include: {
                    item: true,
                },
            },
        },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user);
}
