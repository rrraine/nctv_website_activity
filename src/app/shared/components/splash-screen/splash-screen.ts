import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';

type SplashPhase = 'spin' | 'fading' | 'reveal' | 'exit';

@Component({
  selector: 'app-splash-screen',
  imports: [NgOptimizedImage],
  templateUrl: './splash-screen.html',
  styleUrl: './splash-screen.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplashScreen {
  /** Emits once the intro animation has fully finished and the overlay can be removed. */
  public readonly finished = output<void>();

  /** Current stage of the intro: compass spin, compass fade-out, wordmark pop-in, then overlay fade-out. */
  protected readonly phase = signal<SplashPhase>('spin');

  /**
   * @description Starts the compass fading out once its spin finishes.
   * @param event Native animationend event from the compass image; stopped so it doesn't also reach the overlay's own listener.
   */
  protected onSpinEnd(event: AnimationEvent): void {
    event.stopPropagation();
    this.phase.set('fading');
  }

  /**
   * @description Reveals the wordmark only once the compass has fully faded out, so the two are never visible at the same time.
   * @param event Native transitionend event from the compass image's fade-out; stopped so it doesn't also reach the overlay's own listener.
   */
  protected onCompassFadeEnd(event: TransitionEvent): void {
    event.stopPropagation();
    this.phase.set('reveal');
  }

  /**
   * @description Advances from the wordmark pop-in to the overlay fade-out once the pop-in finishes.
   * @param event Native animationend event from the wordmark image; stopped so it doesn't also reach the overlay's own listener.
   */
  protected onRevealEnd(event: AnimationEvent): void {
    event.stopPropagation();
    this.phase.set('exit');
  }

  /**
   * @description Signals that the intro has fully finished once the overlay's own fade-out animation ends.
   */
  protected onFadeOutEnd(): void {
    this.finished.emit();
  }
}
