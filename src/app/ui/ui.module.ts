import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AppRoutingModule } from '../app-routing.module';
import { BookSpinnerComponent } from './book-spinner/book-spinner.component';

import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, LoadingSpinnerComponent,BookSpinnerComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [LayoutComponent, LoadingSpinnerComponent,BookSpinnerComponent]
})
export class UiModule { }
