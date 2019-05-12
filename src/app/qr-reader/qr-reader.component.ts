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
import { ToastrService } from 'ngx-toastr';
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
  index:number = 0;
  constructor(private router: Router, 
              private classmatesService: ClassmatesService ,
              private groupService: GroupService,private toastr: ToastrService) {}

  ngOnInit() {

    this.user = JSON.parse(sessionStorage.getItem('currentUser'))
    if (this.user.id_gruppo)
      this.router.navigate(['/dashboard']);
    else
  {this.classmatesService.getCompagni().subscribe((data: Membro[]) => {
        for(let membro of data)
          {
            if(membro.id_studente == this.user.id)
              data.splice(this.index,1)
            this.index++;
          }
          this.membri = data;
          this.index = 0;
        this.router.navigate(['/scan']);
      });
    }
  }

  join(id_studente:number)
  {
    this.groupService.setMembro(id_studente).subscribe((group:any)=>
      {
        this.user.id_gruppo = group.id_gruppo;
        sessionStorage.removeItem('currentUser');
        sessionStorage.setItem('currentUser', JSON.stringify(this.user));
        this.router.navigate(['/dashboard']);
      }
    );
  }

  joinmyself(){
    this.groupService.setMembro(this.user.id).subscribe((group:any)=>
    {
      this.user.id_gruppo = group.id_gruppo;
      sessionStorage.removeItem('currentUser');
      sessionStorage.setItem('currentUser', JSON.stringify(this.user));
      this.router.navigate(['/dashboard']);
    }
  );

  }

}
