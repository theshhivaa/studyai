import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Scooby AI App | Scooby BCA",
  description:
    "Download the Scooby AI Android app — your BCA study companion in your pocket. Get AI-powered answers, browse your full syllabus, and ace every exam.",
  openGraph: {
    title: "Download Scooby AI for Android",
    description:
      "Your BCA study companion, now in your pocket. AI chat, full syllabus, and offline support — all for free.",
    url: "https://bcascoobyai.vercel.app/download",
    siteName: "Scooby BCA",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Scooby AI App Download" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Scooby AI for Android",
    description: "Your BCA study companion, now in your pocket. Free APK download.",
    images: ["/og-image.png"],
  },
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
