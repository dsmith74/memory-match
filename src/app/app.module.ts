import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatGridListModule,
} from '@angular/material';


import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';

const MATERIAL_COMPONENTS = [
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatGridListModule,
];


@NgModule({
  declarations: [
    AppComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    MATERIAL_COMPONENTS,
    FlexLayoutModule
  ],
  exports: [
    MATERIAL_COMPONENTS,
    FlexLayoutModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
