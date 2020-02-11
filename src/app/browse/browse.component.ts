import { Component, OnInit, ViewEncapsulation, } from '@angular/core';

// firebase 
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Url } from 'url';
import { map } from 'rxjs/operators';

export interface Item { Author: string; Category: string; imageUrl: string; }
export interface ItemId extends Item { id: string;  }

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  private itemCollection: AngularFirestoreCollection<Item>;
  items: Observable<any[]>;
  allItems: any;

  showSpinner: boolean = true;


  constructor(private afs: AngularFirestore) { 
    this.itemCollection = afs.collection<Item>('Apps');
  }

  ngOnInit() {

    

    this.items = this.itemCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );


    


    this.items.subscribe ( items => {
      this.allItems = items;
      console.log(this.allItems);
    });

    this.items.subscribe(() => this.showSpinner=false);

  }

}
