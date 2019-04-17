import { Component, OnInit } from '@angular/core';
import {ClassmatesService} from '../services/classmates.service';
import {Membro,Utensile} from '../model'
import {GroupService} from '../services/group.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private classmateService:ClassmatesService,private groupService:GroupService) { }

  compagni:Membro[];
  utensiliInUso:Utensile[];
  
  ngOnInit() {
      this.groupService.getMembri().subscribe((data:Membro[])=>this.compagni = data);
      this.classmateService.getInUseTools().subscribe((data:Utensile[])=>this.utensiliInUso = data);
  }

}
