import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Correct configuration for Neon Serverless v1.0+
// Direct assignment of the WebSocket constructor is required for environments like Vercel
neonConfig.webSocketConstructor = ws;

const prismaClientSingleton = () => {
  // Use the pooled URL from Vercel/Neon integration with fallbacks
  const url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (process.env.NODE_ENV === "production" && !url) {
    console.error("PRISMA ERROR: No connection URL found in production env.");
  }
  
  // Configure the Neon Driver Adapter for Prisma 7
  const pool = new Pool({ connectionString: url });
  
  // In the latest adapter-neon, the constructor only takes the pool instance.
  // WebSocket configuration is handled globally via neonConfig above.
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
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = prismaClientSingleton();
  }
  return globalForPrisma.prisma;
};

const prisma = getPrisma();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
