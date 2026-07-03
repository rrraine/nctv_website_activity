import { ChangeDetectionStrategy, Component, ElementRef, effect, input, output, signal, viewChild } from '@angular/core';
import { Modal } from '@ntv360/component-pantry';

import type { ContactModalAction } from './contact-modal.interface';

@Component({
  selector: 'app-contact-modal',
  imports: [Modal],
  templateUrl: './contact-modal.html',
  styleUrl: './contact-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactModal {
  /** Whether the modal is currently open. */
  public readonly isOpen = input.required<boolean>();
  /** Modal header title, e.g. "Email Us". */
  public readonly title = input.required<string>();
  /** Value displayed prominently, e.g. the email address or phone number. */
  public readonly value = input.required<string>();
  /** Actions rendered as buttons/links below the value. */
  public readonly actions = input.required<ContactModalAction[]>();

  /** Emits when the modal is dismissed via the close button, backdrop, or Escape. */
  public readonly closed = output<void>();

  /** Whether the value was just copied, shown as brief inline feedback. */
  protected readonly copied = signal(false);

  private readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');

  // ntv-modal only moves focus into the dialog on initial render, not when opened
  // later via user interaction, so keyboard/screen-reader users are stuck on the
  // now-obscured trigger button unless we do it ourselves.
  private readonly focusOnOpen = effect(() => {
    if (this.isOpen()) {
      setTimeout(() => this.closeButton()?.nativeElement.focus());
    }
  });

  /**
   * @description Copies the displayed value to the clipboard and shows brief confirmation feedback.
   */
  protected async onCopy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.value());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // Clipboard access can be denied by browser permissions/policy; the button
      // simply won't show "Copied!" confirmation, which is honest feedback.
    }
  }
}
