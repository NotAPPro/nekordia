import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// アイテム一覧を取得
export async function GET() {
    const items = await prisma.item.findMany();

    const headers = {
        "Access-Control-Allow-Origin": "*",
    };

    return NextResponse.json(items, {
        headers,
    });
}

export async function POST(req: NextRequest) {
    const { itemId } = await req.json();
    if (!itemId) return NextResponse.json({ error: "Item ID required" }, { status: 400 });

    const segments = new URL(req.url).pathname.split("/");
    const username = segments[segments.indexOf("user") + 1];

    const user = await prisma.user.findUnique({ where: { username: username } });
    const item = await prisma.item.findUnique({ where: { id: itemId } });

    if (!user || !item) return NextResponse.json({ error: "User or item not found" }, { status: 404 });
    if (user.nek < item.price) return NextResponse.json({ error: "Not enough Nek" }, { status: 400 });

    const alreadyOwned = await prisma.userItem.findFirst({
        where: { userId: user.id, itemId },
    });

    if (alreadyOwned) return NextResponse.json({ error: "Item already owned" }, { status: 400 });

    await prisma.user.update({
        where: { id: user.id },
        data: { nek: { decrement: item.price } },
    });

    const userItem = await prisma.userItem.create({
        data: { userId: user.id, itemId: item.id },
    });

    return NextResponse.json({ message: "Purchase complete", item: userItem });
}
