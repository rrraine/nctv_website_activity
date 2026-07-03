import type { FooterLink, SocialLink } from './footer.interface';

/** Company navigation links, in display order. */
export const COMPANY_LINKS: FooterLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Podcast', href: '#podcast' },
  { label: 'Contact', href: '#contact' },
];

/** Social platform links, in display order. */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100093532635123',
    icon: 'icon-facebook',
  },
  {
    label: 'Instagram',
    href: 'http://instagram.com/ncompasstv/',
    icon: 'icon-instagram',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/n-compass-tv/',
    icon: 'icon-linkedin',
  },
];
