import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SETTINGS } from '@angular/fire/firestore';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';

import { BackendService } from './backend.service';
import { Title, Attribute } from '../../models/title';

// Specific config for emulators
const FIREBASE_EMULATORS = [{
  provide: USE_FIRESTORE_EMULATOR, 
  useValue: ['localhost', 9000] 
}];

describe('BackendService', () => {
  let service: BackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp({ databaseURL: 'http://localhost:9000/?ns=c8-nft' }),
        AngularFireDatabaseModule
      ],
      providers: [
        BackendService,
        ...FIREBASE_EMULATORS
      ],
    });
    //TestBed.configureTestingModule({});
    service = TestBed.inject(BackendService);
  });

  it('should be created', async () => {
    expect(service).toBeTruthy();

    //Write to db
    const title:Title = {
      attributes: {'key': "fr"},
      name: 'A Title',
      image: 'http://images.google.com/xyz',
      jwPlayerId: 'xyz',
      description: 'A NFT!'
    }
    let ret = await service.create(title);
    console.log(ret);
  });
});
