import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input } from '@angular/core';
import { combineLatest, ReplaySubject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

export async function loadJWPlayerScript(document: Document, playerUrl: string) {
  return new Promise<void>(res => {
    const id = 'jwplayer-script';

    // check if the script tag already exists
    if (!document.getElementById(id)) {
      const script = document.createElement('script');
      script.setAttribute('id', id);
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', playerUrl);
      script.setAttribute('data-loaded', 'false');
      document.head.appendChild(script);
      script.onload = () => {
        script.setAttribute('data-loaded', 'true');
        res();
      }
    } else { // script tag exists
      const script = document.getElementById(id) as HTMLScriptElement;
      const loaded = script.getAttribute('data-loaded');

      if (loaded === 'true') { // already loaded
        res();
      } else { // script tag exist but hasn't finished to load yet: check every 0,1s if it has finished
        let ttl = 50; // 50 x 0,1s = 5s
        const intervalId = window.setInterval(() => {
          if (ttl <= 0) { // abort after 5s
            window.clearInterval(intervalId);
            res();
          }

          const newLoaded = script.getAttribute('data-loaded');
          if (newLoaded === 'true') {
            window.clearInterval(intervalId);
            res();
          } else {
            ttl--;
          }
        }, 100); // 0,1s
      }
    }
  });
}

declare const jwplayer: any;


@Component({
  selector: 'jwplayer',
  templateUrl: './jwplayer.component.html',
  styleUrls: ['./jwplayer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JwplayerComponent {
  private hasScript = new ReplaySubject<boolean>();
  private videoUrl = new ReplaySubject<string>();
  private jwplayerId = new ReplaySubject<string>();

  @Input() set src(playerUrl: string) {
    if (playerUrl) loadJWPlayerScript(this.document, playerUrl).then(_ => this.hasScript.next(true))
  }
  @Input() set video(videoUrl: string) {
    if (videoUrl) this.videoUrl.next(videoUrl);
  }
  @Input() set id(jwplayerId: string) {
    if (jwplayerId) this.jwplayerId.next(jwplayerId);
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    el: ElementRef,
  ) {
    this.hasScript.pipe(
      switchMap(() => combineLatest([this.videoUrl, this.jwplayerId])),
      take(1)
    ).subscribe(([video, jwplayerId]) => {
      const player = jwplayer(el.nativeElement);
      player.setup({
        file: video,
        image: `https://cdn.jwplayer.com/thumbs/${jwplayerId}.jpg`,
      });
      player.on('ready', () => player.play());
    })
  }
}
