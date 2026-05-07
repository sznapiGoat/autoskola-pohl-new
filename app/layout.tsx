import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Autoškola POHL — Řidičský průkaz v Dobrušce",
  description:
    "Výcvik skupin AM, A1, A2, A, B, BE, B96, C a CE v Dobrušce. Profesní školení CPC, vrácení řidičského průkazu, referentské školení. Akreditované středisko.",
  keywords: "autoškola, Dobruška, řidičský průkaz, CPC školení, vrácení ŘP, Pohl",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
