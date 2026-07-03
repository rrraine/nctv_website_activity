import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  effect,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Button } from '@ntv360/component-pantry';

import { ServiceCard } from '../service-card/service-card';
import type { Service } from '../services.interface';

@Component({
  selector: 'app-service-carousel',
  imports: [ServiceCard, Button],
  templateUrl: './service-carousel.html',
  styleUrl: './service-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCarousel implements AfterViewInit, OnDestroy {
  /** Services rendered as cards, in display order. */
  public readonly services = input.required<Service[]>();

  /** Services array duplicated so the track can loop seamlessly. */
  protected readonly loopedServices = computed(() => [...this.services(), ...this.services()]);
  /** Whether autoplay is temporarily paused (hover, keyboard focus, or manual nav). */
  protected readonly isPaused = signal(false);

  private readonly track = viewChild.required<ElementRef<HTMLDivElement>>('track');
  private animationFrameId: number | null = null;
  private resumeTimeoutId: ReturnType<typeof setTimeout> | null = null;

  /** Resets scroll position whenever the services list changes, e.g. on category tab switch. */
  private readonly resetScrollOnServicesChange = effect(() => {
    this.services();
    this.track().nativeElement.scrollLeft = 0;
  });

  /**
   * @description Starts the autoplay scroll loop once the track is rendered, unless the user prefers reduced motion.
   */
  public ngAfterViewInit(): void {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.runAutoScroll();
    }
  }

  /**
   * @description Cancels any pending animation frame or resume timer.
   */
  public ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resumeTimeoutId !== null) {
      clearTimeout(this.resumeTimeoutId);
    }
  }

  /**
   * @description Pauses autoplay while the pointer or keyboard focus is inside the carousel.
   */
  protected onInteractionStart(): void {
    this.isPaused.set(true);
  }

  /**
   * @description Resumes autoplay once the pointer or keyboard focus leaves the carousel.
   */
  protected onInteractionEnd(): void {
    this.isPaused.set(false);
  }

  /**
   * @description Scrolls the track roughly one card-width in the given direction and briefly pauses autoplay.
   * @param direction -1 to scroll toward earlier cards, 1 to scroll toward later cards.
   */
  protected scrollByCard(direction: -1 | 1): void {
    this.track().nativeElement.scrollBy({ left: direction * 522, behavior: 'smooth' });
    this.pauseTemporarily();
  }

  /**
   * @description Pauses autoplay and schedules it to resume after a short delay.
   */
  private pauseTemporarily(): void {
    this.isPaused.set(true);
    if (this.resumeTimeoutId !== null) {
      clearTimeout(this.resumeTimeoutId);
    }
    this.resumeTimeoutId = setTimeout(() => this.isPaused.set(false), 2500);
  }

  /**
   * @description Advances scrollLeft by a small amount each frame, wrapping back to the start of the loop once the first copy of the track has scrolled past.
   */
  private runAutoScroll(): void {
    const element = this.track().nativeElement;

    const step = (): void => {
      if (!this.isPaused()) {
        const halfWidth = element.scrollWidth / 2;
        element.scrollLeft += 0.5;

        if (element.scrollLeft >= halfWidth) {
          element.scrollLeft -= halfWidth;
        }
      }
      this.animationFrameId = requestAnimationFrame(step);
    };

    this.animationFrameId = requestAnimationFrame(step);
  }
}
