import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import ScrollProgress from "@/src/components/ScrollProgress";
import BlobBackground from "@/src/components/BlobBackground";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DrivingSchool",
  name: "Autoškola Pohl s.r.o.",
  description:
    "Akreditované školící středisko řidičů PZ v Dobrušce. Výcvik skupin AM–CE, profesní školení CPC, vrácení řidičského průkazu.",
  url: "https://www.autoskola-pohl.cz",
  image: "https://www.autoskola-pohl.cz/opengraph-image",
  telephone: ["+420602441636", "+420607656937"],
  email: "autoskola.pohl@seznam.cz",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Komenského 687",
    postalCode: "518 01",
    addressLocality: "Dobruška",
    addressCountry: "CZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.2922,
    longitude: 16.1611,
  },
  areaServed: [
    { "@type": "City", name: "Dobruška" },
    { "@type": "AdministrativeArea", name: "Královéhradecký kraj" },
  ],
  priceRange: "5199–28000 Kč",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a href="#main" className="skip-link">
          Přeskočit na obsah
        </a>
        <ScrollProgress />
        <BlobBackground />
        <Header />
        <main id="main" className="flex-1 pt-[62px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
