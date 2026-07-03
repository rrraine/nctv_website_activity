import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Button } from '@ntv360/component-pantry';

import { ContactModal } from '../../../shared/components/contact-modal/contact-modal';
import type { ContactModalAction } from '../../../shared/components/contact-modal/contact-modal.interface';
import { ScrollReveal } from '../../../shared/directives/scroll-reveal/scroll-reveal';

import { COMPANY_LINKS, SOCIAL_LINKS } from './footer.constants';
import type { FooterLink, SocialLink } from './footer.interface';

const ADDRESS = '1546 Cole Blvd Bldg 5, Suite 100 Lakewood, CO 80401';
const PHONE_DISPLAY = '(720) 763-9094';
const PHONE_TEL_HREF = 'tel:+17207639094';
const PHONE_SMS_HREF = 'sms:+17207639094';
const EMAIL_DISPLAY = 'info@n-compass.biz';
const EMAIL_HREF = `mailto:${EMAIL_DISPLAY}`;

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, Button, ContactModal, ScrollReveal],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  /** Company navigation links. */
  protected readonly companyLinks: FooterLink[] = COMPANY_LINKS;
  /** Social platform links. */
  protected readonly socialLinks: SocialLink[] = SOCIAL_LINKS;

  /** Displayed office address. */
  protected readonly addressDisplay = ADDRESS;
  /** Displayed phone number. */
  protected readonly phoneDisplay = PHONE_DISPLAY;
  /** Displayed email address. */
  protected readonly emailDisplay = EMAIL_DISPLAY;
  /** Google Maps search URL for the office address. */
  protected readonly mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

  /** Actions offered in the phone modal. */
  protected readonly phoneActions: ContactModalAction[] = [
    { label: 'Call', href: PHONE_TEL_HREF },
    { label: 'Message', href: PHONE_SMS_HREF },
  ];
  /** Actions offered in the email modal. */
  protected readonly emailActions: ContactModalAction[] = [
    { label: 'Send Email', href: EMAIL_HREF },
    { label: 'Copy Email' },
  ];

  /** Whether the phone contact modal is open. */
  protected readonly isPhoneModalOpen = signal(false);
  /** Whether the email contact modal is open. */
  protected readonly isEmailModalOpen = signal(false);

  /** Element that triggered the currently open modal, refocused when it closes. */
  private lastFocusedTrigger: HTMLElement | null = null;

  /**
   * @description Opens the phone contact modal, remembering the trigger element to refocus on close.
   */
  protected openPhoneModal(): void {
    this.lastFocusedTrigger = document.activeElement as HTMLElement;
    this.isPhoneModalOpen.set(true);
  }

  /**
   * @description Closes the phone contact modal and returns focus to its trigger element.
   */
  protected closePhoneModal(): void {
    this.isPhoneModalOpen.set(false);
    this.lastFocusedTrigger?.focus();
  }

  /**
   * @description Opens the email contact modal, remembering the trigger element to refocus on close.
   */
  protected openEmailModal(): void {
    this.lastFocusedTrigger = document.activeElement as HTMLElement;
    this.isEmailModalOpen.set(true);
  }

  /**
   * @description Closes the email contact modal and returns focus to its trigger element.
   */
  protected closeEmailModal(): void {
    this.isEmailModalOpen.set(false);
    this.lastFocusedTrigger?.focus();
  }
}
