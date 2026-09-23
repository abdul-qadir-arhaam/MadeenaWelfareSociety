import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Madeena Welfare Society Bhatkal — Official News & Media Portal",
    template: "%s | Madeena Welfare Society Bhatkal",
  },
  description:
    "Official website for Madeena Welfare Society Bhatkal. Working together for a healthier, stronger and more compassionate community through news, welfare programs, sports events, and achievements.",
  keywords: [
    "Madeena Welfare Society",
    "MWS Bhatkal",
    "Bhatkal welfare",
    "Bhatkal cricket",
    "Cosmos Golden Jubilee Trophy",
    "Bhatkal community",
    "Madina Ta'leemi awards",
  ],
  authors: [{ name: "Madeena Welfare Society Media Cell" }],
  icons: {
    icon: "/images/official-logo.png",
    apple: "/images/official-logo.png",
  },
  openGraph: {
    title: "Madeena Welfare Society Bhatkal — Official News & Media Portal",
    description:
      "Official website for Madeena Welfare Society Bhatkal. Community welfare programs, championship sports, and authentic media archives.",
    url: "http://localhost:3000",
    siteName: "Madeena Welfare Society Bhatkal",
    images: [
      {
        url: "/images/instagram/insta_post_10.jpg",
        width: 1200,
        height: 630,
        alt: "Madeena Welfare Society Bhatkal Champions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Madeena Welfare Society Bhatkal",
    description: "Official News, Welfare Programs, and Media Portal for Madeena Welfare Society Bhatkal.",
    images: ["/images/instagram/insta_post_10.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Madeena Welfare Society Bhatkal",
  "alternateName": "مدینہ ویلفیئر سوسائٹی ، بھٹکل",
  "url": "http://localhost:3000",
  "logo": "http://localhost:3000/images/official-logo.png",
  "foundingDate": "1993",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Madeena Colony, Main Road",
    "addressLocality": "Bhatkal",
    "addressRegion": "Karnataka",
    "postalCode": "581320",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91 8386 226193",
    "contactType": "general inquiries",
    "email": "contact@madeenaws.bhatkal.org"
  },
  "sameAs": [
    "https://www.instagram.com/madeenawelfaresociety"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-[#0B2238] antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <LanguageProvider>
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
