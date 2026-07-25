import { motion } from 'framer-motion';
import { CONTACT_INFO } from '../config/contact';
import { trackEvent } from '../lib/analytics';

function HeroContent() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.25 }
    }
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(12px)', scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: { duration: 1.2, ease: [0.15, 0.85, 0.35, 1] as const }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="text-center relative z-10"
    >
      {/* Eyebrow */}
      <motion.div variants={fadeVariants} className="flex items-center justify-center gap-3 mb-[24px]">
        <div className="w-10 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #FFFFFF)' }} />
        <p className="font-primary font-medium text-xs sm:text-sm tracking-[0.25em] uppercase" style={{ color: '#FFFFFF' }}>
          Precision Navigation
        </p>
        <div className="w-10 h-[1px]" style={{ background: 'linear-gradient(90deg, #FFFFFF, transparent)' }} />
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={fadeVariants}
        className="font-secondary font-bold text-[44px] sm:text-[60px] lg:text-[80px] leading-[1.05] text-white text-center max-w-[900px] mx-auto mb-[28px]"
      >
        Your restaurant's{' '}
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: 'linear-gradient(135deg, #A0A0A0 0%, #404040 50%, #050505 100%)' }}
        >
          true north.
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        variants={fadeVariants}
        className="font-primary font-regular text-[17px] sm:text-[19px] leading-[1.7] text-white/55 text-center max-w-[620px] mx-auto mb-[48px]"
      >
        Steward brings ordering, payments, and kitchen operations into a single, precision-engineered dashboard. Point your business in the right direction.
      </motion.p>
    </motion.div>
  );
}

function CTAGroup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.15, 0.85, 0.35, 1] as const, delay: 0.6 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-[16px] relative z-10"
    >
      {/* Primary CTA - Greyscale */}
      <a
        href={CONTACT_INFO.whatsappUrl}
        onClick={() => {
          trackEvent('hero_cta_click', { button_text: 'Set Course', destination_url: CONTACT_INFO.whatsappUrl, section_name: 'hero' });
          trackEvent('whatsapp_click', { button_text: 'Set Course', destination_url: CONTACT_INFO.whatsappUrl, section_name: 'hero' });
        }}
        className="touch-target flex items-center justify-center w-full sm:w-auto px-[36px] py-[14px] text-sm font-semibold font-primary rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        style={{
          background: 'linear-gradient(135deg, #A0A0A0 0%, #404040 50%, #050505 100%)',
          color: '#FFFFFF',
          boxShadow: '0 4px 20px rgba(160, 160, 160, 0.15), 0 0 60px rgba(160, 160, 160, 0.05)',
        }}
      >
        Set Course
      </a>

      {/* Secondary CTA - Ghost */}
      <a
        href="#product"
        onClick={() => trackEvent('hero_cta_click', { button_text: 'View Instruments', destination_url: '#product', section_name: 'hero' })}
        className="touch-target flex items-center justify-center w-full sm:w-auto px-[36px] py-[14px] text-sm font-medium font-primary rounded-full border border-white/[0.12] text-white/70 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.04] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
      >
        View Instruments
      </a>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="w-full min-h-[90vh] section-spacing flex items-center justify-center relative overflow-hidden"
    >
      <div className="container max-w-[900px] flex flex-col items-center relative z-10">
        <HeroContent />
        <CTAGroup />
      </div>
    </section>
  );
}
