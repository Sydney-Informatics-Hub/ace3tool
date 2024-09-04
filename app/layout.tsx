import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import MainNavbar from "@/app/_components/MainNavbar";
import AceFormProvider from "@/app/_forms/AceFormProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | FRONTIER Research",
    default: "ACE-III risk calculator",
  },
  description:
    "A tool to interpret ACE-III scores and how they relate to dementia",
};

const sans_font = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      className={`${sans_font.variable}`}
      lang="en"
    >
      <head></head>
      <body>
        <MainNavbar />
        <AceFormProvider>{children}</AceFormProvider>
      </body>
    </html>
  );
}
