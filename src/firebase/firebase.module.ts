import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirestoreService } from './firestore/firestore.service';

@Module({
  providers: [FirebaseService, FirestoreService],
  exports: [FirestoreService],
})
export class FirebaseModule {}
