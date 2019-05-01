import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { QrService } from '../services/qr.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { StringifyOptions } from 'querystring';
import {AuthenticationService} from '../services/authentication.service'
import { GroupService } from '../services/group.service'
import { JoinGroup } from '../model_body';
import { AuthUser } from '../model';
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
  joingroup:JoinGroup = new JoinGroup();
  currentUser:AuthUser;
  constructor(private router: Router,
    private qrService: QrService,
    private authService:AuthenticationService,
    private groupService:GroupService) {

  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue();
    console.log(this.currentUser[0].id)
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.qrService.scanFile(file).subscribe(data => {
      this.output = data
       if(data != null)
          this.joingroup.id_gruppo = +this.output;
          this.joingroup.id_studente = this.currentUser[0].id;
          this.groupService.setMembro(this.joingroup).subscribe()
          //this.router.navigate(['/dashboard']);
    });
  }


}
