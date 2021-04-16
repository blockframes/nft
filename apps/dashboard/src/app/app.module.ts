import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UiModule } from '@nft/ui';
import { NetworkModule } from '@nft/metamask';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Specific config for emulators
const FIREBASE_EMUTLATORS = environment.useEmulators ? [
  { provide: USE_FIRESTORE_EMULATOR, useValue: ['localhost', 9000] },
] : [];

import { BackendService } from './service/backend.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [...FIREBASE_EMUTLATORS],
  bootstrap: [AppComponent],
})
export class AppModule { }
