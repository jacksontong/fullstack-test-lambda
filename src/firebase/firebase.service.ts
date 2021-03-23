import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import * as serviceAccount from './firebaseServiceAccount.json';

@Injectable()
export class FirebaseService {
  private app: admin.app.App;

  constructor() {
    this.app = admin.initializeApp({
      databaseURL: process.env.FIREBASE_DB_URL,
      // @ts-ignore
      credential: admin.credential.cert(serviceAccount),
    });
  }

  get admin() {
    return this.app;
  }
}
