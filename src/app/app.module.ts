import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { LoginComponent } from './login/login.component';
import { QrReaderComponent } from './qr-reader/qr-reader.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MainFooterComponent } from './main-footer/main-footer.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QrReaderComponent,
    DashboardComponent,
    MainNavComponent,
    UserComponent,
    MainFooterComponent,

    
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added



  ],
  providers: [   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
