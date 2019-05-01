import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { QrService } from '../services/qr.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { StringifyOptions } from 'querystring';
import {AuthenticationService} from '../services/authentication.service'
import { GroupService } from '../services/group.service'
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class QrReaderComponent implements OnInit {
  
  output: string;
  currentUser;
  constructor(private router: Router,
    private qrService: QrService, 
    private authService:AuthenticationService,
    private groupService:GroupService) {

  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue();
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.qrService.scanFile(file).subscribe(data => {
      this.output = data
       if(data != null)
          this.router.navigate(['/dashboard']);
    });
  }


}
