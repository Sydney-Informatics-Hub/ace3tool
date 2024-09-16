import { Metadata } from "next";
import { Card } from "flowbite-react";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "About",
  description: "About the calculator",
};

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen md:p-2">
      <div className="flex flex-col justify-start items-center gap-2 md:gap-4">
        <Card className="min-w-96 max-w-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-indigo-900 font-bold">
              About the calculator
            </h2>
            <Image
              className="inline"
              // NOTE: need to manually prefix this with the base path
              src="/informatics/PIPE-5195-dementia-risk/img/frontier_logo.png"
              alt="FRONTIER Logo"
              width={150}
              height={100}
              priority
            />
          </div>
          <div className="text-base max-w-prose">
            The model was developed using data from X people in a large sample.
          </div>
        </Card>
        <Card className="min-w-96 max-w-xl">
          <h2 className="text-lg font-bold">References</h2>
          <ul className="text-base max-w-prose list-disc">
            <li>Reference 1</li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
