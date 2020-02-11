import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';


import { Subject } from 'rxjs';

import { map } from 'rxjs/operators';

import { Location } from '@angular/common';

export interface Item {
  subtitle: string;

  Author: string;
  Category: string;
}

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {

  search_id;
  results: Observable<any[]>;

  offset = new Subject<string>();

  items$: Observable<any[]>;
  CategoryFilter$: BehaviorSubject<string|null>;
  AuthorFilter$: BehaviorSubject<string|null>;

  constructor(private afs: AngularFirestore, private location: Location) {
    this.CategoryFilter$ = new BehaviorSubject(null);
    this. AuthorFilter$ = new BehaviorSubject(null);
    this.items$ = combineLatest(
      this.CategoryFilter$,
      this. AuthorFilter$
    ).pipe(
      switchMap(([Category,  Author]) => 
        afs.collection('Apps', ref => {
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (Category) { query = query.where('Category', '==', Category) };
          if ( Author) { query = query.where(' Author', '==',  Author) };
          return query;
        }).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            
            const id = a.payload.doc.id;
            return { id, ...data };
  
            
          }))
        )
      )
    );
  }
  filterByCategory(Category: string|null) {
    this.CategoryFilter$.next(Category); 
  }
  filterByAuthor( Author: string|null) {
    this. AuthorFilter$.next( Author); 
  }

  onkeyup(e) {
    this.offset.next(e.target.value.toLowerCase())
  }
  
  
  // Reactive search query
  search() {
    return this.offset.pipe(
      filter(val => !!val), // filter empty strings
      switchMap(offset => {
       
        return this.afs.collection('Apps', ref =>
          ref.orderBy(`searchableIndex.${offset}`).limit(5)
        )
        
        .snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            
            const id = a.payload.doc.id;
            return { id, ...data };
  
            
          }))
        );
      })
      
    )
  }

  goBack(): void {
   
    this.location.back();
    
  }





  ngOnInit() {
    this.results = this.search();
  }

}
