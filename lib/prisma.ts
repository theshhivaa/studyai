import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const prismaClientSingleton = () => {
  // Use the pooled URL from Vercel/Neon integration
  let url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (process.env.NODE_ENV === "production" && !url) {
    console.error("PRISMA ERROR: No connection URL found in production env.");
  }

  // Enforce SSL for production Neon connections
  if (url && !url.includes("sslmode=")) {
    const separator = url.includes("?") ? "&" : "?";
    url = `${url}${separator}sslmode=require`;
  }
  
  // Use the industry-standard pg driver to resolve the persistent TypeError.
  // This bypasses the experimental Neon serverless driver's handshake issues.
  const pool = new pg.Pool({ connectionString: url });
  const adapter = new PrismaPg(pool);
  
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
