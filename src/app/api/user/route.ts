import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const { username } = await req.json();
    if (!username) return NextResponse.json({ error: "Username required" }, { status: 400 });

    const user = await prisma.user.upsert({
        where: { username },
        update: {},
        create: { username },
    });

    return NextResponse.json(user);
}
