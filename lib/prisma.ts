import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // Use the pooled URL from Vercel/Neon integration with fallbacks
  const url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (process.env.NODE_ENV === "production" && !url) {
    console.error("PRISMA ERROR: No connection URL found in production env.");
  }
  
  const config: any = {
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  };

  // Only assign datasourceUrl if we have a valid string. 
  // In Prisma 7, passing undefined/null/empty can cause an initialization crash.
  if (url) {
    config.datasourceUrl = url;
  }
  
  return new PrismaClient(config);
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const getPrisma = (): PrismaClientSingleton => {
  // Prevent initialization during the build phase in Next.js 15+
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
