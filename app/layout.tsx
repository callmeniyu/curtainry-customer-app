import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Curtainry - Transform Your Space",
  description:
    "Premium curtains, expert consultation, and seamless installation services",
  keywords:
    "curtains, home decor, interior design, curtain installation, custom curtains",
  authors: [{ name: "Curtainry Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased bg-background text-text`}
      >
        {children}
      </body>
    </html>
  );
}
