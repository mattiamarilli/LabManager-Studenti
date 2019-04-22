import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { QrService} from '../services/qr.service'

@Injectable({
  providedIn: 'root'
})
export class QrGuard implements CanActivate {

  constructor(
    private router: Router,
    private qrservice: QrService
    
) { }
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const currentGroup = this.qrservice.currentGroupValue();

  if (currentGroup) {
      // logged in so return true
      return true;
  }
  // not logged in so redirect to login page with the return url
  this.router.navigate(['/scan'], { queryParams: { returnUrl: state.url } });
  return false;
}
}
