import { motion } from 'framer-motion';
import { Compass, Navigation2 } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

const plans = [
  {
    name: 'Starter',
    description: 'For independent restaurants beginning with digital operations.',
    priceText: 'Custom pricing based on your restaurant.',
    features: [
      'QR Ordering',
      'Kitchen Display',
      'Payments',
      'Basic Daily Reports'
    ],
    ctaText: 'View Details',
    ctaLink: '#book-a-demo'
  },
  {
    name: 'Growth',
    description: 'For restaurants managing higher daily volumes.',
    priceText: 'Custom pricing based on your restaurant.',
    features: [
      'Advanced Insights',
      'Multi-device Management',
      'Operational Reporting',
      'Priority Support'
    ],
    ctaText: 'Set Course',
    ctaLink: '#book-a-demo',
    isHighlighted: true // Growth receives North/Red emphasis
  },
  {
    name: 'Enterprise',
    description: 'For multi-location restaurant groups.',
    priceText: 'Custom pricing based on your restaurant.',
    features: [
      'Multi-Branch Management',
      'Centralized Operations',
      'Advanced Reporting',
      'Dedicated Onboarding'
    ],
    ctaText: 'Contact Us',
    ctaLink: '#book-a-demo'
  }
];

export default function Pricing() {
  const sectionVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 }
    }
  };

  const gridVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 30, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring' as const, stiffness: 90, damping: 14 }
    }
  };

  return (
    <motion.section
      id="pricing"
      aria-label="Pricing"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={sectionVariants}
      className="w-full bg-steward-section section-spacing flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="container max-w-[1200px] flex flex-col items-center px-4 sm:px-6 relative z-10">
        
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-[20px]">
          <Compass className="w-4 h-4 text-steward-accent-secondary" />
          <p className="font-primary font-medium text-sm sm:text-base tracking-widest uppercase text-steward-accent-secondary">
            Navigation Plans
          </p>
        </div>

        {/* Heading */}
        <h2 className="font-secondary font-bold text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.2] text-steward-text-primary text-center max-w-[680px] mb-[28px] mx-auto">
          Scale your restaurant with precision.
        </h2>

        {/* Supporting Copy */}
        <p className="font-primary font-regular text-[16px] leading-[1.7] text-steward-text-secondary text-center max-w-[640px] mb-[64px]">
          Every restaurant is different. We'll recommend the right Steward setup based on your operations, team size, and number of locations. No hidden costs. No unnecessary modules.
        </p>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={gridVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-[24px] lg:gap-[32px] w-full items-stretch"
        >
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              tabIndex={0}
              className={`group bg-steward-surface rounded-xl px-[24px] py-[32px] sm:px-[32px] sm:py-[48px] flex flex-col justify-between border ${plan.isHighlighted ? 'border-steward-accent/50 shadow-md' : 'border-steward-border shadow-sm'} hover:border-steward-accent transition-all duration-300 relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-accent focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas`}
            >
              {/* Highlight Background VFX */}
              {plan.isHighlighted && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-steward-accent to-steward-accent-secondary opacity-80" />
              )}
              
              <div className="relative z-10">
                {/* Plan Name */}
                <h3 className="font-secondary font-bold text-2xl text-steward-text-primary mb-[16px] flex items-center gap-2">
                  {plan.isHighlighted && <Navigation2 className="w-5 h-5 text-steward-accent" />}
                  {plan.name}
                </h3>

                {/* Plan Description */}
                <p className="font-primary font-regular text-sm text-steward-text-secondary mb-[32px]">
                  {plan.description}
                </p>

                {/* Plan Pricing Note */}
                <div className="font-primary font-semibold text-[15px] text-steward-text-primary tracking-tight mb-[32px] pt-[16px] border-t border-steward-border/50">
                  {plan.priceText}
                </div>

                {/* Features List */}
                <ul className="space-y-[20px] mb-[48px]">
                  {plan.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="font-primary font-regular text-sm text-steward-text-secondary flex items-start space-x-3"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${plan.isHighlighted ? 'bg-steward-accent' : 'bg-steward-accent-secondary'}`} aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <a
                href={plan.ctaLink}
                onClick={() => trackEvent('pricing_plan_selected', { plan_name: plan.name, button_text: plan.ctaText })}
                className={`touch-target flex items-center justify-center w-full px-[36px] py-[16px] text-base font-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas transition-all duration-200 relative z-10 ${
                  plan.isHighlighted
                    ? 'font-semibold text-white rounded-lg hover:brightness-110'
                    : 'font-medium border border-steward-border text-steward-text-primary bg-steward-canvas rounded-lg hover:border-steward-accent-secondary hover:text-steward-accent-secondary shadow-sm'
                }`}
                style={plan.isHighlighted ? {
                  background: 'linear-gradient(135deg, #A0A0A0 0%, #404040 50%, #050505 100%)',
                  boxShadow: '0 4px 20px rgba(160, 160, 160, 0.15)',
                } : undefined}
              >
                {plan.ctaText}
              </a>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}
