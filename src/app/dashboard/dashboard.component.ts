import { Component, OnInit } from '@angular/core';
import {GroupService} from '../services/group.service'
import {ClassmatesService} from '../services/classmates.service'

import {Membro,Utensile} from '../model'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private groupService:GroupService,private classmatesService:ClassmatesService) { }

  membriGruppo:Membro[];
  inUseTools:Utensile[]

  ngOnInit() {

    //this.groupService.getMembri().subscribe((data:Membro[]) =>this.membriGruppo = data)
    //this.classmatesService.getInUseTools().subscribe((data:Utensile[])=>this.inUseTools = data)     
  }

}
