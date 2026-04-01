import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Attempt to query the database
    const userCount = await prisma.user.count();
    return NextResponse.json({ 
      status: "success", 
      message: "Database connection successful", 
      userCount 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      status: "error", 
      message: "Database connection failed", 
      error: error.message,
      stack: error.stack,
      env: {
        hasPrismaUrl: !!process.env.POSTGRES_PRISMA_URL,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      }
    }, { status: 500 });
  }
}
