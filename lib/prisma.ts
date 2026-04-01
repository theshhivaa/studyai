import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // Priority order for database connection strings
  const url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (process.env.NODE_ENV === "production") {
    if (!url) {
      console.error("PRISMA ERROR: No connection URL found in [POSTGRES_PRISMA_URL, DATABASE_URL, POSTGRES_URL]");
    } else {
      console.log("Prisma Client initialized with connection URL from environment");
    }
  }
  
  return new PrismaClient({
    // @ts-ignore - Prisma 7 expects datasourceUrl for direct connection overrides
    datasourceUrl: url || undefined,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const getPrisma = (): PrismaClientSingleton => {
  // Prevent Prisma initialization during build phase
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
