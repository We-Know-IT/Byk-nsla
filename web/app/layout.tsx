import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "./shared/config/site.config";
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
      style={{
        '--config-bg': siteConfig.theme.colors.background,
        '--config-surface': siteConfig.theme.colors.surface,
        '--config-surface-hover': siteConfig.theme.colors.surfaceHover,
        '--config-border': siteConfig.theme.colors.border,
        '--config-fg': siteConfig.theme.colors.foreground,
        '--config-fg-muted': siteConfig.theme.colors.foregroundMuted,
        '--config-brand': siteConfig.theme.colors.brandPrimary,
        '--config-brand-fg': siteConfig.theme.colors.brandForeground,
        '--config-font-sans': siteConfig.theme.fonts.sans,
        '--config-font-mono': siteConfig.theme.fonts.mono,
      } as React.CSSProperties}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
