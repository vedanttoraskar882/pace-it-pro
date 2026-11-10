import { useCallback, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PilotModal } from './components/PilotModal';
import { PlatformSection } from './components/PlatformSection';
import { PricingSection } from './components/PricingSection';
import { useSectionReveal } from './hooks/useSectionReveal';
import './App.css';

export function App() {
  const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);
  const [modalTriggerEl, setModalTriggerEl] = useState<HTMLElement | null>(null);

  useSectionReveal();

  const handleOpenPilotModal = useCallback((triggerEl: HTMLElement | null) => {
    setModalTriggerEl(triggerEl);
    setIsPilotModalOpen(true);
  }, []);

  const handleClosePilotModal = useCallback(() => {
    setIsPilotModalOpen(false);
  }, []);

  return (
    <>
      <div
        className="page-shell"
        aria-hidden={isPilotModalOpen || undefined}
        inert={isPilotModalOpen}
      >
        <Header onOpenPilotModal={handleOpenPilotModal} />

        <main id="main-content">
          <HeroSection onOpenPilotModal={handleOpenPilotModal} />
          <AboutSection />
          <PlatformSection />
          <HowItWorksSection />
          <PricingSection onOpenPilotModal={handleOpenPilotModal} />
          <FaqSection />
        </main>

        <Footer onOpenPilotModal={handleOpenPilotModal} />
      </div>

      <PilotModal
        isOpen={isPilotModalOpen}
        onClose={handleClosePilotModal}
        returnFocusEl={modalTriggerEl}
      />
    </>
  );
}

export default App;
