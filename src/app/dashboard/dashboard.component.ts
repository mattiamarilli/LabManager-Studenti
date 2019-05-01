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
  id_gruppo:string;

  updateToolAndMates(){
    this.groupService.getMembri().subscribe((data: Membro[])=>this.compagni = data);
    this.classmateService.getInUseTools().subscribe((data:Utensile[])=>this.utensiliInUso = data);
  }

  ngOnInit() {
      this.id_gruppo = this.qrService.currentGroupValue();
      this.groupService.getMembri(id_gruppo).subscribe((data:Membro[])=>this.compagni = data);
      this.classmateService.getInUseTools().subscribe((data:Utensile[])=>this.utensiliInUso = data);
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.qrService.scanFile(file).subscribe(data => {
      this.classmateService.useTool(+data);
      this.updateToolAndMates();
    });

    
  }


}
