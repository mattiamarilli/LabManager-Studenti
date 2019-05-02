import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {Auth} from '../model_body'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private authService: AuthenticationService) { }
  auth:Auth = new Auth();
  login(){
    state: RouterStateSnapshot;
  
    this.authService.login(this.auth).subscribe((data: number ) => {
      if(data === 1)
          this.router.navigate(['/dashboard']);
        if(data === 2)
          this.router.navigate(['/scan']);
      else if(data === 3)
        alert("Classe non abilitata");
      else if(data === 4)
        alert('Credenziali non corrette');

      
		}
    );;
  }

  ngOnInit() {
  }

}
