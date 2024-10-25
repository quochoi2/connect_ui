import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserDashboardComponent } from './user/dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user/dashboard', component: UserDashboardComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  // { path: '', redirectTo: '/signin', pathMatch: 'full' },
  // { path: '**', redirectTo: '/signup' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
