import { Component, OnInit } from '@angular/core';
import { QrService } from '../services/qr.service';
import {AuthenticationService} from '../services/authentication.service'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  constructor(    private qrService: QrService,
    private authenticationService:AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  exitGroup()
  {
    this.qrService.logout();
    this.router.navigate(['/scan']);
  }

  logout(){
    this.qrService.logout();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
