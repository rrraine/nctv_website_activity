import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the hero heading', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    // The visible text types out via a typewriter effect, so this asserts the
    // always-present aria-label rather than racing the animation's textContent.
    expect(compiled.querySelector('h1')?.getAttribute('aria-label')).toBe(
      'COMMUNITY FOCUSED INDOOR DIGITAL BILLBOARDS',
    );
  });
});
