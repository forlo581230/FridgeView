import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { PieComponent } from './pie/pie.component';

import { AppService} from './services/app.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    PieComponent,
    DashboardComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
