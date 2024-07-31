import { Metadata } from "next";
import ScoreWidget from "@/app/_components/ScoreWidget";
import { Card } from "flowbite-react";

export const metadata: Metadata = {
  title: "ACE-III risk calculator - About",
  description: "About the calculator",
};

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen md:p-2">
      <div className="flex flex-col justify-start items-center gap-2 md:gap-4">
        <Card className="min-w-96 max-w-xl">
          <h2 className="text-lg text-indigo-900 font-bold">
            About the calculator
          </h2>
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
