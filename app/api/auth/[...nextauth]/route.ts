import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Wrapper for diagnostic logging in production
// We move NextAuth(authOptions) INSIDE the handler to catch initialization errors
const handler = async (req: any, res: any) => {
  try {
    const nextAuthHandler = NextAuth(authOptions);
    return await nextAuthHandler(req, res);
  } catch (error: any) {
    console.error("FATAL NextAuth Initialization Error:", error);
    
    // Return a diagnostic response if it crashes during initialization
    return new Response(JSON.stringify({
      error: "NextAuth Initialization Failed",
      message: error.message,
      stack: error.stack,
      diagnostics: {
        hasPrismaUrl: !!process.env.POSTGRES_PRISMA_URL,
        hasDbUrl: !!process.env.DATABASE_URL,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        nodeVersion: process.version,
        nextPhase: process.env.NEXT_PHASE
      }
    }), { 
      status: 500, 
      headers: { "Content-Type": "application/json" } 
    });
  }
};

export { handler as GET, handler as POST };
