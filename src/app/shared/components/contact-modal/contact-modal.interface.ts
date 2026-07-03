/** A single action rendered in the contact modal. */
export interface ContactModalAction {
  /** Visible button label. */
  label: string;
  /** Link destination (tel:, sms:, mailto:). Omitted for a copy-to-clipboard action instead. */
  href?: string;
}
