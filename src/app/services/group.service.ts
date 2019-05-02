import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {AuthUser, Membro} from '../model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  apiURL:string;
  user: AuthUser = JSON.parse(sessionStorage.getItem('currentUser'));

  getMembri(): Observable<Membro[]>{
    let headers = new HttpHeaders({
      'token': this.user.token,
    });
    return this.http.get<Membro[]>(environment.apiUrl + '/user/gruppo',{headers});

  }

  setMembro(id_membro: number){

    let headers = new HttpHeaders({
      'token': this.user.token,
    });
    return this.http.post(environment.apiUrl + `/user/gruppo`, JSON.stringify({id_studente : id_membro}), { headers: headers })
  }

  exitgroup(){
    let headers = new HttpHeaders({
    });
    return this.http.delete(environment.apiUrl + `/user/gruppo`, { headers: headers })
  }
}
