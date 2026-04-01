import { PrismaClient } from "@prisma/client";

export async function GET() {
  const diagnostics: any = {
    env: {
      hasPrismaUrl: !!process.env.POSTGRES_PRISMA_URL,
      hasDbUrl: !!process.env.DATABASE_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      nodeVersion: process.version,
    }
  };

  try {
    const url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
    const prisma = new PrismaClient(url ? { datasourceUrl: url } : {} as any);
    
    // Simple query to check connectivity
    await prisma.$connect();
    diagnostics.prisma = "Connected successfully";
    await prisma.$disconnect();
  } catch (error: any) {
    diagnostics.prismaError = {
      message: error.message,
      code: error.code,
    };
  }

  return new Response(JSON.stringify(diagnostics, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
