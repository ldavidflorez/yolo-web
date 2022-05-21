import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DetectObjComponent } from './components/detect-obj/detect-obj.component';

import { YoloApiService } from './services/yolo-api.service';

@NgModule({
  declarations: [
    AppComponent,
    DetectObjComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    YoloApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
