import type { Metadata, Viewport } from "next";
import { Cormorant_Infant, Great_Vibes, Poppins } from "next/font/google";
import config from "@/lib/config";
import "./globals.css";

const heading = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
  display: "swap",
});

const cormorant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const groom = config.couple.groom.shortName;
const bride = config.couple.bride.shortName;

export const metadata: Metadata = {
  title: `${groom} & ${bride} — Wedding Invitation`,
  description: `Undangan pernikahan ${config.couple.groom.name} & ${config.couple.bride.name}`,
  openGraph: {
    title: `${groom} & ${bride} — Wedding Invitation`,
    description: `Undangan pernikahan ${config.couple.groom.name} & ${config.couple.bride.name}`,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#A94468",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${heading.variable} ${cormorant.variable} ${poppins.variable}`}
    >
      <body className="bg-ivory font-body text-ink antialiased">{children}</body>
    </html>
  );
}
