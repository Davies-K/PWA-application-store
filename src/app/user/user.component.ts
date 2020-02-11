import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { Location } from '@angular/common';
import { AuthService } from '../core/auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public auth: AuthService, private location: Location, private afs : FirebaseService, private db : AngularFirestore) { }

  ngOnInit() {
    
  }
  goBack(): void {
   
    this.location.back();
    
  }

}
