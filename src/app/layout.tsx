import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jhanvit Foundation | Section 8 NGO in Pune",
  description:
    "Jhanvit Foundation provides competitive exam guidance, UPSC/MPSC consultation, structured study space access at ANUBHAVV, and student seat sponsorship in Sadashiv Peth, Pune.",
  icons: {
    icon: [
      { url: "/images/jhanvit_emblem.png", type: "image/png" },
    ],
    shortcut: "/images/jhanvit_emblem.png",
    apple: "/images/jhanvit_emblem.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
