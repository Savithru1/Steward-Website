import { motion } from 'framer-motion';
import { CONTACT_INFO } from '../config/contact';
import { trackEvent } from '../lib/analytics';

export default function FinalCTA() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.15, 0.85, 0.35, 1] as const
      }
    }
  };

  return (
    <motion.section
      id="contact"
      aria-label="Final Call to Action"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={containerVariants}
      className="w-full bg-steward-canvas section-spacing flex items-center justify-center"
    >
      <div className="container max-w-[800px] flex flex-col items-center px-4 sm:px-6 text-center">
        
        {/* Eyebrow - Font: Inter (Primary), Weight: Medium (500) */}
        <motion.p
          variants={fadeVariants}
          className="font-primary font-medium text-sm sm:text-base tracking-normal text-steward-text-secondary mb-[20px]"
        >
          Ready to Explore Steward?
        </motion.p>

        {/* Heading - Font: Newsreader (Secondary), Weight: Bold (700) */}
        <motion.h2
          variants={fadeVariants}
          className="font-secondary font-bold text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.2] text-steward-text-primary text-center max-w-[680px] mb-[28px] mx-auto"
        >
          Let's see how Steward fits your restaurant.
        </motion.h2>

        {/* Supporting Copy - Font: Inter (Primary), Size: Body (16px), Weight: Regular (400) */}
        <motion.p
          variants={fadeVariants}
          className="font-primary font-regular text-[16px] leading-[1.7] text-steward-text-secondary max-w-[640px] mb-[40px]"
        >
          Every restaurant operates differently. Book a personalized demo, and we'll walk through your workflow, understand your operations, and show how Steward can support your team.
          <br /><br />
          No pressure. Just a conversation.
        </motion.p>

        {/* CTA Button Group - refined spacing and gap */}
        <motion.div
          variants={fadeVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-[16px] sm:gap-[24px] mb-[20px] w-full sm:w-auto"
        >
          {/* Primary CTA - Prominent padding and font-semibold, Touch target >= 44px */}
          <a
            href={CONTACT_INFO.whatsappUrl}
            onClick={() => {
              trackEvent('whatsapp_click', { button_text: 'Book a Demo', destination_url: CONTACT_INFO.whatsappUrl, section_name: 'final_cta' });
            }}
            className="touch-target flex items-center justify-center w-full sm:w-auto px-[40px] py-[16px] text-base font-semibold font-primary text-white border-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas steward-interactive hover:brightness-110"
            style={{
              background: 'linear-gradient(135deg, #A0A0A0 0%, #404040 50%, #050505 100%)',
              boxShadow: '0 4px 20px rgba(160, 160, 160, 0.15)'
            }}
          >
            Book a Demo
          </a>

          {/* Secondary CTA - Balanced padding and font-medium, Touch target >= 44px */}
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            onClick={() => {
              trackEvent('email_click', { button_text: 'Contact Us', destination_url: `mailto:${CONTACT_INFO.email}`, section_name: 'final_cta' });
            }}
            className="touch-target flex items-center justify-center w-full sm:w-auto px-[36px] py-[16px] text-base font-medium font-primary border border-steward-text-primary text-steward-text-primary bg-transparent rounded-md hover:bg-steward-text-primary hover:text-steward-canvas focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas steward-interactive"
          >
            Contact Us
          </a>
        </motion.div>

        {/* Supporting Note - Subdued text below buttons */}
        <motion.p
          variants={fadeVariants}
          className="font-primary font-regular text-xs sm:text-sm text-steward-text-muted max-w-[450px]"
        >
          No commitments. No hidden costs. We'll simply understand your restaurant and answer your questions.
        </motion.p>

      </div>
    </motion.section>
  );
}
