import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "大阪美食指南 (Osaka Food Guide)",
  description: "Hung Ng 的大阪必食清單",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK">
      <body className={notoSansJP.className}>{children}</body>
    </html>
  );
}
