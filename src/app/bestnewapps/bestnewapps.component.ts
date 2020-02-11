import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// firebase 
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Url } from 'url';
import { map } from 'rxjs/operators';

import { Location } from '@angular/common';

export interface Item { Author: string; Category: string; imageUrl: string; }
export interface ItemId extends Item { id: string;  }

@Component({
  selector: 'bestnewapps',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bestnewapps.component.html',
  styleUrls: ['./bestnewapps.component.css']
})
export class BestnewappsComponent implements OnInit {
  private itemCollection: AngularFirestoreCollection<Item>;
  items: Observable<any[]>;
  allItems: any;


  constructor(private afs: AngularFirestore, private location: Location) { 
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

  }

  goBack(): void {
   
    this.location.back();
    
  }

}

