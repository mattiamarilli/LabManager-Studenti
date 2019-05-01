import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {Membro} from '../model'
import {Utensile} from '../model'
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClassmatesService {

  constructor(private http: HttpClient) { }
  apiURL:string = 'labmanagerapi.ddns.net';

  getCompagni(): Observable<Membro[]>{
    let headers = new HttpHeaders({
    });
    return this.http.get<Membro[]>(environment.apiUrl + '/user/compagno');
  }

  useTool(id_attrezzo:number){
    let headers = new HttpHeaders({
    });
    return this.http.post(environment.apiUrl + `/user/utensile`, JSON.stringify(id_attrezzo), { headers: headers })
  }

  useToolByCategory(id_categoria:number){
    let headers = new HttpHeaders({
    });
    return this.http.post(environment.apiUrl + `/user/categoria`, JSON.stringify(id_categoria), { headers: headers })
  }

  getInUseTools(): Observable<Utensile[]>{
    let headers = new HttpHeaders({
    });
    return this.http.get<Utensile[]>(environment.apiUrl + '/user/utensile');
  }

  releaseTool(){
    let headers = new HttpHeaders({
    });
    return this.http.delete(environment.apiUrl + `/user/utensile`, { headers: headers })
  }
}
