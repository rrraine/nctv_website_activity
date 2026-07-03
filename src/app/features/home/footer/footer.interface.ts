/** A single footer navigation link. */
export interface FooterLink {
  /** Visible link text. */
  label: string;
  /** Fragment or route the link points to. */
  href: string;
}

/** A single social platform link. */
export interface SocialLink {
  /** Platform name, used for the accessible label. */
  label: string;
  /** Profile URL. */
  href: string;
  /** Icon sprite symbol id. */
  icon: string;
}
