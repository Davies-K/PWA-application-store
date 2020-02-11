import { Component, OnInit } from '@angular/core';

// import jquery
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'appStore';


  ngOnInit(){
    $(document).ready(function(){
      var d = new Date();
     document.getElementById("date_txt").innerHTML = d.toDateString();

    });
  }

}
