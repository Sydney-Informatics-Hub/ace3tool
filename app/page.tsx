import ScoreWidget from "@/app/_components/ScoreWidget";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ACE-III online dementia screening tool | FRONTIER Research",
  description:
    "This tool is designed to assist clinicians in screening patients for dementia. The tool was developed by the FRONTIER Research Group at the University of Sydney, and implemented by the Sydney Informatics Hub.",
};

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen md:p-2">
      <ScoreWidget />
    </main>
  );
}
