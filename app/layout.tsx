import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import LayoutContent from "@/components/layout/LayoutContent";
import { HeaderProvider } from "@/context/HeaderContext";
import { BottomNavProvider } from "@/context/BottomNavContext";

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
        <HeaderProvider>
          <BottomNavProvider>
            <LayoutContent>{children}</LayoutContent>
          </BottomNavProvider>
        </HeaderProvider>
      </body>
    </html>
  );
}
