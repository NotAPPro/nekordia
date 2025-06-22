import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const { amount } = await req.json();
    if (typeof amount !== "number") return NextResponse.json({ error: "Amount must be a number" }, { status: 400 });

    const segments = new URL(req.url).pathname.split("/");
    const username = segments[segments.indexOf("user") + 1];

    const user = await prisma.user.update({
        where: { username: username },
        data: { nek: { increment: amount } },
    });

    return NextResponse.json({ nek: user.nek });
}
