import { Component, OnInit } from '@angular/core';
import { QrService } from '../services/qr.service';
import {AuthenticationService} from '../services/authentication.service'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { from } from 'rxjs';
import {GroupService} from '../services/group.service';
import {AuthUser} from '../model';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  constructor(    private qrService: QrService,
    private authenticationService:AuthenticationService,
    private router: Router,private groupService:GroupService) { }

    user:AuthUser

  ngOnInit() {
  }



  logout(){
    this.groupService.exitgroup().subscribe();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
