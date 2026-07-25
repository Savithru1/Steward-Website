import { motion } from 'framer-motion';
import { ArrowRight, Calculator, BarChart3 } from 'lucide-react';
import SEOHead from '@/seo/SEOHead';
import { CONTACT_INFO } from '@/config/contact';
import { trackEvent } from '@/lib/analytics';

const RESOURCES = [
  {
    title: 'The End of the POS: Why 60% of Restaurants are Moving to Unified Systems',
    description: 'An original data report analyzing the shift from fragmented point-of-sale setups to complete operating systems in high-volume venues.',
    category: 'Data Report',
    icon: <BarChart3 className="w-5 h-5" />,
    href: '/resources/end-of-pos-report',
    date: 'July 2026'
  },
  {
    title: 'True Food Cost & Margin Calculator',
    description: 'Stop guessing your margins. Input your recipe costs and see your real profit margins instantly with our free operational tool.',
    category: 'Free Tool',
    icon: <Calculator className="w-5 h-5" />,
    href: '/resources/food-cost-calculator',
    date: 'Updated Monthly'
  }
];

export default function ResourcesPage() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.15, 0.85, 0.35, 1] as const }
    }
  };

  return (
    <>
      <SEOHead path="/resources" />
      <main className="min-h-screen bg-steward-canvas pt-[140px] md:pt-[180px] pb-0">
        
        {/* Hero Section */}
        <section aria-label="Resources Hero" className="container max-w-[900px] text-center mb-16 md:mb-24 px-4 sm:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col items-center"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeVariants} className="flex items-center justify-center gap-3 mb-[24px]">
              <div className="w-10 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #FFFFFF)' }} />
              <p className="font-primary font-medium text-xs sm:text-sm tracking-[0.25em] uppercase text-steward-text-primary">
                Steward Journal
              </p>
              <div className="w-10 h-[1px]" style={{ background: 'linear-gradient(90deg, #FFFFFF, transparent)' }} />
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeVariants}
              className="font-secondary font-bold text-[40px] sm:text-[56px] lg:text-[68px] leading-[1.1] text-steward-text-primary text-center max-w-[800px] mx-auto mb-[24px]"
            >
              Resources & Insights
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeVariants}
              className="font-primary font-regular text-[16px] sm:text-[18px] leading-[1.7] text-steward-text-secondary text-center max-w-[620px] mx-auto mb-[48px]"
            >
              Data reports, operational guides, and free tools built for high-volume restaurant operators.
            </motion.p>

            {/* Subtle Divider */}
            <motion.div
              variants={fadeVariants}
              className="w-full max-w-[800px] h-[1px] bg-steward-border origin-center"
            />
          </motion.div>
        </section>

        {/* Resources Cards Section */}
        <section aria-label="Resources Directory" className="container max-w-[1200px] px-4 sm:px-6 mb-24 md:mb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[32px] w-full"
          >
            {RESOURCES.map((resource) => (
              <motion.a
                key={resource.title}
                href={resource.href}
                onClick={() => trackEvent('article_click', { button_text: resource.title, destination_url: resource.href, section_name: 'resources' })}
                variants={fadeVariants}
                className="group flex flex-col bg-steward-surface border border-steward-border rounded-xl p-[32px] sm:p-[48px] relative overflow-hidden transition-all duration-300 hover:border-steward-border/80 hover:bg-steward-hover hover:shadow-steward-md focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-accent focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas"
              >
                {/* Subtle Hover Glow - Muted Amber/Gold Luxury Accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-2xl pointer-events-none bg-steward-accent" />

                {/* Card Top: Icon & Metadata */}
                <div className="flex items-center justify-between w-full mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-steward-section flex items-center justify-center text-steward-text-secondary border border-steward-border group-hover:text-steward-accent group-hover:border-steward-accent/30 transition-colors">
                      {resource.icon}
                    </div>
                    <span className="font-primary font-semibold text-[10px] tracking-widest text-steward-text-secondary bg-steward-section px-3 py-1.5 rounded-sm border border-steward-border uppercase">
                      {resource.category}
                    </span>
                  </div>
                  <span className="font-primary text-xs text-steward-text-muted">
                    {resource.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-secondary font-bold text-2xl sm:text-3xl text-steward-text-primary mb-4 leading-snug group-hover:text-white transition-colors">
                  {resource.title}
                </h3>

                {/* Description */}
                <p className="font-primary font-regular text-[15px] sm:text-base leading-relaxed text-steward-text-secondary mb-10 flex-grow">
                  {resource.description}
                </p>

                {/* Call To Action */}
                <div className="flex items-center gap-2 font-primary font-semibold text-sm text-steward-text-primary border-b border-steward-text-primary/20 pb-0.5 group-hover:border-steward-text-primary group-hover:text-white transition-all mt-auto self-start">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </section>

        {/* Centered CTA Section before Footer */}
        <section aria-label="Explore Steward CTA" className="w-full bg-steward-canvas py-24 md:py-32 border-t border-steward-border flex items-center justify-center relative overflow-hidden">
          {/* Compass decorative subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-steward-accent/[0.02] rounded-full blur-[100px] pointer-events-none" />

          <div className="container max-w-[800px] flex flex-col items-center px-4 sm:px-6 text-center relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.15, 0.85, 0.35, 1] }}
              className="font-primary font-medium text-sm sm:text-base tracking-normal text-steward-text-secondary mb-[20px]"
            >
              Ready to Explore Steward?
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.15, 0.85, 0.35, 1], delay: 0.1 }}
              className="font-secondary font-bold text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.2] text-steward-text-primary text-center max-w-[680px] mb-[28px] mx-auto"
            >
              Let's see how Steward fits your restaurant.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.15, 0.85, 0.35, 1], delay: 0.2 }}
              className="font-primary font-regular text-[16px] leading-[1.7] text-steward-text-secondary max-w-[640px] mb-[40px]"
            >
              Every restaurant operates differently. Book a personalized demo, and we'll walk through your workflow, understand your operations, and show how Steward can support your team.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.15, 0.85, 0.35, 1], delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-[16px] sm:gap-[24px] mb-[20px] w-full sm:w-auto"
            >
              {/* Primary CTA */}
              <a
                href={CONTACT_INFO.whatsappUrl}
                className="touch-target flex items-center justify-center w-full sm:w-auto px-[40px] py-[16px] text-base font-semibold font-primary text-white border-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas steward-interactive hover:brightness-110"
                style={{
                  background: 'linear-gradient(135deg, #A0A0A0 0%, #404040 50%, #050505 100%)',
                  boxShadow: '0 4px 20px rgba(160, 160, 160, 0.15)'
                }}
              >
                Book a Demo
              </a>

              {/* Secondary CTA */}
              <a
                href="/"
                className="touch-target flex items-center justify-center w-full sm:w-auto px-[36px] py-[16px] text-base font-medium font-primary border border-steward-text-primary text-steward-text-primary bg-transparent rounded-md hover:bg-steward-text-primary hover:text-steward-canvas focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas steward-interactive"
              >
                Explore Steward
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.15, 0.85, 0.35, 1], delay: 0.4 }}
              className="font-primary font-regular text-xs sm:text-sm text-steward-text-muted max-w-[450px]"
            >
              No commitments. No hidden costs. Join our early restaurant partners.
            </motion.p>
          </div>
        </section>

      </main>
    </>
  );
}
