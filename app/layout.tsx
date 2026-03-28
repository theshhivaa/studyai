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
  title: "Scooby.AI",
  description: "Your intelligent study companion for Bachelor of Computer Applications",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased text-white min-h-[100dvh] bg-background overscroll-none`}>
        <ThemeProvider>
          <AvatarProvider>
            {children}
          </AvatarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
