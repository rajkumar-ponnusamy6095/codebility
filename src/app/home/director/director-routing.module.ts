import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectorComponent } from './director.component';

const directorRoutes: Routes = [
  {
    path: '',
    component: DirectorComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(directorRoutes)],
  exports: [RouterModule],
})
export class DirectorRoutingModule {}
