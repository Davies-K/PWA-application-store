import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';


import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { map, catchError } from 'rxjs/operators';



import { Observable } from 'rxjs';


export interface Item { Author: string; Category: string;comments :Comment[]; id: string; price: number;}
export interface ItemId extends Item { id: string;  }

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs : AngularFirestore) { }

  getAppDetail(ItemId: string): AngularFirestoreDocument<Item> {
    return this.afs.collection('Apps').doc(ItemId);
  }

  getApp(id: string): Observable<Item> {
    return this.afs.doc<Item>('Apps/' + id).snapshotChanges()
    .pipe(map(action => {
        const data = action.payload.data() as Item;
        const id = action.payload.id;
        return { id, ...data };
      }));
  }

  getApps(): Observable<Item[]> {
    return this.afs.collection<Item>('Apps').snapshotChanges()
    .pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Item;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getBookIds(): Observable<String[] | any> {
    return this.getApps()
      .pipe(map(items => items.map(item => item.id)))
      .pipe(catchError(error => error ));
  }
  
  getScreenshots (ItemId: string): Observable<any> {
    return this.afs.collection('Apps').doc(ItemId).collection('screenshots').valueChanges();
  }

  getRatingsDetail ( ItemId: string): AngularFirestoreCollection<Item> {
    return this.afs.collection('Apps').doc(ItemId).collection('comments');
  }

  getComments(ItemId: any): Observable<any> {
    return this.afs.collection('Apps').doc(ItemId).collection('comments')
    .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  
}


