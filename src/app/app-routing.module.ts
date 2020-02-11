import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard } from './core/auth.guard';

import {UserComponent} from './user/user.component';
import { ErrorpageComponent} from './errorpage/errorpage.component';
import { SearchpageComponent } from './searchpage/searchpage.component';

import { BrowseComponent } from './browse/browse.component';
import {LoginComponent } from './login/login.component';
import { AppDetailsComponent } from './app-details/app-details.component'
import { BestnewappsComponent } from "./bestnewapps/bestnewapps.component";
import { EducationComponent } from './education/education.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';
const routes: Routes = [
  { path: '', redirectTo: '/browse', pathMatch: 'full' },
  // { path: '**', redirectTo:'/err404', pathMatch: 'full'},
  { path: 'err404', component: ErrorpageComponent},
  { path: 'browse', component: BrowseComponent },
  { path: 'app/:id', component: AppDetailsComponent},
  { path: 'bestnewapps', component: BestnewappsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: 'search', component: SearchpageComponent},
  { path: 'education', component : EducationComponent }, 
  { path: 'entertainment', component: EntertainmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
