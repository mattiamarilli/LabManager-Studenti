import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {Membro} from '../model'
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  apiURL:string;

  getMembri(): Observable<Membro[]>{
    let headers = new HttpHeaders({
    });
    return this.http.get<Membro[]>(environment.apiUrl + '/user/gruppo');

  }

  setMembro(id_studente:number){
    let headers = new HttpHeaders({
    });
    return this.http.post(environment.apiUrl + `/user/gruppo`,JSON.stringify(id_studente), { headers: headers })
  }

  exitgroup(){
    let headers = new HttpHeaders({
    });
    return this.http.delete(environment.apiUrl + `/user/gruppo`, { headers: headers })
  }
}
