import { PrismaClient } from "@prisma/client";

export async function GET() {
  const diag: any = {
    env: {
      has_DATABASE_URL: !!process.env.DATABASE_URL,
      has_POSTGRES_PRISMA_URL: !!process.env.POSTGRES_PRISMA_URL,
      has_NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      node: process.version,
    },
    prisma: {}
  };

  try {
    const url = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;
    diag.using_url = url ? url.split('@')[1] : "NONE"; // Safe logging

    // Try multiple constructor formats
    try {
      diag.test1 = "Trying new PrismaClient()";
      const p1 = new PrismaClient();
      diag.test1_res = "Created object";
      await p1.$connect();
      diag.test1_res = "Connected!";
      await p1.$disconnect();
    } catch (e: any) {
      diag.test1_err = e.message;
    }

    try {
      diag.test2 = "Trying new PrismaClient({ datasources: { db: { url } } })";
      const p2 = new PrismaClient({ datasources: { db: { url: url as string } } } as any);
      await p2.$connect();
      diag.test2_res = "Connected!";
      await p2.$disconnect();
    } catch (e: any) {
      diag.test2_err = e.message;
    }

  } catch (globalError: any) {
    diag.globalError = globalError.message;
  }

  return new Response(JSON.stringify(diag, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
