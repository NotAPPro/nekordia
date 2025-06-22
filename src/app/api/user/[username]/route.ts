import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const segments = new URL(req.url).pathname.split("/");
    const username = segments[segments.indexOf("user") + 1];
    const user = await prisma.user.findUnique({
        where: { username: username },
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
