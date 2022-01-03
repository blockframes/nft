
import * as functions from 'firebase-functions';

import { checkSignature } from './app/player';
import { userCountry } from './app/user-country';

export const getPlayerId = functions.https.onCall(checkSignature);
export const storeUserCountry = functions.https.onCall(userCountry);

