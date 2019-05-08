import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {AuthUser} from '../model';
import {Auth} from '../model_body'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<AuthUser>;
    public currentUser: Observable<AuthUser>;


  user: AuthUser;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<AuthUser>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    currentUserValue(): AuthUser {
        return this.currentUserSubject.value;
    }

    login(auth:Auth): Observable<number> {
        let headers = new HttpHeaders({
        });
        // @ts-ignore
      return this.http.post<AuthUser>(environment.apiUrl + "/user/auth", JSON.stringify(auth), { headers: headers}).pipe(
            map((user: AuthUser) => {
             if (user.id) {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                if(user.id_gruppo) {
                  return 1;
                } else {
                  return 2;
                }
              }

              else if(user.code === 403)
                  return 3;
              else if(user.code === 401)
                return 4;


            })
        )
    }

    renew(): Observable<AuthUser>{
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));
      const headers = new HttpHeaders({
        'token': this.user.token,
      });
      return this.http.post<AuthUser>(environment.apiUrl + '/user/renew', { headers: headers})
    }

    modifyPassword(id_studente: number, odlpassword:string,newpassword:string){
      let headers = new HttpHeaders({});
      console.log("Old Password : " + odlpassword)
      console.log("New Password : " + newpassword)
      let body = {
        'id': id_studente,
        'oldpassword': odlpassword,
        'newpassword': newpassword,
      };
      return this.http.post(environment.apiUrl +  `/user/password`, JSON.stringify(body) , { headers: headers });
    }
    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
