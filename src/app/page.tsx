
import { Suspense } from "react";
import HeroSlider from "@/components/home/HeroSlider";
import LatestBooks from "@/components/home/LatestBooks";
import ReadingBenefits from "@/components/home/ReadingBenefits";
import WhyChooseBookNook from "@/components/home/WhyChooseBookNook";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className="min-h-105" />}>
        <HeroSlider />
      </Suspense>

      <Suspense fallback={<div className="py-16 text-center">Loading latest books...</div>}>
        <LatestBooks />
      </Suspense>

      <WhyChooseBookNook />
      <ReadingBenefits />
    </main>
  );
}
