import type { Metadata } from "next";
import { Mate_SC } from "next/font/google";

import "./globals.css";

const mateSC = Mate_SC({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Go Fish",
  description: "The online job board for the fishing industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mateSC.className}`}
      >

        {children}
      </body>
    </html>
  );
}
