import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

const aboutRoutes: Routes = [
  {
    path: '',
    component: AboutComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(aboutRoutes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
