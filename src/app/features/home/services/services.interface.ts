/** A single service offering rendered as a carousel card. */
export interface Service {
  /** Service name. */
  title: string;
  /** One-line description of the service. */
  description: string;
  /** Background image path for the card. */
  image: string;
  /** Destination for the card's "Learn More" link. */
  href: string;
}

/** A tab of services grouped under one offering category. */
export interface ServiceCategory {
  /** Uppercase label rendered in the tab. */
  label: string;
  /** Services shown in this category's carousel. */
  services: Service[];
}
