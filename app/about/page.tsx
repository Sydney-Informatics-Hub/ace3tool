import { Metadata } from "next";
import { Card } from "flowbite-react";
import Image from "next/image";
import React from "react";
import AboutContent from "@/app/about/AboutContent.mdx";
import { NoPaddingCardTheme } from "@/app/_components/ScoreWidget";
import frontier_logo from "@/app/_images/frontier_logo.png";

export const metadata: Metadata = {
  title: "About",
  description: "About the calculator",
};

export default function About() {
  return (
    <main className="container mx-auto min-h-screen md:p-2">
      <div className="flex flex-col justify-start items-center gap-2 md:gap-4">
        <Card className="min-w-96 max-w-2xl" theme={NoPaddingCardTheme}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-indigo-600 font-semibold">
              Welcome to the Addenbrooke’s Cognitive Examination-III (ACE-III)
              Online Dementia Screening Tool
            </h2>
            <Image
              className="inline"
              // NOTE: need to manually prefix this with the base path
              src={frontier_logo}
              alt="FRONTIER Logo"
              width={150}
              height={100}
              priority
            />
          </div>
          <div className="max-w-prose">
            <AboutContent />
          </div>
        </Card>
        <Card className="min-w-96 max-w-2xl">
          <h2 className="text-lg font-semibold text-indigo-600">
            References/Resources
          </h2>
          <ul className="text-base max-w-prose list-disc">
            <li>Reference 1</li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
