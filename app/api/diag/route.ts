import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

export async function GET() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;
  const pool = new Pool({ connectionString: url });
  const adapter = new PrismaNeon(pool as any);
  const prisma = new PrismaClient({ adapter });

  const diagnostics: any = {
    env: {
      has_SECRET: !!process.env.NEXTAUTH_SECRET,
      has_URL: !!process.env.NEXTAUTH_URL,
    }
  };

  try {
    const userCount = await prisma.user.count();
    diagnostics.userCount = userCount;
    
    if (userCount > 0) {
      const lastUser = await prisma.user.findFirst({
        orderBy: { id: 'desc' }
      });
      diagnostics.lastUser = {
        name: lastUser?.name,
        email: lastUser?.email?.charAt(0) + "..." // Privacy
      };
    }
    
    const accounts = await prisma.account.count();
    diagnostics.accountCount = accounts;

  } catch (error: any) {
    diagnostics.error = error.message;
  } finally {
    await prisma.$disconnect();
  }

  return new Response(JSON.stringify(diagnostics, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
