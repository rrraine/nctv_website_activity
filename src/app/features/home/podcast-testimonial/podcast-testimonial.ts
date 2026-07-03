import { ChangeDetectionStrategy, Component, output } from '@angular/core';

import { SectionTag } from '../../../shared/components/section-tag/section-tag';

import { PodcastCard } from './podcast-card/podcast-card';
import { TESTIMONIALS } from './podcast-testimonial.constants';
import type { Testimonial } from './podcast-testimonial.interface';
import { TestimonialCard } from './testimonial-card/testimonial-card';

@Component({
  selector: 'app-podcast-testimonial',
  imports: [SectionTag, PodcastCard, TestimonialCard],
  templateUrl: './podcast-testimonial.html',
  styleUrl: './podcast-testimonial.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastTestimonial {
  /** Dealer testimonials. */
  protected readonly testimonials: Testimonial[] = TESTIMONIALS;

  /** Emits when the user activates the Spotify listen button. */
  public readonly spotifyClick = output<void>();
  /** Emits when the user activates the Apple Music listen button. */
  public readonly appleMusicClick = output<void>();
}
