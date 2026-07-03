import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { SectionTagTone } from './section-tag.types';

@Component({
  selector: 'app-section-tag',
  templateUrl: './section-tag.html',
  styleUrl: './section-tag.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionTag {
  /** Visible label rendered inside the pill. */
  public readonly label = input.required<string>();
  /** Visual tone: solid white for dark sections, muted gray for light sections. */
  public readonly tone = input<SectionTagTone>('solid');
}
