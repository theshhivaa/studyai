import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name } = await req.json();

    if (!name || name.trim().length < 2) {
      return new NextResponse("Name is too short", { status: 400 });
    }

    // Identify the user by ID (preferred) or Email (fallback for continuity)
    const where = session.user.id 
      ? { id: session.user.id } 
      : { email: session.user.email as string };

    // Update the user's name and set hasSetName flag to true
    // @ts-ignore
    const updatedUser = await prisma.user.update({
      where,
      data: {
        name: name.trim(),
        hasSetName: true,
      },
    });

    return NextResponse.json({
      name: updatedUser.name,
      hasSetName: updatedUser.hasSetName,
    });
  } catch (error) {
    console.error("[USER_UPDATE_NAME_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
