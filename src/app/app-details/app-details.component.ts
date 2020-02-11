import { Component, OnInit,ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Location } from '@angular/common';


import * as $ from 'jquery';

import { AuthService } from '../core/auth.service';
import * as firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';

export interface Item { Author: string; Category: string;  comments: Comment[]; screenshots: Screenshot[]; rating: number; }
export interface ItemId extends Item { id: string;  }
export class Comment {
  rating: number;
  comment: string;
  name: string;
  date: string;
}
export class Screenshot {
  image: string;
}

@Component({
  selector: 'app-details',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.css']
})
export class AppDetailsComponent implements OnInit {

  item;
  app;
  screeny;
  Screenshots;
  Comments;
  stars;

  
  //userid
  Us_id;

  trendy;
  Cate;
  alldetails;
  Author;
  categories;
  Auth;
  auth;

  bookSpinner: boolean= true;
  

  //for ratings 
  Rate;
  Val;
  Valy;
  Vals;
  New_avg;
  Ratings;

  @ViewChild('cform') commentFormDirective;
  items: Item;
  Itemcopy: Item;
  itemIds: string[];
  prev: string;
  next: string;
  comment: Comment;
  errMess: string;
  visibility = 'shown';
  favorite = false;

  formErrors = {
    'comment': ''
  };

  validationMessages = {
    'comment': {
      'required':      'Comment is required.'
    }
  };

  commentForm: FormGroup;

  currentUser = null;


  constructor(private afAuth : AngularFireAuth,private location: Location, private router: Router, private db : AngularFirestore, private route:ActivatedRoute, public afs : FirebaseService, private fb: FormBuilder ) {
    afAuth.authState.subscribe(userData => this.currentUser = userData );
   }
        



  ngOnInit() {

    

    this.createForm();

    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; 
    return this.afs.getApp(params['id']); }))
    .subscribe(dish => {
      this.app = dish;
      this.visibility = 'shown';
      this.item = this.afs.getAppDetail(this.app.id).valueChanges();
      this.Comments = this.afs.getComments(this.app.id).subscribe(comments => this.item.comments = comments);
      this.Screenshots = this.afs.getScreenshots(this.app.id).subscribe(screenshots => this.screeny = screenshots);
      this.Ratings = this.getAppStars(this.app.id).subscribe(rating => {
        this.Rate = rating;
        this.Valy = this.Rate.map(a => a.rating);
        console.log(this.Valy);

        let total = 0;
        for(var i = 0; i < this.Valy.length; i++) {
          total += this.Valy[i];
        } 

        this.New_avg = total / this.Valy.length;
        console.log(this.New_avg)
        document.getElementById("NAM1").innerHTML = this.getStars(this.New_avg);
        
        
        
      });
      this.stars = this.afs.getRatingsDetail(this.app.id).valueChanges().subscribe(
        Val=> {
          this.item.rating = Val; });

          this.item.subscribe(() => this.bookSpinner=false);
      
    
  });

  


  $(document).ready(function(){
    $("#btn-download").click(function() {
      $(this).toggleClass("downloaded");
    });


    $('.GetFile').on('click', function () {
      $.ajax({
          url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/172905/test.pdf',
          method: 'GET',
          xhrFields: {
              responseType: 'blob'
          },
          success: function (data) {
              var a = document.createElement('a');
              var url = window.URL.createObjectURL(data);
              a.href = url;
              a.download = 'myfile.pdf';
              a.click();
              window.URL.revokeObjectURL(url);
          }
      });
    })

    

  })

}
createForm() {
  this.commentForm = this.fb.group({
    rating: 5,
    comment:['', Validators.required]
  });

  this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged(); // (re)set validation messages now
}

onValueChanged(data?: any) {
  if (!this.commentForm) { return; }
  const form = this.commentForm;
  for (const field in this.formErrors) {
    if (this.formErrors.hasOwnProperty(field)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
}

ItemId: string = this.route.snapshot.paramMap.get('id');

postComment(ItemId: string, comment: any): Promise<any> {
  if (this.currentUser) {
    return this.db.collection('Apps').doc(this.ItemId).collection('comments')
      .add({
        
          id: this.currentUser.uid,
          name : this.currentUser.displayName ? this.currentUser.displayName : this.currentUser.email,
          rating: comment.rating,

        
        
        
        comment: comment.comment,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

     
  } else {
    return Promise.reject(new Error('No User Logged In!'));
  }
}

getAppStars(ItemId: string){
  const starsRef =this.db.collection('Apps').doc(this.ItemId).collection('comments');
  return starsRef.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Item;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );;
}



onSubmit() {
  this.postComment(this.item, this.commentForm.value)
    .then(() => {
      this.afs.getComments(this.item)
        .subscribe(comments => this.item.comments = comments);
    },
    err => console.log('Error ', err));
  this.commentFormDirective.resetForm();
  this.commentForm.reset({
    rating: 5,
    comment: ''
  });

 
}

getStars(rating: number) {

  // Round to nearest half
  rating = Math.round(rating * 2) / 2;
  let output = [];

  // Append all the filled whole stars
  for (var i = rating; i >= 1; i--)
    output.push('<i class="fa fa-star" style="color: black; font-size: 11px;"></i>&nbsp;');

  // If there is a half a star, append it
  if (i == .5) output.push('<i class="fa fa-star-half-o" style="color: #acacab; font-size: 11px;"></i>&nbsp;');

  // Fill the empty stars
  for (let i = (5 - rating); i >= 1; i--)
    output.push('<i class="fa fa-star-o" style="color: black; font-size: 11px;"></i>&nbsp;');

  return output.join('');

}

goBack(): void {
   
  this.location.back();
  
}




ngOnDestroy() {
  this.item.unsubscribe;
}


 

}


