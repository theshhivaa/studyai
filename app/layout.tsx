import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AvatarProvider } from "@/components/context/AvatarContext";
import AndroidAppBanner from "@/components/AndroidAppBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: 'Scooby BCA | AI Assistant',
  description: 'Your intelligent study companion for Bachelor of Computer Applications',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },
  openGraph: {
    title: 'Scooby BCA | AI Assistant',
    description: 'Your intelligent study companion for Bachelor of Computer Applications',
    url: 'https://bcascoobyai.vercel.app',
    siteName: 'StudyWithScooby',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Scooby BCA AI Assistant',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scooby BCA | AI Assistant',
    description: 'Your intelligent study companion for BCA',
    images: ['/og-image.png'],
  },
}

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
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased text-white min-h-[100dvh] bg-background overscroll-none`}>
        <ThemeProvider>
          <AvatarProvider>
            <AndroidAppBanner />
            {children}
          </AvatarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
