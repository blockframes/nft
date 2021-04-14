import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nft-faq',
  templateUrl: 'faq.component.html',
  styleUrls: ['./faq.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FAQComponent {
  navigateTo(url: string) {
    window.open(url, "_blank");
  }
}