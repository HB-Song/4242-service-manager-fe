import { Context, createContext } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore, getFirestore, setDoc, doc, SetOptions } from 'firebase/firestore';

let database: Context<Firestore | undefined> = createContext(undefined);

export const initializeFirestore = (app: FirebaseApp): Firestore => {
  if (app) {
    database = getFirestore(app);
    return database;
  } else {
    throw new Error('firebase app must be initialized');
  }
};

export const writeData = async (data: any, route: string, option: SetOptions) => {
  console.log(database);
  if (!database) {
    throw new Error('Firestore must be initialized');
  }
  const routeArray = route.split('/');
  if (routeArray.length < 2) {
    throw new Error('Array must be at least 2 in length');
  }

  const docRef = doc(database, routeArray[0], ...routeArray.slice(1));
  option ? await setDoc(docRef, data, option) : await setDoc(docRef, data);
};
