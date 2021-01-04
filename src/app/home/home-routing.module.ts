import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((u) => u.UsersModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./about/about.module').then((a) => a.AboutModule),
      },
      {
        path: '',
        redirectTo: 'about',
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
