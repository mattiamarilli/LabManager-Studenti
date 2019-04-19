import { Component, OnInit } from '@angular/core';
import {ClassmatesService} from '../services/classmates.service';
import {Membro, Utensile} from '../model'
import {GroupService} from '../services/group.service'
import { QrService } from '../services/qr.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private classmateService: ClassmatesService,private groupService: GroupService, private qrService: QrService) { }

  compagni: Membro[];
  utensiliInUso: Utensile[];
  output: string;

  updateToolAndMates(){
    this.groupService.getMembri().subscribe((data: Membro[])=>this.compagni = data);
    this.classmateService.getInUseTools().subscribe((data:Utensile[])=>this.utensiliInUso = data);
  }

  ngOnInit() {
      this.groupService.getMembri().subscribe((data:Membro[])=>this.compagni = data);
      this.classmateService.getInUseTools().subscribe((data:Utensile[])=>this.utensiliInUso = data);
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.qrService.scanFile(file).subscribe(data => {
      this.output = data;
    });
  }

}
