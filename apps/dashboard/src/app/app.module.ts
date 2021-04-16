import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UiModule } from '@nft/ui';
import { NetworkModule } from '@nft/metamask';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import env from '@nft/env';

// Specific config for emulators
const FIREBASE_EMUTLATORS = env.useEmulators ? [
  { provide: USE_FIRESTORE_EMULATOR, useValue: ['localhost', 8000] },
] : [];


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NetworkModule,
    UiModule,
    AngularFireModule.initializeApp(env.firebase)
  ],
  providers: [...FIREBASE_EMUTLATORS],
  bootstrap: [AppComponent],
})
export class AppModule { }
