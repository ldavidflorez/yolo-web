import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component'
import { DetectObjComponent } from './components/detect-obj/detect-obj.component';
import { InfListComponent } from './components/inf-list/inf-list.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'yolo',
    component: DetectObjComponent
  },
  {
    path: 'list',
    component: InfListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
