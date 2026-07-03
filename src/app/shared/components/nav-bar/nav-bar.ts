import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, input, linkedSignal, signal, viewChild } from '@angular/core';

import { NAV_LINKS } from './nav-bar.constants';
import type { NavLink } from './nav-bar.interface';

@Component({
  selector: 'app-nav-bar',
  imports: [NgOptimizedImage],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBar {
  /** Href of the nav link that represents the currently viewed section. */
  public readonly activeHref = input('#home');

  /** Primary navigation links. */
  protected readonly navLinks: NavLink[] = NAV_LINKS;
  /** Href of the link currently highlighted as active; resets whenever activeHref() changes. */
  protected readonly currentHref = linkedSignal(() => this.activeHref());
  /** Whether the mobile navigation panel is open. */
  protected readonly isMenuOpen = signal(false);

  private readonly menuToggle = viewChild<ElementRef<HTMLButtonElement>>('menuToggle');

  /**
   * @description Determines whether the given link matches the active section.
   * @param link Navigation link to check.
   */
  protected isActive(link: NavLink): boolean {
    return link.href === this.currentHref();
  }

  /**
   * @description Marks the given link as active and closes the mobile navigation panel.
   * @param link Navigation link that was activated.
   */
  protected onLinkClick(link: NavLink): void {
    this.currentHref.set(link.href);
    this.isMenuOpen.set(false);
  }

  /**
   * @description Toggles the mobile navigation panel open or closed.
   */
  protected toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  /**
   * @description Closes the mobile navigation panel and returns focus to the toggle button.
   */
  protected closeMenu(): void {
    this.isMenuOpen.set(false);
    this.menuToggle()?.nativeElement.focus();
  }
}
