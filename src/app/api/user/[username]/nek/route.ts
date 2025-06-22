import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: { username: string } }) {
    const { amount } = await req.json();
    if (typeof amount !== "number") return NextResponse.json({ error: "Amount must be a number" }, { status: 400 });

    const user = await prisma.user.update({
        where: { username: params.username },
        data: { nek: { increment: amount } },
    });

    return NextResponse.json({ nek: user.nek });
}
