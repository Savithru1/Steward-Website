import { motion } from 'framer-motion';
import { QrCode, Monitor, CreditCard, BarChart3, BellRing, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../lib/analytics';

const features = [
  {
    icon: <QrCode className="w-6 h-6" />,
    title: 'QR Ordering',
    description: 'Precision-engineered digital menus that let your customers order directly from their table.',
    type: 'south', // Blue accent
    link: '/menu'
  },
  {
    icon: <Monitor className="w-6 h-6" />,
    title: 'Kitchen Display (KDS)',
    description: 'Synchronized kitchen routing that eliminates paper tickets and reduces prep errors.',
    type: 'south',
    link: '/kitchen-board'
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Integrated Payments',
    description: 'Seamless checkout experiences directly at the table or counter.',
    type: 'south',
    link: '/finance'
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Daily Insights',
    description: 'Deep operational analytics that point you to the most profitable decisions.',
    type: 'north', // Red accent
    link: '/live-ops'
  },
  {
    icon: <BellRing className="w-6 h-6" />,
    title: 'Needle Briefings',
    description: 'Proactive morning briefings that ensure you start the day with clarity.',
    type: 'north',
    link: '/needle'
  },
  {
    icon: <Settings2 className="w-6 h-6" />,
    title: 'Central Control',
    description: 'Manage menus, staff, and settings across multiple locations from one dashboard.',
    type: 'north',
    link: '/settings'
  }
];

export default function Features() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 25, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.section
      id="features"
      aria-label="Product Features"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={containerVariants}
      className="w-full bg-steward-canvas section-spacing flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="container max-w-[1200px] flex flex-col items-center px-4 sm:px-6 relative z-10">
        
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-[20px]">
          <Settings2 className="w-4 h-4 text-steward-accent" />
          <p className="font-primary font-medium text-sm sm:text-base tracking-widest uppercase text-steward-accent">
            Core Features
          </p>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          className="font-secondary font-bold text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.2] text-steward-text-primary text-center max-w-[700px] mb-[28px] mx-auto"
        >
          Everything required to navigate service.
        </motion.h2>

        {/* Supporting Copy */}
        <motion.p
          variants={itemVariants}
          className="font-primary font-regular text-[16px] leading-[1.7] text-steward-text-secondary text-center max-w-[650px] mb-[64px]"
        >
          Steward is built with the precise tools you need to run a modern restaurant, all accessible from a single, unified dashboard.
        </motion.p>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full"
        >
          {features.map((feature, idx) => {
            const isNorth = feature.type === 'north';
            return (
              <motion.div key={idx} variants={itemVariants} className="h-full w-full block">
                <Link 
                  to={feature.link} 
                  onClick={() => trackEvent('feature_card_click', { feature_name: feature.title, destination_url: feature.link })}
                  className="block w-full h-full"
                >
                  <div className="group relative h-full bg-steward-surface border border-steward-border rounded-xl p-[32px] overflow-hidden hover:border-steward-border/80 hover:shadow-steward-md transition-all duration-300 flex flex-col items-start cursor-pointer">
                    {/* Hover Glow Effect */}
                    <div 
                      className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl pointer-events-none ${isNorth ? 'bg-steward-accent' : 'bg-steward-accent-secondary'}`} 
                    />

                    {/* Icon Container */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 shadow-sm border ${isNorth ? 'bg-steward-accent/10 border-steward-accent/20 text-steward-accent' : 'bg-steward-accent-secondary/10 border-steward-accent-secondary/20 text-steward-accent-secondary'}`}>
                      {feature.icon}
                    </div>

                    {/* Content */}
                    <h3 className="font-secondary font-bold text-xl text-steward-text-primary mb-3">
                      {feature.title}
                    </h3>
                    <p className="font-primary font-regular text-sm text-steward-text-secondary leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Bottom decorative line */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500" style={{ background: 'linear-gradient(90deg, #A0A0A0 0%, #404040 50%, #050505 100%)' }} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </motion.section>
  );
}
