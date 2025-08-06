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
  title: {
    default: "Persuade Gym - 説得力トレーニングアプリ",
    template: "%s | Persuade Gym",
  },
  description:
    "営業職の説得力を鍛えるAIトレーニングアプリ。初級から上級まで様々な難易度のキャラクターと実践的なビジネスシナリオで練習。ポイント制システムで効率的な説得力を身につける。",
  keywords: [
    "説得力",
    "営業トレーニング",
    "AI",
    "ビジネススキル",
    "プレゼン力",
    "交渉術",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://persuade-gym.vercel.app"
  ),
  openGraph: {
    title: "Persuade Gym - 説得力トレーニングアプリ",
    description:
      "AIとの対話で説得力を鍛える。営業・プレゼン・交渉スキルの向上に。",
    url: "/",
    siteName: "Persuade Gym",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Persuade Gym - 説得力を鍛える",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ja">
      <body className={notoSans.variable}>
        <Providers>
          <AppGlobalLayout>{children}</AppGlobalLayout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
