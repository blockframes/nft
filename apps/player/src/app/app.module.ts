import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTION_EMULATOR } from '@angular/fire/functions';
import { UiModule } from '@nft/ui';
import { NetworkModule } from '@nft/metamask';

// Specific config for emulators
const FIREBASE_EMUTLATORS = env.useEmulators ? [
  { provide: USE_FIRESTORE_EMULATOR, useValue: ['localhost', 8000] },
  { provide: USE_FUNCTION_EMULATOR, useValue: ['localhost', 5001] },
] : [];

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import env from '@nft/env';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(env.firebase),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AppRoutingModule,
    UiModule,
    NetworkModule,
  ],
  providers: [...FIREBASE_EMUTLATORS],
  bootstrap: [AppComponent],
})
export class AppModule {}
