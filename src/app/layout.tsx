import { Noto_Sans } from "next/font/google";

import "./globals.css";
import { Providers } from "./Providers";
import { AppGlobalLayout } from "./_layout/AppGlobalLayout";

import type { Metadata } from "next";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Persuade Gym",
  description: "The fastest way to improve persuasion skill",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSans.variable}>
        <Providers>
          <AppGlobalLayout>{children}</AppGlobalLayout>
        </Providers>
      </body>
    </html>
  );
}
