import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import MainNavbar from "@/app/_components/MainNavbar";

export const metadata: Metadata = {
  title: {
    template: "%s | FRONTIER Research",
    default: "ACE-III risk calculator",
  },
  description:
    "A tool to interpret ACE-III scores and how they relate to dementia",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head></head>
      <body>
        <MainNavbar />
        {children}
      </body>
    </html>
  );
}
