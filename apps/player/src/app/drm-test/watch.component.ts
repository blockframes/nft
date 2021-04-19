
import { Component } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'nft-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent {

  public thumbnailId = 'ey8RJt9c';

  public playerUrl$ = new ReplaySubject<string>();
  public videoUrl$ = new ReplaySubject<string>();

  public form = new FormGroup({
    playerUrl: new FormControl(''),
    videoUrl: new FormControl(''),
  });

  watch() {
    console.log(this.form);
    this.playerUrl$.next(this.form.value.playerUrl);
    this.videoUrl$.next(this.form.value.videoUrl);
  }
}
