import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowseComponent } from './browse/browse.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Adding angular material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list'

import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatBadgeModule} from '@angular/material/badge';

import "hammerjs";

import { 
  MatTableModule, 
  MatSortModule, 
  MatDialogModule, 
} from '@angular/material';

import {MatInputModule} from '@angular/material';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';


//firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppDetailsComponent } from './app-details/app-details.component';
import { BestnewappsComponent } from './bestnewapps/bestnewapps.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { EducationComponent } from './education/education.component';
import { EntertainmentComponent } from './entertainment/entertainment.component';

@NgModule({
  declarations: [
    AppComponent,
    BrowseComponent,
    AppDetailsComponent,
    BestnewappsComponent,
    LoginComponent,
    UserComponent,
    ErrorpageComponent,
    SearchpageComponent,
    EducationComponent,
    EntertainmentComponent,
  
  ],
  imports: [
    MatTableModule, 
    MatSortModule, 
    MatDialogModule, 
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatTabsModule,
    MatBadgeModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSliderModule,
    MatListModule,
    MatTooltipModule,
    BrowserModule,
    AppRoutingModule,
    UiModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'appStore'),
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
