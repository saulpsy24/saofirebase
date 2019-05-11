import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component'
import {LoginPageComponent} from './components/login-page/login-page.component'
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component'
import {PrivadoPageComponent} from './components/privado-page/privado-page.component'
import {RegisterPageComponent} from './components/register-page/register-page.component'
import {AuthGuard} from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'login',component:LoginPageComponent,canActivate:[LoggedGuard] },
  {path:'private',component:PrivadoPageComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterPageComponent,canActivate:[LoggedGuard] },
  {path:'**',component:NotFoundPageComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
