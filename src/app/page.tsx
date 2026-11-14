import HeroSlider from "@/components/home/HeroSlider";
import LatestBooks from "@/components/home/LatestBooks";
import ReadingBenefits from "@/components/home/ReadingBenefits";
import WhyChooseBookNook from "@/components/home/WhyChooseBookNook";

export default function Home() {
  return (
    <main>
      <HeroSlider/>
      <LatestBooks/>
      <WhyChooseBookNook/>
      <ReadingBenefits/>
    </main>
  );
}
