import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Standard configuration for Neon Serverless v1.0+
neonConfig.webSocketConstructor = ws;

const prismaClientSingleton = () => {
  // Use the pooled URL from Vercel/Neon integration
  let url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (process.env.NODE_ENV === "production" && !url) {
    console.error("PRISMA ERROR: No connection URL found in production env.");
  }

  // Ensure 'sslmode=require' is present in the string
  if (url && !url.includes("sslmode=")) {
    const separator = url.includes("?") ? "&" : "?";
    url = `${url}${separator}sslmode=require`;
  }
  
  // Use a string-only constructor pattern to resolve the 'TypeError' in the Neon driver.
  // We explicitly set 'ssl: true' as a boolean to satisfy the handshake requirement in serverless.
  const pool = new Pool({ 
    connectionString: url,
    ssl: true, 
    max: 10,
  });
  
  const adapter = new PrismaNeon(pool as any);
  
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
