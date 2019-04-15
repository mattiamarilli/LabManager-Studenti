import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {Membro} from '../model'
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  apiURL:string;

  getMembri(): Observable<Membro[]>{
    let headers = new HttpHeaders({
    });
    return this.http.get<Membro[]>(this.apiURL + '/user/gruppo');

  }

  setMembro(id_studente:number){
    let headers = new HttpHeaders({
    });
    return this.http.post(this.apiURL + `/user/gruppo`,JSON.stringify(id_studente), { headers: headers })
  }

  exitgroup(){
    let headers = new HttpHeaders({
    });
    return this.http.delete(this.apiURL + `/user/gruppo`, { headers: headers })
  }
}
