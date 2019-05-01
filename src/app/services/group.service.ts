import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {Membro} from '../model'
import { environment } from '../../environments/environment';
import { JoinGroup } from '../model_body';
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  apiURL:string;

  getMembri(id_gruppo:string): Observable<Membro[]>{
    let headers = new HttpHeaders({
    });
    return this.http.get<Membro[]>(environment.apiUrl + '/user/gruppo?id_gruppo=' + id_gruppo);

  }

  setMembro(joinGroup:JoinGroup){
    let headers = new HttpHeaders({
    });
    return this.http.post(environment.apiUrl + `/user/gruppo`,JSON.stringify(joinGroup), { headers: headers })
  }

  exitgroup(){
    let headers = new HttpHeaders({
    });
    return this.http.delete(environment.apiUrl + `/user/gruppo`, { headers: headers })
  }
}
