import type { Metadata } from "next";
import { Noto_Sans, Ubuntu } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import MainNavbar from "@/app/_components/MainNavbar";
import AceFormProvider from "@/app/_forms/AceFormProvider";
import MainFooter from "@/app/_components/MainFooter";
import TermsModal from "@/app/_components/TermsModal";

export const metadata: Metadata = {
  title: {
    template: "%s | FRONTIER Research",
    default: "ACE-III online dementia screening tool",
  },
  metadataBase: new URL("https://sydney-informatics-hub.github.io/ace3tool/"),
  description:
    "A tool to interpret ACE-III scores and how they relate to dementia",
};

const sans_font = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
const ubuntu_font = Ubuntu({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--heading-font",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      className={`${sans_font.variable} ${ubuntu_font.variable}`}
      lang="en"
    >
      <head></head>
      <body>
        <TermsModal />
        <MainNavbar />
        <AceFormProvider>{children}</AceFormProvider>
        <MainFooter className="mt-12 p-6 bg-gray-100" />
      </body>
    </html>
  );
}
