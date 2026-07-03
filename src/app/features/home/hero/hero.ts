import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, output, signal } from '@angular/core';
import { Button } from '@ntv360/component-pantry';

const HEADING_LINE_1 = 'COMMUNITY FOCUSED';
const HEADING_LINE_2 = 'INDOOR DIGITAL BILLBOARDS';
const TYPEWRITER_CHAR_DELAY_MS = 85;

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, Button],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero implements OnInit, OnDestroy {
  /** Emits when the user activates the "Learn More" call to action. */
  public readonly learnMoreClick = output<void>();

  /** Characters of the first heading line typed out so far. */
  protected readonly typedLine1 = signal('');
  /** Characters of the second heading line typed out so far. */
  protected readonly typedLine2 = signal('');

  private isDestroyed = false;

  /**
   * @description Starts the typewriter effect, or shows the full heading immediately for users who prefer reduced motion.
   */
  public ngOnInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.typedLine1.set(HEADING_LINE_1);
      this.typedLine2.set(HEADING_LINE_2);
      return;
    }
    void this.runTypewriter();
  }

  /**
   * @description Stops the typewriter effect from writing to signals after the component is gone.
   */
  public ngOnDestroy(): void {
    this.isDestroyed = true;
  }

  /**
   * @description Forwards the primary call-to-action click to the learnMoreClick output.
   */
  protected onLearnMore(): void {
    this.learnMoreClick.emit();
  }

  /**
   * @description Types the heading out one character at a time, first line then second line.
   */
  private async runTypewriter(): Promise<void> {
    for (const line of [HEADING_LINE_1, HEADING_LINE_2]) {
      const target = line === HEADING_LINE_1 ? this.typedLine1 : this.typedLine2;
      for (let i = 1; i <= line.length; i++) {
        await this.delay(TYPEWRITER_CHAR_DELAY_MS);
        if (this.isDestroyed) {
          return;
        }
        target.set(line.slice(0, i));
      }
    }
  }

  /**
   * @description Resolves after the given number of milliseconds.
   * @param ms Delay in milliseconds.
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
