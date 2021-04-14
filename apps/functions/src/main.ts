import * as functions from 'firebase-functions';
import { checkSignature } from './app/player';

export const getPlayerId = functions.https.onCall(checkSignature);