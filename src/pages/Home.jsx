import SEOHead from '../components/layout/SEOHead.jsx';
import Hero from '../components/home/Hero.jsx';
import PillarCards from '../components/home/PillarCards.jsx';
import ImpactNumbers from '../components/home/ImpactNumbers.jsx';
import HUFundingBand from '../components/home/HUFundingBand.jsx';
import ReviewsStrip from '../components/home/ReviewsStrip.jsx';
import EventsPreview from '../components/home/EventsPreview.jsx';
import TeamSection from '../components/home/TeamSection.jsx';
import LocationsMap from '../components/home/LocationsMap.jsx';
import { useLanguage } from '../hooks/useLanguage.js';

export default function Home() {
  const { lang } = useLanguage();

  return (
    <>
      <SEOHead lang={lang} />
      <main>
        <Hero />
        <PillarCards />
        <ImpactNumbers />
        <HUFundingBand />
        <ReviewsStrip />
        <EventsPreview />
        <TeamSection />
        <LocationsMap />
      </main>
    </>
  );
}
