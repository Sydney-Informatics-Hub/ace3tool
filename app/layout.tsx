import type { Metadata } from "next";
import "./globals.css";
import { ThemeModeScript } from "flowbite-react";
import { ReactNode } from "react";
import MainNavbar from "@/app/_components/MainNavbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body>
        <MainNavbar />
        {children}
      </body>
    </html>
  );
}
