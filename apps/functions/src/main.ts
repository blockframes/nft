
import * as functions from 'firebase-functions';

import { checkSignature } from './app/player';
import { saveTokenMetadata } from './app/mint';
import { userCountry } from './app/user-country';

export const getPlayerId = functions.https.onCall(checkSignature);
export const storeUserCountry = functions.https.onCall(userCountry);
export const storeMetadata = functions.https.onCall(saveTokenMetadata);

