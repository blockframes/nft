import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';

// Specific config for emulators
const FIREBASE_EMUTLATORS = environment.useEmulators ? [
  { provide: USE_FIRESTORE_EMULATOR, useValue: ['localhost', 8000] },
] : [];

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MyTokensComponent } from './my-tokens/my-tokens.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UiModule } from '@nft/ui';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [AppComponent, MyTokensComponent, ContactUsComponent],
  imports: [
    UiModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule,
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [...FIREBASE_EMUTLATORS],
  bootstrap: [AppComponent],
})
export class AppModule {}
