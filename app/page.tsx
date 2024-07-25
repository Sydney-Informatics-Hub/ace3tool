import ScoreWidget from "@/app/_components/ScoreWidget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ACE-III risk calculator",
  description: "Predict risk of impairment based on ACE-III scores",
};

export default function Home() {
  return (
    <main className="flex flex-wrap min-h-screen items-center justify-center md:gap-2 dark:bg-gray-800">
      <ScoreWidget />
    </main>
  );
}
