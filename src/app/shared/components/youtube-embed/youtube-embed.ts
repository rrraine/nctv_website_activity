import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-embed',
  templateUrl: './youtube-embed.html',
  styleUrl: './youtube-embed.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YoutubeEmbed {
  private readonly sanitizer = inject(DomSanitizer);

  /** YouTube video ID to embed (the id segment of the share URL, not the full URL). */
  public readonly videoId = input.required<string>();
  /** Accessible title describing the video's content, announced to screen readers. */
  public readonly title = input.required<string>();

  /** Sanitized privacy-enhanced embed URL built from videoId(). */
  protected readonly embedUrl = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${this.videoId()}`,
    ),
  );
}
