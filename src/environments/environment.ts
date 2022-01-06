import { FIREBASE_KEYS } from 'KEYS/FIREBASE_KEYS';

export const environment = {
  production: false,
  firebase: {
    apiKey: FIREBASE_KEYS.apiKey,
    authDomain: FIREBASE_KEYS.authDomain,
    projectId: FIREBASE_KEYS.projectId,
    storageBucket: FIREBASE_KEYS.storageBucket,
    messagingSenderId: FIREBASE_KEYS.messagingSenderId,
    appId: FIREBASE_KEYS.appId,
  },
};
