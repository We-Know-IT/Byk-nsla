import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig, siteThemeCssVars } from "./shared/config/site.config";
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
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.htmlLang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={siteThemeCssVars(siteConfig.theme) as CSSProperties}
    >
      <body className="m-0 min-h-full flex flex-col bg-surface font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
