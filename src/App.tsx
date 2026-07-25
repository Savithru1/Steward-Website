import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { initGA, trackPageView, trackEvent } from './lib/analytics';
import SEOHead from './seo/SEOHead';
import Navbar from './components/layout/Navbar';
import CompassBackground from './components/layout/CompassBackground';
import AbstractShapes from './components/layout/AbstractShapes';
import Hero from './sections/Hero';
import Needle from './sections/Needle';
import OneSystem from './sections/OneSystem';
import DayWithSteward from './sections/DayWithSteward';
import BuiltForRestaurants from './sections/BuiltForRestaurants';
import Pricing from './sections/Pricing';
import Features from './sections/Features';
import EarlyPartners from './sections/EarlyPartners';
import FAQ from './sections/FAQ';
import FinalCTA from './sections/FinalCTA';
import Footer from './components/layout/Footer';

// Feature Pages
import LiveOpsPage from './feature-pages/pages/live-ops/page';
import MenuPage from './feature-pages/pages/menu/page';
import FinancePage from './feature-pages/pages/finance/page';
import NeedlePage from './feature-pages/pages/needle/page';
import SettingsPage from './feature-pages/pages/settings/page';
import KitchenBoardPage from './feature-pages/pages/kitchen-board/page';
import CampaignsPage from './feature-pages/pages/campaigns/page';
import CustomersPage from './feature-pages/pages/customers/page';
import InventoryPage from './feature-pages/pages/inventory/page';
import LiveCounterPage from './feature-pages/pages/live-counter/page';
import LogbookPage from './feature-pages/pages/logbook/page';
import OrdersPage from './feature-pages/pages/orders/page';
import StaffPage from './feature-pages/pages/staff/page';
import ResourcesPage from './feature-pages/pages/resources/page';
import EndOfPosReportPage from './feature-pages/pages/resources/end-of-pos-report/page';
import FoodCostCalculatorPage from './feature-pages/pages/resources/food-cost-calculator/page';
import PrivacyPage from './feature-pages/pages/privacy/page';
import TermsPage from './feature-pages/pages/terms/page';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (hash) {
      // Wait a tiny bit for the components to render, then scroll to the element
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        timer = setTimeout(() => {
          const el = document.getElementById(hash.slice(1));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [pathname, hash]);

  return null;
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

function LandingPage() {
  return (
    <PageTransition>
      <SEOHead path="/" />
      <div className="font-primary text-steward-text-secondary bg-steward-canvas min-h-screen relative">
        <AbstractShapes />
        <CompassBackground />
        <main className="section-gap relative z-10" style={{ paddingTop: '72px' }}>
          <Hero />
          <Needle />
          <OneSystem />
          <DayWithSteward />
          <BuiltForRestaurants />
          <Features />
          <Pricing />
          <EarlyPartners />
          <FAQ />
          <FinalCTA />
        </main>
      </div>
    </PageTransition>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    // Only track scroll depth on the main landing page
    if (location.pathname !== '/') return;

    const thresholds = [25, 50, 75, 100];
    const fired = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) return;

      const scrollPercent = (scrollTop / docHeight) * 100;

      thresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          trackEvent('scroll_depth', {
            scroll_depth: threshold,
            page_name: 'landing_page',
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load/mount in case they are already scrolled
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-steward-canvas text-steward-text-secondary">
      <ScrollToTop />
      <Navbar />
      
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/live-ops" element={<PageTransition><LiveOpsPage /></PageTransition>} />
            <Route path="/menu" element={<PageTransition><MenuPage /></PageTransition>} />
            <Route path="/finance" element={<PageTransition><FinancePage /></PageTransition>} />
            <Route path="/needle" element={<PageTransition><NeedlePage /></PageTransition>} />
            <Route path="/settings" element={<PageTransition><SettingsPage /></PageTransition>} />
            <Route path="/kitchen-board" element={<PageTransition><KitchenBoardPage /></PageTransition>} />
            <Route path="/campaigns" element={<PageTransition><CampaignsPage /></PageTransition>} />
            <Route path="/customers" element={<PageTransition><CustomersPage /></PageTransition>} />
            <Route path="/inventory" element={<PageTransition><InventoryPage /></PageTransition>} />
            <Route path="/live-counter" element={<PageTransition><LiveCounterPage /></PageTransition>} />
            <Route path="/logbook" element={<PageTransition><LogbookPage /></PageTransition>} />
            <Route path="/orders" element={<PageTransition><OrdersPage /></PageTransition>} />
            <Route path="/staff" element={<PageTransition><StaffPage /></PageTransition>} />
            <Route path="/resources" element={<PageTransition><ResourcesPage /></PageTransition>} />
            <Route path="/resources/end-of-pos-report" element={<PageTransition><EndOfPosReportPage /></PageTransition>} />
            <Route path="/resources/food-cost-calculator" element={<PageTransition><FoodCostCalculatorPage /></PageTransition>} />
            <Route path="/privacy" element={<PageTransition><PrivacyPage /></PageTransition>} />
            <Route path="/terms" element={<PageTransition><TermsPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
