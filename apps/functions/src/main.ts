import * as functions from 'firebase-functions';
import { checkSignature } from './app/player';

export const verifyMessage = functions.https.onCall(checkSignature);