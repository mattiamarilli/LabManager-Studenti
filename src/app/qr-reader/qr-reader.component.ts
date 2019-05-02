import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { QrService } from '../services/qr.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { StringifyOptions } from 'querystring';
import {AuthenticationService} from '../services/authentication.service'
import { GroupService } from '../services/group.service'
import { JoinGroup } from '../model_body';
import {AuthUser, Membro} from '../model';
import {ClassmatesService} from '../services/classmates.service';
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
  membri: Membro[];
  user:AuthUser;
  constructor(private router: Router, 
              private classmatesService: ClassmatesService ,
              private groupService: GroupService) {}

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'))
    if (this.user.id_gruppo)
      this.router.navigate(['/dashboard']);
    this.classmatesService.getCompagni().subscribe((data: Membro[]) => this.membri = data);
  }

  join(id_studente:number)
  {
    this.groupService.setMembro(id_studente).subscribe((user:AuthUser)=>
      {
        sessionStorage.removeItem('currentUser');
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/dashboard']);
      }
    );
  }

}
