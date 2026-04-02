import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Scooby AI App | Study Assistant",
  description:
    "Download the Scooby AI Android app — your study companion for BCA and Food Technology. Get AI-powered answers, browse your full syllabus, and ace every exam.",
  openGraph: {
    title: "Download Scooby AI for Android",
    description:
      "Your study companion for BCA and Food Technology, now in your pocket. AI chat, full syllabus, and offline support — all for free.",
    url: "https://bcascoobyai.vercel.app/download",
    siteName: "Scooby AI",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Scooby AI App Download" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Scooby AI for Android",
    description: "Your study companion for BCA and Food Technology, now in your pocket. Free APK download.",
    images: ["/og-image.png"],
  },
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
