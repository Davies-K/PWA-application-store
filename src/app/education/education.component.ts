import { Component, OnInit } from '@angular/core';

// firebase 
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Location } from '@angular/common';


import { Url } from 'url';
import { map } from 'rxjs/operators';

// import jquery
import * as $ from 'jquery';

export interface Item { Author: string; Category: string; imageUrl: string; }
export interface ItemId extends Item { id: string;  }

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  items: Observable<any[]>;
  allItems: any;

  constructor(db: AngularFirestore, private location: Location ) { 

    // subscribe to snapshot data from this collection
    this.items = db.collection('/Apps', ref => ref.where ('Category','==','Education'))
    .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  ngOnInit() {
  }

  goBack(): void {
   
    this.location.back();
    
  }

}
