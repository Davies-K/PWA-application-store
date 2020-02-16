import { Injectable } from '@angular/core';


// imported angularfire for firebase
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

// import map and catchError from rxjs library
import { map, catchError } from 'rxjs/operators';

// import Observable from rxjs
import { Observable } from 'rxjs';


export interface Item { Author: string; Category: string;comments :Comment[]; id: string; price: number;}
export interface ItemId extends Item { id: string;  }

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs : AngularFirestore) { }

  // Get item with itemId from collection `Apps`
  getAppDetail(ItemId: string): AngularFirestoreDocument<Item> {
    return this.afs.collection('Apps').doc(ItemId);
  }

  // get snapshot details of specific app with appId
  getApp(id: string): Observable<Item> {
    return this.afs.doc<Item>('Apps/' + id).snapshotChanges()
    .pipe(map(action => {
        const data = action.payload.data() as Item;
        const id = action.payload.id;
        return { id, ...data };
      }));
  }


  
  // get snapshot of all apps in Collection `Apps`
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

  // get only ids from getApps() function with map from rxjs
  getBookIds(): Observable<String[] | any> {
    return this.getApps()
      .pipe(map(items => items.map(item => item.id)))
      .pipe(catchError(error => error ));
  }

  //get all items from screenshots collection using valueChanges from firebase.
  // ValueChanges observes the data continuously for changes (CRUD)
  getScreenshots (ItemId: string): Observable<any> {
    return this.afs.collection('Apps').doc(ItemId).collection('screenshots').valueChanges();
  }

  // get ratings which also contains comments for every itemId with subcollection `comments`
  getRatingsDetail ( ItemId: string): AngularFirestoreCollection<Item> {
    return this.afs.collection('Apps').doc(ItemId).collection('comments');
  }

  // get snapshot data for all subcollection (comments) for a specific ItemId
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


