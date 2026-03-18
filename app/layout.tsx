import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BoxPop — The AI that texts you back",
  description:
    "Your own personal AI in WhatsApp. Remembers everything. Gets smarter every week from a community who cares.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-[#0a0a0a] text-white`}>
        {children}
      </body>
    </html>
  );
}
