import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
