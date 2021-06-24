import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { MatButtonModule } from '@angular/material/button';

// Specific config for emulators
const FIREBASE_EMUTLATORS = env.useEmulators ? [
  { provide: USE_FIRESTORE_EMULATOR, useValue: ['localhost', 8000] },
] : [];

import { AppComponent } from './app.component';
import env from '@nft/env';
import { UiModule } from '@nft/ui';
import { NetworkModule } from '@nft/metamask';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
  declarations: [AppComponent],
  imports: [
    UiModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(env.firebase),
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    AppRoutingModule,
    NetworkModule,
    MatButtonModule
  ],
  providers: [...FIREBASE_EMUTLATORS],
  bootstrap: [AppComponent],
})
export class AppModule {}
