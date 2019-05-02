import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {AuthUser, Membro} from '../model';
import {Utensile} from '../model'
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClassmatesService {

  constructor(private http: HttpClient) { }
  apiURL:string = 'labmanagerapi.ddns.net';
  user:AuthUser = JSON.parse(sessionStorage.getItem('currentUser'));
  getCompagni(): Observable<Membro[]>{
    console.log(this.user)
    let headers = new HttpHeaders({
      'token': this.user.token,
    });
    return this.http.get<Membro[]>(environment.apiUrl + '/user/compagno',{ headers: headers});
  }

  useTool(id_attrezzo:number){
    let headers = new HttpHeaders({
      'token': this.user.token,
    });
    return this.http.post(environment.apiUrl + `/user/utensile`, JSON.stringify({id_attrezzo}), { headers: headers })
  }

  useToolByCategory(id_categoria:number){
    let headers = new HttpHeaders({
      'token': this.user.token,
    });
    return this.http.post(environment.apiUrl + `/user/categoria`, JSON.stringify({id_categoria}), { headers: headers })
  }

  getInUseTools(): Observable<Utensile[]>{
    let headers = new HttpHeaders({
      'token': this.user.token,
    });
    return this.http.get<Utensile[]>(environment.apiUrl + '/user/utensile', { headers: headers });
  }

  releaseTool(id_utensile:number){
    let headers = new HttpHeaders({
      'token': this.user.token,
    });
    console.log('ciao2')
    return this.http.post(environment.apiUrl + `/user/utensile/release`, JSON.stringify({id_utensile}) ,{ headers: headers })
  }
}
