/** A single dealer testimonial rendered as a card. */
export interface Testimonial {
  /** Quoted testimonial text, without surrounding quotation marks. */
  quote: string;
  /** Dealer's name. */
  name: string;
  /** Dealer's city/region. */
  location: string;
  /** Portrait image path. */
  image: string;
}
