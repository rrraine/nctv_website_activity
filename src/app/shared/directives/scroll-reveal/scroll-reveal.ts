import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
})
export class ScrollReveal implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  /**
   * @description Starts observing the host element so it floats in when scrolled into view and floats back out when scrolled past, unless the user prefers reduced motion.
   */
  public ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const element = this.elementRef.nativeElement;
    element.classList.add('scroll-reveal');

    this.observer = new IntersectionObserver(
      ([entry]) => {
        element.classList.toggle('scroll-reveal--visible', entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    this.observer.observe(element);
  }

  /**
   * @description Disconnects the intersection observer.
   */
  public ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
