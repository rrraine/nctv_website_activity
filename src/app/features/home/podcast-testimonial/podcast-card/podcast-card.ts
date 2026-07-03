import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Button } from '@ntv360/component-pantry';

@Component({
  selector: 'app-podcast-card',
  imports: [NgOptimizedImage, Button],
  templateUrl: './podcast-card.html',
  styleUrl: './podcast-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastCard {
  /** Cover art image path. */
  public readonly coverImage = input.required<string>();
  /** Accessible description of the cover art. */
  public readonly coverAlt = input.required<string>();
  /** Small label above the title, e.g. "Listen to our Podcast". */
  public readonly kicker = input.required<string>();
  /** Podcast title. */
  public readonly title = input.required<string>();
  /** Podcast description. */
  public readonly description = input.required<string>();

  /** Emits when the Spotify button is activated. */
  public readonly spotifyClick = output<void>();
  /** Emits when the Apple Music button is activated. */
  public readonly appleMusicClick = output<void>();
}
