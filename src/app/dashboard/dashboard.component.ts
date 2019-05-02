import { Component, OnInit } from '@angular/core';
import {ClassmatesService} from '../services/classmates.service';
import {Membro, Utensile, AuthUser} from '../model'
import {GroupService} from '../services/group.service'
import { QrService } from '../services/qr.service';
import {AuthenticationService} from '../services/authentication.service'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
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
    private authenticationService:AuthenticationService,
    private router: Router
    ) { }

  compagni: Membro[];
  utensiliInUso: Utensile[];

  object:any;
  updateToolAndMates(){
    this.groupService.getMembri().subscribe((data: Membro[]) => this.compagni = data);
    this.classmateService.getInUseTools().subscribe((data:Utensile[])=>this.utensiliInUso = data);
  }

  ngOnInit() {
      this.groupService.getMembri().subscribe((data: Membro[]) => this.compagni = data);
      this.classmateService.getInUseTools().subscribe((data:Utensile[])=>this.utensiliInUso = data);
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.qrService.scanFile(file).subscribe(data => {
     this.object = JSON.parse(data);
     if (this.object.type === 'category') {
       console.log(this.object.id)
       this.classmateService.useToolByCategory(this.object.id).subscribe((done: boolean) =>
         {
           if(done === true) {
             alert('Oggetto acquisito');
             this.updateToolAndMates();
           } else {
             alert('Oggetto non disponibile');
           }
         }
       );
     } else {
       console.log('ciao')
       this.classmateService.useTool(this.object.id).subscribe((done: boolean) =>
         {
           if(done === true) {
             alert('Oggetto acquisito');
             this.updateToolAndMates();
           } else {
             alert('Oggetto non disponibile');
           }
         }
       );
     }
    });
  }

  restituisci(id_utensile: number)
  {
    if(confirm('Sei sicuro di volerlo restituire'))

    {

      console.log('ciao');
      this.classmateService.releaseTool(id_utensile).subscribe(() =>  this.updateToolAndMates());

    }

  }

  exitGroup()
  {
    this.groupService.exitgroup().subscribe();
    /*this.authenticationService.renew().subscribe((data: AuthUser) => {

        this.user = data;
        //console.log(this.user);
        sessionStorage.removeItem('currentUser');
        sessionStorage.setItem('currentUser', JSON.stringify(this.user));
        console.log(  sessionStorage.getItem('currentUser'))
        // this.router.navigate(['/scan']);
      }
    );

    */
  }


}
