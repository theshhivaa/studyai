import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AvatarProvider } from "@/components/context/AvatarContext";
import AndroidAppBanner from "@/components/AndroidAppBanner";
import { Providers } from "@/components/Providers";
import { AuthGuard } from "@/components/auth/AuthGuard";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: 'Scooby AI | AI Study Assistant',
  description: 'Your intelligent study companion for BCA and Food Technology',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },
  openGraph: {
    title: 'Scooby AI | AI Study Assistant',
    description: 'Your intelligent study companion for BCA and Food Technology',
    url: 'https://bcascoobyai.vercel.app',
    siteName: 'StudyWithScooby',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Scooby AI Assistant',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scooby AI | AI Assistant',
    description: 'Your intelligent study companion for BCA and Food Technology',
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
        <Providers>
          <AuthGuard>
            <ThemeProvider>
              <AvatarProvider>
                <AndroidAppBanner />
                {children}
              </AvatarProvider>
            </ThemeProvider>
          </AuthGuard>
        </Providers>
      </body>
    </html>
  );
}
