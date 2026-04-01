import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Direct initialization for standard NextAuth App Router behavior
const nextAuthHandler = NextAuth(authOptions);

// Wrapper for diagnostic logging in production
const handler = async (req: any, res: any) => {
  try {
    return await nextAuthHandler(req, res);
  } catch (error: any) {
    console.error("FATAL NextAuth Error:", error);
    
    // Return a diagnostic response if it crashes during initialization
    return new Response(JSON.stringify({
      error: "NextAuth Handler Crash",
      details: error.message,
      diagnostics: {
        hasPrismaUrl: !!process.env.POSTGRES_PRISMA_URL,
        hasDbUrl: !!process.env.DATABASE_URL,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      }
    }), { 
      status: 500, 
      headers: { "Content-Type": "application/json" } 
    });
  }
};

export { handler as GET, handler as POST };
