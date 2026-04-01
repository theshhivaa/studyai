import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // If no database URL is found in environment, we return a mock or a dummy
  // during build time to avoid crashing. 
  const url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (!url && process.env.NODE_ENV === "production") {
    // If we're in production and have no URL, this is a fatal configuration error,
    // but we can try to return a dummy to see if it allows the app to start
    console.error("CRITICAL: No PostgreSQL URL found in environment variables.");
  }
  
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const getPrisma = (): PrismaClientSingleton => {
  // In Next.js 15+ build phase (Phase 1), we return an empty proxy
  // to prevent Prisma from trying to connect to a non-existent DB.
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return {} as any;
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = prismaClientSingleton();
  }
  return globalForPrisma.prisma;
};

const prisma = getPrisma();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
