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
  title: {
    default: "Aqlli Dala — Умный полив для Узбекистана | IoT датчики влажности",
    template: "%s | Aqlli Dala"
  },
  description: 
    "IoT-платформа для агротехнологий в Узбекистане. Датчики влажности почвы + LoRaWAN + ИИ-аналитика. " +
    "Экономия воды 30%, электричества 25%, увеличение урожайности +15%. Работает без 3G/4G.",
  keywords: [
    "умный полив",
    "IoT датчики",
    "влажность почвы",
    "агротехнологии",
    "Узбекистан",
    "LoRaWAN",
    "экономия воды",
    "фермерство",
    "Aqlli Dala",
    "smart agriculture",
    "irrigation system"
  ],
  authors: [{ name: "Aqlli Dala Team" }],
  creator: "Aqlli Dala",
  publisher: "Aqlli Dala",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aqllidala.uz"),
  alternates: {
    canonical: "/",
    languages: {
      "uz-UZ": "/uz",
      "ru-RU": "/ru",
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://aqllidala.uz",
    siteName: "Aqlli Dala",
    title: "Aqlli Dala — Умный полив для Узбекистана",
    description:
      "IoT-датчики влажности + LoRaWAN + ИИ-аналитика. Экономия воды 30%, электричества 25%, урожайность +15%.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aqlli Dala — Умный полив",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aqlli Dala — Умный полив для Узбекистана",
    description:
      "IoT-датчики влажности + LoRaWAN + ИИ-аналитика. Экономия воды 30%, электричества 25%, урожайность +15%.",
    images: ["/twitter-image.jpg"],
    creator: "@aqllidala",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Aqlli Dala",
              url: "https://aqllidala.uz",
              logo: "https://aqllidala.uz/logo.png",
              description:
                "IoT-платформа для агротехнологий в Узбекистане",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+998-XX-XXX-XX-XX",
                contactType: "customer service",
                availableLanguage: ["Uzbek", "Russian"],
              },
              areaServed: {
                "@type": "Country",
                name: "Uzbekistan",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
