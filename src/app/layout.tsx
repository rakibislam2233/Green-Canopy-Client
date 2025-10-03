import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd";
import Providers from "@/lib/Providers";
import React from "react";
import { Barlow } from "next/font/google";
import dynamic from "next/dynamic";

const CookiesConsent = dynamic(() => import("@/components/CookiesConsent"), {});
const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Home | Horticulture Specialists",
  description:
    "Welcome to Horticulture, the premier horticultural and agricultural company.",
  keywords: [
    "horticulture",
    "agriculture",
    "fruit",
    "vegetable",
    "produce",
    "farming",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={barlow.className}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#3FB249",
              fontFamily: "var(--font-barlow)",
            },
          }}
        >
          <Providers>
            <Toaster richColors position="top-center" />
            <CookiesConsent />
            {children}
          </Providers>
        </ConfigProvider>
      </body>
    </html>
  );
}
