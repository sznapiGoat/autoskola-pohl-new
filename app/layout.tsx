import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

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
  title: {
    default: "Autoškola POHL — Řidičský průkaz v Dobrušce",
    template: "%s | Autoškola POHL",
  },
  description:
    "Výcvik skupin AM, A1, A2, A, B, BE, B96, C a CE v Dobrušce. Profesní školení CPC, vrácení řidičského průkazu, referentské školení. Akreditované středisko.",
  keywords: "autoškola, Dobruška, řidičský průkaz, CPC školení, vrácení ŘP, Pohl",
  metadataBase: new URL("https://www.autoskola-pohl.cz"),
  openGraph: {
    siteName: "Autoškola POHL",
    locale: "cs_CZ",
    type: "website",
  },
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
      <body className="min-h-svh bg-bg text-ink font-sans flex flex-col">
        <Header />
        <main className="flex-1 pt-[62px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
