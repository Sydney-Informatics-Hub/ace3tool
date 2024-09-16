import ScoreWidget from "@/app/_components/ScoreWidget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ACE-III online dementia screening tool | FRONTIER Research",
  description: "Predict and visualize the impact of ACE-III scores",
};

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen md:p-2">
      <ScoreWidget />
    </main>
  );
}
