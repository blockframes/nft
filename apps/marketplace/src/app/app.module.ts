import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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


const routes: Routes = [
  { path: 'my-tokens/:id', component: MyTokensComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'home', component: AppComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent, MyTokensComponent, ContactUsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule,
    AngularFirestoreModule,
    RouterModule.forRoot(routes)
  ],
  providers: [...FIREBASE_EMUTLATORS],
  bootstrap: [AppComponent],
})
export class AppModule {}
