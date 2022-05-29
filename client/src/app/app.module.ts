import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DetectObjComponent } from './components/detect-obj/detect-obj.component';

import { YoloApiService } from './services/yolo-api.service';
import { CrudService } from './services/crud.service'

import { NavbarComponent } from './components/navbar/navbar.component';
import { InfListComponent } from './components/inf-list/inf-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DetectObjComponent,
    HomeComponent,
    NavbarComponent,
    InfListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    YoloApiService,
    CrudService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
