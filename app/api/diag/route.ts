import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

export async function GET() {
  let url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (url && !url.includes("sslmode=")) {
    const separator = url.includes("?") ? "&" : "?";
    url = `${url}${separator}sslmode=require`;
  }

  const pool = new pg.Pool({ connectionString: url });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const diagnostics: any = {
    env: {
      has_SECRET: !!process.env.NEXTAUTH_SECRET,
      has_URL: !!url,
    }
  };

  try {
    const userCount = await prisma.user.count();
    diagnostics.userCount = userCount;
    diagnostics.status = "SUCCESS";
  } catch (error: any) {
    diagnostics.error = error.message;
    diagnostics.status = "ERROR";
  } finally {
    await prisma.$disconnect();
  }

  return new Response(JSON.stringify(diagnostics, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
