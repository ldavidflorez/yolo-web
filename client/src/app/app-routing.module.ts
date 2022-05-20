import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetectObjComponent } from './components/detect-obj/detect-obj.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/yolo',
    pathMatch: 'full'
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
