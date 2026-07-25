import { CONTACT_INFO } from '../../config/contact';
import stewardLogo from '../../assets/logos/Steward_Logo.png';
import { trackEvent } from '../../lib/analytics';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleFooterLinkClick = (text: string, href: string) => {
    trackEvent('footer_link_click', { button_text: text, destination_url: href, section_name: 'footer' });
  };

  const handleWhatsAppClick = (text: string, href: string) => {
    trackEvent('whatsapp_click', { button_text: text, destination_url: href, section_name: 'footer' });
  };

  const handleEmailClick = (text: string, href: string) => {
    trackEvent('email_click', { button_text: text, destination_url: href, section_name: 'footer' });
  };

  const handleSocialClick = (text: string, href: string) => {
    trackEvent('social_link_click', { button_text: text, destination_url: href, section_name: 'footer' });
  };

  return (
    <footer className="w-full bg-steward-canvas border-t border-steward-border pt-[120px] pb-[64px]" aria-label="Site Footer">
      <div className="container max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Main Grid: 5 Columns on Desktop, Stack on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-[48px] lg:gap-[32px] mb-[120px]">
          
          {/* Column 1: Brand Info (Spans 2 columns on large screens for layout balance) */}
          <div className="lg:col-span-2 max-w-[320px]">
            {/* Logo */}
            <a href="/#hero" className="flex items-center mb-[16px] inline-flex">
              <img src={stewardLogo} alt="Steward" className="h-8 w-auto object-contain" />
            </a>
            <p className="font-primary font-regular text-sm text-steward-text-secondary leading-[1.6]">
              Steward is a restaurant operating system designed to bring clarity to everyday operations through one connected platform.
            </p>
          </div>

          {/* Column 2: Product Links */}
          <nav aria-label="Product Navigation">
            <span className="font-primary font-semibold text-xs text-steward-text-primary uppercase tracking-wider block mb-[20px]">
              Product
            </span>
            <ul className="space-y-[12px]">
              <li>
                <a href="/#product" onClick={() => handleFooterLinkClick('Product', '/#product')} className="touch-target font-primary font-regular text-sm text-steward-text-secondary hover:text-steward-text-primary hover:underline underline-offset-4 decoration-1 decoration-steward-accent transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas rounded-md">
                  Product
                </a>
              </li>
              <li>
                <a href="/#features" onClick={() => handleFooterLinkClick('Features', '/#features')} className="touch-target font-primary font-regular text-sm text-steward-text-secondary hover:text-steward-text-primary hover:underline underline-offset-4 decoration-1 decoration-steward-accent transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas rounded-md">
                  Features
                </a>
              </li>
              <li>
                <a href="/#pricing" onClick={() => handleFooterLinkClick('Pricing', '/#pricing')} className="touch-target font-primary font-regular text-sm text-steward-text-secondary hover:text-steward-text-primary hover:underline underline-offset-4 decoration-1 decoration-steward-accent transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas rounded-md">
                  Pricing
                </a>
              </li>
              <li>
                <a href={CONTACT_INFO.whatsappUrl} onClick={() => { handleFooterLinkClick('Book a Demo', CONTACT_INFO.whatsappUrl); handleWhatsAppClick('Book a Demo', CONTACT_INFO.whatsappUrl); }} className="touch-target font-primary font-regular text-sm text-steward-text-secondary hover:text-steward-text-primary hover:underline underline-offset-4 decoration-1 decoration-steward-accent transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas rounded-md">
                  Book a Demo
                </a>
              </li>
            </ul>
          </nav>

          {/* Column 3: Company Links */}
          <nav aria-label="Company Navigation">
            <span className="font-primary font-semibold text-xs text-steward-text-primary uppercase tracking-wider block mb-[20px]">
              Company
            </span>
            <ul className="space-y-[12px]">
              <li>
                <a href="/#about" onClick={() => handleFooterLinkClick('About', '/#about')} className="touch-target font-primary font-regular text-sm text-steward-text-secondary hover:text-steward-text-primary hover:underline underline-offset-4 decoration-1 decoration-steward-accent transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas rounded-md">
                  About
                </a>
              </li>
              <li>
                <a href="/#early-partners" onClick={() => handleFooterLinkClick('Early Partners', '/#early-partners')} className="touch-target font-primary font-regular text-sm text-steward-text-secondary hover:text-steward-text-primary hover:underline underline-offset-4 decoration-1 decoration-steward-accent transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas rounded-md">
                  Early Partners
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} onClick={() => { handleFooterLinkClick('Contact', `mailto:${CONTACT_INFO.email}`); handleEmailClick('Contact', `mailto:${CONTACT_INFO.email}`); }} className="touch-target font-primary font-regular text-sm text-steward-text-secondary hover:text-steward-text-primary hover:underline underline-offset-4 decoration-1 decoration-steward-accent transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas rounded-md">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Column 4: Resources & Legal */}
          <nav aria-label="Resources Navigation">
            <span className="font-primary font-semibold text-xs text-steward-text-primary uppercase tracking-wider block mb-[20px]">
              Resources
            </span>
            <ul className="space-y-[12px]">
              <li>
                <a href="/resources" onClick={() => handleFooterLinkClick('All Resources', '/resources')} className="touch-target font-primary font-regular text-sm text-steward-text-secondary hover:text-steward-text-primary hover:underline underline-offset-4 decoration-1 decoration-steward-accent transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas rounded-md">
                  All Resources
                </a>
              </li>
              <li>
                <a href="/resources/end-of-pos-report" onClick={() => handleFooterLinkClick('End of POS Report', '/resources/end-of-pos-report')} className="touch-target font-primary font-regular text-sm text-steward-text-secondary hover:text-steward-text-primary hover:underline underline-offset-4 decoration-1 decoration-steward-accent transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas rounded-md">
                  End of POS Report
                </a>
              </li>
              <li>
                <a href="/resources/food-cost-calculator" onClick={() => handleFooterLinkClick('Food Cost Calculator', '/resources/food-cost-calculator')} className="touch-target font-primary font-regular text-sm text-steward-text-secondary hover:text-steward-text-primary hover:underline underline-offset-4 decoration-1 decoration-steward-accent transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas rounded-md">
                  Food Cost Calculator
                </a>
              </li>
              <li>
                <a href="/#faq" onClick={() => handleFooterLinkClick('Frequently Asked Questions', '/#faq')} className="touch-target font-primary font-regular text-sm text-steward-text-secondary hover:text-steward-text-primary hover:underline underline-offset-4 decoration-1 decoration-steward-accent transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas rounded-md">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="/privacy" onClick={() => handleFooterLinkClick('Privacy Policy', '/privacy')} className="touch-target font-primary font-regular text-sm text-steward-text-secondary hover:text-steward-text-primary hover:underline underline-offset-4 decoration-1 decoration-steward-accent transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas rounded-md">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" onClick={() => handleFooterLinkClick('Terms of Service', '/terms')} className="touch-target font-primary font-regular text-sm text-steward-text-secondary hover:text-steward-text-primary hover:underline underline-offset-4 decoration-1 decoration-steward-accent transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas rounded-md">
                  Terms of Service
                </a>
              </li>
            </ul>
          </nav>

        </div>

        {/* Contact Info Row */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between border-t border-steward-border py-[24px] gap-[16px]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-[16px] sm:gap-[32px] flex-wrap">
            <span className="font-primary text-sm text-steward-text-secondary font-regular">
              Email:{' '}
              <a href={`mailto:${CONTACT_INFO.email}`} onClick={() => handleEmailClick('Email Link', `mailto:${CONTACT_INFO.email}`)} className="text-steward-text-primary hover:underline underline-offset-4 decoration-1 decoration-steward-accent font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas rounded-md">
                {CONTACT_INFO.email}
              </a>
            </span>
            <span className="font-primary text-sm text-steward-text-secondary font-regular">
              Phone:{' '}
              <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="text-steward-text-primary hover:underline underline-offset-4 decoration-1 decoration-steward-accent font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas rounded-md">
                {CONTACT_INFO.phone}
              </a>
            </span>
            <span className="font-primary text-sm text-steward-text-secondary font-regular">
              WhatsApp:{' '}
              <a href={CONTACT_INFO.whatsappUrl} onClick={() => handleWhatsAppClick('WhatsApp Link', CONTACT_INFO.whatsappUrl)} className="text-steward-text-primary hover:underline underline-offset-4 decoration-1 decoration-steward-accent font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-steward-focus focus-visible:ring-offset-2 focus-visible:ring-offset-steward-canvas rounded-md">
                Message Us
              </a>
            </span>
            <span className="font-primary text-sm text-steward-text-secondary font-regular">
              Location: <span className="text-steward-text-primary font-medium">{CONTACT_INFO.location}</span>
            </span>
          </div>
          <span className="font-primary text-xs text-steward-text-muted font-regular">
            Version {CONTACT_INFO.version}
          </span>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-steward-border pt-[24px] flex flex-col sm:flex-row items-center justify-between gap-[12px]">
          <span className="font-primary text-xs text-steward-text-secondary font-regular">
            &copy; {currentYear} Steward.
          </span>
          <span className="font-primary text-xs text-steward-text-muted font-regular flex flex-col sm:flex-row items-center sm:gap-3 gap-1 text-center sm:text-right">
            <span>Built thoughtfully for restaurants.</span>
            <span className="hidden sm:inline text-steward-text-muted/40">•</span>
            <span>
              Built by{' '}
              <a 
                href="https://craftyoursystems.in" 
                onClick={() => handleSocialClick('CraftYourSystems', 'https://craftyoursystems.in')}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-medium text-steward-text-secondary hover:text-steward-text-primary transition-colors duration-200"
              >
                CraftYourSystems
              </a>
            </span>
          </span>
        </div>

      </div>
    </footer>
  );
}
