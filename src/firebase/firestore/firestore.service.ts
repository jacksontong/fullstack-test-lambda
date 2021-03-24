import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase.service';

@Injectable()
export class FirestoreService {
  private readonly firestore: FirebaseFirestore.Firestore;

  constructor(private readonly firebaseService: FirebaseService) {
    this.firestore = firebaseService.admin.firestore();
  }

  /**
   * Delete a document by path
   * @param collection
   * @param path
   * @returns
   */
  delete(collection: string, path: string) {
    return this.firestore.collection(collection).doc(path).delete();
  }

  /**
   * Set data of given doc id
   * @param collection
   * @param id
   * @param data
   * @returns
   */
  set(collection: string, path: string, data: FirebaseFirestore.DocumentData) {
    return this.firestore.collection(collection).doc(path).set(data);
  }

  /**
   * Update data of given doc id
   * @param collection
   * @param id
   * @param data
   * @returns
   */
  update(
    collection: string,
    path: string,
    data: FirebaseFirestore.DocumentData,
  ) {
    return this.firestore.collection(collection).doc(path).update(data);
  }
}
