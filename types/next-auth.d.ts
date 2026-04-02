import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      hasSetName: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    hasSetName?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    hasSetName: boolean;
  }
}
