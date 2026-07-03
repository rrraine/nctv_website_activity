import type { ServiceCategory } from './services.interface';

/** Card background images, reused/cycled across services that don't have dedicated art yet. */
const SERVICE_IMAGES = [
  'images/services/website-development.png',
  'images/services/social-media-management.png',
  'images/services/google-business-profile.png',
];

/** Service categories and their offerings, in tab display order. */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    label: 'FOUNDATIONAL',
    services: [
      {
        title: 'Google Business Profile Management',
        description: "Strengthen your clients' local presence and climb the Google rankings.",
        image: SERVICE_IMAGES[2],
        href: '#google-business-profile-management',
      },
      {
        title: 'Social Media Management',
        description: "Build your clients' brand voice and grow their audience across every platform.",
        image: SERVICE_IMAGES[1],
        href: '#social-media-management',
      },
      {
        title: 'Website Development',
        description: 'Modern, SEO-optimized websites that turn visitors into customers.',
        image: SERVICE_IMAGES[0],
        href: '#website-development',
      },
    ],
  },
  {
    label: 'LEAD GENERATION',
    services: [
      {
        title: 'Social Media Advertising',
        description:
          'Precision-targeted Facebook and Instagram campaigns that reach the right people at the right time.',
        image: SERVICE_IMAGES[0],
        href: '#social-media-advertising',
      },
      {
        title: 'PPC (Pay Per Click)',
        description: "Put your clients in front of high-intent buyers the moment they're searching.",
        image: SERVICE_IMAGES[1],
        href: '#ppc-pay-per-click',
      },
    ],
  },
  {
    label: 'BRANDING',
    services: [
      {
        title: 'Display Advertising',
        description: 'Stay top of mind by retargeting prospects across the apps and sites they visit every day.',
        image: SERVICE_IMAGES[2],
        href: '#display-advertising',
      },
      {
        title: 'OTT / CTV Advertising',
        description: 'Reach cord-cutters with dynamic, targeted ads on their favorite streaming platforms.',
        image: SERVICE_IMAGES[0],
        href: '#ott-ctv-advertising',
      },
      {
        title: 'Streaming Audio',
        description: 'Connect with audiences during their podcasts, playlists, and radio sessions.',
        image: SERVICE_IMAGES[1],
        href: '#streaming-audio',
      },
      {
        title: 'YouTube Advertising',
        description:
          "Build brand awareness and drive action with video ads on the world's second-largest search engine.",
        image: SERVICE_IMAGES[2],
        href: '#youtube-advertising',
      },
    ],
  },
];
