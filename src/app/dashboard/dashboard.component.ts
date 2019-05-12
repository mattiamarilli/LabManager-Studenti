import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {ClassmatesService} from '../services/classmates.service';
import {Membro, Utensile, AuthUser} from '../model';
import {GroupService} from '../services/group.service';
import { QrService } from '../services/qr.service';
import {AuthenticationService} from '../services/authentication.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import {ConfirmDialogService} from '../services/confirm-dialog.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private classmateService: ClassmatesService,
    private groupService: GroupService,
    private qrService: QrService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,


  ) { 

   }

  compagni: Membro[];
  utensiliInUso: Utensile[];
  user: AuthUser;


  object: any;
  updateToolAndMates() {
    this.groupService.getMembri().subscribe((data: Membro[]) => this.compagni = data);
    this.classmateService.getInUseTools().subscribe((data: Utensile[]) => this.utensiliInUso = data);
  }

  ngOnInit() {

    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!this.user.id_gruppo) {
      this.router.navigate(['/scan']);
      this.toastr.warning("Devi unirti o creare un gruppo per lavorare","Attenzione")
    } else {
      this.groupService.getMembri().subscribe((data: Membro[]) => this.compagni = data);
      this.classmateService.getInUseTools().subscribe((data: Utensile[]) => this.utensiliInUso = data); }
  }

  onFileChange(event) {
    const file = event.target.files[0];

    if (!file) { return; }

    this.qrService.scanFile(file).subscribe(data => {
      this.object = JSON.parse(data);
      if (this.object.type === 'category') {
        this.classmateService.useToolByCategory(this.object.id).subscribe((done: boolean) => {
            console.log(done);
            if (done) {
              this.toastr.success('Successo', 'Strumento acquisito');
              this.updateToolAndMates();
            } else {
              this.toastr.error('Oggetto non disponibile', 'Oops!');
            }
          }
        );
      } else {
        console.log('ciao');
        this.classmateService.useTool(this.object.id).subscribe((done: boolean) => {
            if (done) {
              this.toastr.success('Successo', 'Strumento acquisito');
              this.updateToolAndMates();
            } else {
              this.toastr.error('Oggetto non disponibile', 'Oops!');
            }
          }
        );
      }
    });
  }

  restituisci(id_utensile: number) {
    if (confirm('Sei sicuro di volerlo restituire')) {

      console.log('ciao');
      this.classmateService.releaseTool(id_utensile).subscribe(() =>  this.updateToolAndMates());

    }

  }
  segnala(id_utensile: number) {
    if (confirm('Sei sicuro di volerlo segnalare')) {

      console.log('ciao');
      this.classmateService.releaseAndFlagTool(id_utensile).subscribe(() =>  this.updateToolAndMates());

    }

  }

  exitGroup() {
    this.groupService.exitgroup().subscribe(()=>
    
    {
      this.user.id_gruppo = null;
      sessionStorage.removeItem('currentUser');
        sessionStorage.setItem('currentUser', JSON.stringify(this.user));
        this.router.navigate(['/scan']);
    }
    
    );


  }

}
