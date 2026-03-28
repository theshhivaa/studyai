import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AvatarProvider } from "@/components/context/AvatarContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Scooby BCA | AI Assistant",
  description: "Your intelligent study companion for Bachelor of Computer Applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased text-white min-h-screen bg-[#0a0e1a]`}>
        <ThemeProvider>
          <AvatarProvider>
            {children}
          </AvatarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
