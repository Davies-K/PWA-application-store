import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core/auth.service';

// import jquery
import * as $ from 'jquery';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(public auth: AuthService) { }

  ngOnInit() {

    


  }

}
