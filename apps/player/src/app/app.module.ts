import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { UiModule } from '@nft/ui';

// Specific config for emulators
const FIREBASE_EMUTLATORS = env.useEmulators ? [
  { provide: USE_FIRESTORE_EMULATOR, useValue: ['localhost', 8000] },
] : [];

import { AppComponent } from './app.component';
import env from '@nft/env';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(env.firebase),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AppRoutingModule,
    UiModule
  ],
  providers: [...FIREBASE_EMUTLATORS],
  bootstrap: [AppComponent],
})
export class AppModule {}
