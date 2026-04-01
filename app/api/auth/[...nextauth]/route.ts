import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

const handler = async (req: any, res: any) => {
  try {
    return await NextAuth(req, res, authOptions);
  } catch (error: any) {
    console.error("NextAuth Handler Error:", error);
    // Return a 500 but with more details in the body if possible
    return new Response(JSON.stringify({ 
      error: "Authentication Handler Crash", 
      message: error.message,
      env: {
        hasPrismaUrl: !!process.env.POSTGRES_PRISMA_URL,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      }
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};

export { handler as GET, handler as POST };
