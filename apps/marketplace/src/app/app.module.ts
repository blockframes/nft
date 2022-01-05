
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';

import env from '@nft/env';
import { UiModule } from '@nft/ui/ui.module';
import { NetworkModule } from '@nft/metamask/component/choose-network/choose-network.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Specific config for emulators
const FIREBASE_EMUTLATORS = env.useEmulators ?
  [{ provide: USE_FIRESTORE_EMULATOR, useValue: ['localhost', 8000] }] :
  []
;


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
