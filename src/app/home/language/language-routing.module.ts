import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageComponent } from './language.component';

const languageRoutes: Routes = [
  {
    path: '',
    component: LanguageComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(languageRoutes)],
  exports: [RouterModule],
})
export class LanguageRoutingModule {}
