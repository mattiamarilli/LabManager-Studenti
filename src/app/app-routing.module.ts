import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QrReaderComponent} from './qr-reader/qr-reader.component'
const routes: Routes = [

  { path: 'scan',component:QrReaderComponent},
  { path: '', redirectTo: '/scan', pathMatch: 'full'},
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
