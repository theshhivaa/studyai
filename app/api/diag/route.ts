import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

export async function GET() {
  let url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (url && !url.includes("sslmode=")) {
    const separator = url.includes("?") ? "&" : "?";
    url = `${url}${separator}sslmode=require`;
  }

  const pool = new Pool({ 
    connectionString: url,
    ssl: true, 
    max: 10,
  });
  const adapter = new PrismaNeon(pool as any);
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
