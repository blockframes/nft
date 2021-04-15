import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nft-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  subject: string;
  message: string;
  constructor() { 
    this.subject = "";
    this.message = "";
  }

  ngOnInit(): void {
  }

  //TODO:
  //https://github.com/blockframes/nft/issues/37
  sendMail() {
    window.open(`mailto:mbangera@cascade8.com?subject=${this.subject}&body=${this.message}`);
  }
}
