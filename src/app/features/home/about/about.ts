import { NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { Button } from '@ntv360/component-pantry';

import { SectionTag } from '../../../shared/components/section-tag/section-tag';
import { YoutubeEmbed } from '../../../shared/components/youtube-embed/youtube-embed';
import { ScrollReveal } from '../../../shared/directives/scroll-reveal/scroll-reveal';

import { ABOUT_STATS } from './about.constants';
import type { AboutStat } from './about.interface';

const COUNT_UP_DURATION_MS = 700;
// Counting from a value close to the target (instead of always from 0) reads as
// a quick, natural tick-up rather than a long dramatic reveal.
const COUNT_UP_START_RATIO = 0.72;

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, Button, SectionTag, YoutubeEmbed, ScrollReveal],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About implements AfterViewInit, OnDestroy {
  /** Emits when the user activates either "Learn More" call to action. */
  public readonly learnMoreClick = output<void>();

  /** Company highlight statistics. */
  protected readonly stats: AboutStat[] = ABOUT_STATS;
  /** Current animated value for each stat, in the same order as stats(). */
  protected readonly displayedValues = signal<number[]>(ABOUT_STATS.map(() => 0));

  private readonly statsList = viewChild<ElementRef<HTMLElement>>('statsList');
  private observer?: IntersectionObserver;
  private hasAnimated = false;

  /**
   * @description Watches the stats list and starts the count-up animation the first time it scrolls into view.
   */
  public ngAfterViewInit(): void {
    const element = this.statsList()?.nativeElement;
    if (!element) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateStats();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    this.observer.observe(element);
  }

  /**
   * @description Disconnects the intersection observer.
   */
  public ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  /**
   * @description Forwards a "Learn More" activation to the learnMoreClick output.
   */
  protected onLearnMore(): void {
    this.learnMoreClick.emit();
  }

  /**
   * @description Animates each stat's displayed value up to its target from a starting point close to it (a quick natural tick-up, not a long 0-to-N reveal), or jumps straight to the final values for users who prefer reduced motion.
   */
  private animateStats(): void {
    const targets = this.stats.map((stat) => stat.value);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.displayedValues.set(targets);
      return;
    }

    const startValues = targets.map((target) => Math.round(target * COUNT_UP_START_RATIO));
    const start = performance.now();
    const step = (now: number): void => {
      const progress = Math.min((now - start) / COUNT_UP_DURATION_MS, 1);
      const eased = 1 - (1 - progress) ** 3;
      this.displayedValues.set(
        targets.map((target, i) => Math.round(startValues[i] + (target - startValues[i]) * eased)),
      );

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }
}
