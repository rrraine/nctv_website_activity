import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { About } from './features/home/about/about';
import { Footer } from './features/home/footer/footer';
import { Hero } from './features/home/hero/hero';
import { PodcastTestimonial } from './features/home/podcast-testimonial/podcast-testimonial';
import { Services } from './features/home/services/services';
import { NavBar } from './shared/components/nav-bar/nav-bar';

@Component({
  selector: 'app-root',
  imports: [NavBar, Hero, About, Services, PodcastTestimonial, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
