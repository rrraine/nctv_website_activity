import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { About } from './features/home/about/about';
import { Footer } from './features/home/footer/footer';
import { Hero } from './features/home/hero/hero';
import { PodcastTestimonial } from './features/home/podcast-testimonial/podcast-testimonial';
import { Services } from './features/home/services/services';
import { NavBar } from './shared/components/nav-bar/nav-bar';
import { SplashScreen } from './shared/components/splash-screen/splash-screen';

@Component({
  selector: 'app-root',
  imports: [SplashScreen, NavBar, Hero, About, Services, PodcastTestimonial, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  /**
   * Whether the intro splash animation is playing over the site. Skipped
   * entirely for users who prefer reduced motion, so they land straight on
   * the homepage.
   */
  protected readonly showSplash = signal(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}
