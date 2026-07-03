import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Service } from '../services.interface';

@Component({
  selector: 'app-service-card',
  imports: [NgOptimizedImage],
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCard {
  /** Service offering rendered by this card. */
  public readonly service = input.required<Service>();
}
