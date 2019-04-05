import { Component, OnInit } from '@angular/core';
import {GroupService} from '../services/group.service'
import {ClassmatesService} from '../services/classmates.service'

import {Membro} from '../model'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private groupService:GroupService) { }

  membriGruppo:Membro[];

  ngOnInit() {

    this.groupService.getMembri().subscribe((data:Membro[]) =>
    {
      this.membriGruppo = data;
    }
    
    )

  }

}
