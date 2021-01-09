import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationGuard } from '../core/administration.guard';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'users',
        canActivate: [AdministrationGuard],
        loadChildren: () =>
          import('./users/users.module').then((u) => u.UsersModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./about/about.module').then((a) => a.AboutModule),
      },
      {
        path: 'languages',
        loadChildren: () =>
          import('./language/language.module').then((l) => l.LanguageModule),
      },
      {
        path: 'directors',
        loadChildren: () =>
          import('./director/director.module').then((d) => d.DirectorModule),
      },
      {
        path: '',
        redirectTo: 'about',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
