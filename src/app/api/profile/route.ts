import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bio, location, avatarUrl } = await req.json();

    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        bio,
        location,
        avatarUrl,
      },
      create: {
        userId: session.user.id,
        bio,
        location,
        avatarUrl,
      },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
