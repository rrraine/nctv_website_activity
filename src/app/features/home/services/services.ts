import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Tabs } from '@ntv360/component-pantry';

import { SectionTag } from '../../../shared/components/section-tag/section-tag';
import { ScrollReveal } from '../../../shared/directives/scroll-reveal/scroll-reveal';

import { ServiceCarousel } from './service-carousel/service-carousel';
import { SERVICE_CATEGORIES } from './services.constants';
import type { ServiceCategory } from './services.interface';

@Component({
  selector: 'app-services',
  imports: [SectionTag, Tabs, ServiceCarousel, ScrollReveal],
  templateUrl: './services.html',
  styleUrl: './services.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Services {
  /** Service categories, in tab display order. */
  protected readonly categories: ServiceCategory[] = SERVICE_CATEGORIES;
  /** Tab headers derived from the category labels. */
  protected readonly tabs = this.categories.map((category) => ({ label: category.label }));
  /** Index of the currently active category tab. */
  protected readonly activeIndex = signal(0);
  /** Services shown in the carousel for the active category. */
  protected readonly activeServices = computed(() => this.categories[this.activeIndex()].services);

  /**
   * @description Updates the active category when the user selects a different tab.
   * @param index Index of the newly selected tab.
   */
  protected onTabChange(index: number): void {
    this.activeIndex.set(index);
  }
}
