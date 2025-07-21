import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { AppGlobalLayout } from "./_layout/AppGlobalLayout";

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
        <AppGlobalLayout>{children}</AppGlobalLayout>
      </body>
    </html>
  );
}
