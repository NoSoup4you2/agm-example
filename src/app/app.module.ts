import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { AgmExampleComponent } from './gmap/gmap.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatListModule, MatCardModule, MatChipsModule, MatIconModule, MatDialogModule,MatFormFieldModule,MatInputModule} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { SamplePageComponent } from './sample-page/sample-page.component';
import { PolygonDialogComponent } from './map-dialog/polygon-dialog/polygon-dialog.component';
import { ColorPickerModule } from 'ngx-color-picker';
import {MatSliderModule} from '@angular/material/slider';



@NgModule({
  declarations: [
    AppComponent,
    AgmExampleComponent,
    SamplePageComponent,
    PolygonDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    ColorPickerModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    PolygonDialogComponent
  ]
})
export class AppModule { }
