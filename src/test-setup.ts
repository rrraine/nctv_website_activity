// jsdom (the test DOM environment) doesn't implement matchMedia. Real browsers
// have supported it for years, so this is a test-environment polyfill only.
if (typeof window.matchMedia !== 'function') {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

// jsdom also doesn't implement IntersectionObserver. Real browsers have
// supported it for years, so this is a test-environment polyfill only.
if (typeof window.IntersectionObserver !== 'function') {
  class IntersectionObserverStub implements IntersectionObserver {
    public readonly root: Element | Document | null = null;
    public readonly rootMargin = '';
    public readonly thresholds: ReadonlyArray<number> = [];

    public observe(): void {}
    public unobserve(): void {}
    public disconnect(): void {}
    public takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  window.IntersectionObserver = IntersectionObserverStub;
}
