import type { Metadata, Viewport } from "next";
import {
  Amiri,
  Cormorant_Garamond,
  Great_Vibes,
  Poppins,
} from "next/font/google";
import config from "@/lib/config";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const arabic = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const accent = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-accent",
  display: "swap",
});

const groom = config.couple.groom.shortName;
const bride = config.couple.bride.shortName;

export const metadata: Metadata = {
  title: `${groom} & ${bride} — Wedding Invitation`,
  description: `Undangan pernikahan ${config.couple.groom.name} & ${config.couple.bride.name}`,
  icons: {
    icon: "/assets/logo/favicon-olive.png",
    apple: "/assets/logo/favicon-olive.png",
  },
  openGraph: {
    title: `${groom} & ${bride} — Wedding Invitation`,
    description: `Undangan pernikahan ${config.couple.groom.name} & ${config.couple.bride.name}`,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#5A6642",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${body.variable} ${arabic.variable} ${accent.variable}`}
    >
      <body className="bg-ivory-50 font-body text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
