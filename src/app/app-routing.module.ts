import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QrReaderComponent} from './qr-reader/qr-reader.component'
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: 'login',component:LoginComponent},
  { path: 'dashboard',component:DashboardComponent},
  { path: 'scan',component:QrReaderComponent/*,canActivate: [AuthGuard]*/},
  { path: '', redirectTo: '/scan', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
