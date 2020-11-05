import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './component/login.component';
import {RedirectIfAuthenthicatedGuard} from 'src/app/_guard/redirect-if-authenthicated.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [RedirectIfAuthenthicatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
