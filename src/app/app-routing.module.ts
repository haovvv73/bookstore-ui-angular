import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path : '',
    redirectTo :'dashboard',
    pathMatch:'full'
  },
  {
    path: 'dashboard',
    component : DashboardComponent,
    canActivate:[authGuard]
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path: '**',
    redirectTo :'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
