import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Testimonial } from '../podcast-testimonial.interface';

@Component({
  selector: 'app-testimonial-card',
  imports: [NgOptimizedImage],
  templateUrl: './testimonial-card.html',
  styleUrl: './testimonial-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialCard {
  /** Testimonial rendered by this card. */
  public readonly testimonial = input.required<Testimonial>();
}
