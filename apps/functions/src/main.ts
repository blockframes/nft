
import * as functions from 'firebase-functions';
import {
  checkSignature,
  getPlayerUrl as _getPlayerUrl,
} from './app/player';

export const getPlayerId = functions.https.onCall(checkSignature);

export const getPlayerUrl = functions.https.onCall(_getPlayerUrl);
