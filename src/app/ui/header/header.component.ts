import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { FirebaseService } from '../../services/firebase.service';


// import jquery
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  search_id;
  results: Observable<any[]>;

  offset = new Subject<string>();

  constructor(public auth: AuthService, private afs: AngularFirestore, public fireservice: FirebaseService, private router: Router) { }
   // Form event handler
 onkeyup(e) {
  this.offset.next(e.target.value.toLowerCase());
  this.router.navigate(['search'])
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
  ngOnInit() {

    this.search_id = document.getElementById("searchTxt");

    this.results = this.search()
    

    
    
    


    

    console.log(this.results)
    
    

    $(document).ready(function(){
      

    })
    
    
  }

  goToUser(){
    return this.router.navigate(['/user']);

  }

  goToApp(appid){
    return this.router.navigate(['/app/', appid])
  }

//   gotoSearch(search){
//     return this.router.navigateByUrl(`/search/asdff${search}`)
// }

gotoSearch () {
  return this.router.navigate(['search'])
}

  eventHandler(event) {
    if(event === 13) {
      this.router.navigate(['/search']);
    }
    console.log(event);
 } 

 

}
