import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component'
import { DetectObjComponent } from './components/detect-obj/detect-obj.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'yolo',
    component: DetectObjComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
