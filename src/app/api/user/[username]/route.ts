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

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
    };

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404, headers });
    return NextResponse.json(user, { headers });
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}
