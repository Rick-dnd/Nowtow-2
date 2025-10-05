import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { HighlightsSection } from '@/components/home/HighlightsSection';
import { DiscoverySection } from '@/components/home/DiscoverySection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';

export default function Home(): React.ReactElement {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <div id="highlights">
          <HighlightsSection />
        </div>
        <DiscoverySection />
        <HowItWorksSection />
      </main>
      <Footer />
    </>
  );
}
