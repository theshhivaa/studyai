import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";
import ws from "ws";

const prismaClientSingleton = () => {
  // Use the pooled URL from Vercel/Neon integration with fallbacks
  const url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (process.env.NODE_ENV === "production" && !url) {
    console.error("PRISMA ERROR: No connection URL found in production env.");
  }
  
  // Configure the Neon Driver Adapter for Prisma 7
  // We use a type cast to 'any' for the pool instance to resolve a TypeScript mismatch
  // between different minor versions of the Neon serverless driver and the Prisma adapter.
  const pool = new Pool({ connectionString: url });
  const adapter = new PrismaNeon(pool as any, { webSocketConstructor: ws as any });
  
  return new PrismaClient({ 
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
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
