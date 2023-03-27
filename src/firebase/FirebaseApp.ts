import { FirebaseApp, initializeApp } from 'firebase/app';

import { Configure } from '../constant/configure';

export let app: FirebaseApp | undefined = undefined;

export const initializeFirebase = (): FirebaseApp => {
  if (!app) {
    const { firebaseKey, firebaseAppId, firebaseMeasurementId } = Configure;
    const firebaseConfig = {
      apiKey: firebaseKey,
      authDomain: 'service-manager-4242.firebaseapp.com',
      databaseURL: 'https://service-manager-4242-default-rtdb.asia-southeast1.firebasedatabase.app',
      projectId: 'service-manager-4242',
      storageBucket: 'service-manager-4242.appspot.com',
      messagingSenderId: '686186264877',
      appId: firebaseAppId,
      measurementId: firebaseMeasurementId,
    };
    app = initializeApp(firebaseConfig);
  }
  return app;
};
