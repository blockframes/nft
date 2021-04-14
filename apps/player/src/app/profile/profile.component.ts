import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ERC1155 } from '@nft/metamask';

@Component({
  selector: 'nft-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  
  constructor(private erc1155: ERC1155) { }

  ngOnInit(): void {
  }

}
