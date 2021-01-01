import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './core/authentication.guard';
import { InternetErrorComponent } from './internet-error/internet-error.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'server-error',
    component: ServerErrorComponent
  },
  {
    path: 'internet-error',
    component: InternetErrorComponent
  },
  {
    path: '',
    // canActivate: [AuthenticationGuard],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
