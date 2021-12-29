

import { db } from './internals/firebase';
import { https } from 'firebase-functions';

export const userCountry = async (data: { address: string }, context: https.CallableContext): Promise<void> => {

  // if the data is malformed we stop the function here
  // as this is an analytics function, running in the background, it shouldn't throw any errors
  if (!data || !data.address || typeof data.address !== 'string') return;

  const ownerRef = db.ref('owners').child(`${data.address}`);
  const ownerSnap = await ownerRef.get();

  // we only want to save the user's country if we don't have it already
  if (!ownerSnap.exists()) return;


  const req = context.rawRequest;
  const country = req.headers['x-appengine-country'];

  // silent return without error
  if (!country || typeof country !== 'string') return;

  return ownerRef.set({ country });
};
