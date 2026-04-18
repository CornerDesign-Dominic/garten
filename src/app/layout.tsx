import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gruenkalender",
  description: "Planung und Struktur fuer deinen Gartenalltag.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${manrope.variable} h-full`}>
      <body className="min-h-full bg-[var(--page-green)] font-sans text-zinc-800 antialiased">
        <Header />
        <main className="px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
