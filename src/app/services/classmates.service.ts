import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {Membro} from '../model'
import {Utensile} from '../model'
@Injectable({
  providedIn: 'root'
})
export class ClassmatesService {

  constructor(private http: HttpClient) { }
  apiURL:string;

  getCompagni(): Observable<Membro[]>{
    let headers = new HttpHeaders({
    });
    return this.http.get<Membro[]>(this.apiURL + '/user/compagno');
  }

  useTool(id_attrezzo:number){
    let headers = new HttpHeaders({
    });
    return this.http.post(this.apiURL + `/user/utensile`, JSON.stringify(id_attrezzo), { headers: headers })
  }

  useToolByCategory(id_categoria:number){
    let headers = new HttpHeaders({
    });
    return this.http.post(this.apiURL + `/user/categoria`, JSON.stringify(id_categoria), { headers: headers })
  }

  getInUseTools(): Observable<Utensile[]>{
    let headers = new HttpHeaders({
    });
    return this.http.get<Utensile[]>(this.apiURL + '/user/utensile');
  }

  releaseTool(){
    let headers = new HttpHeaders({
    });
    return this.http.delete(this.apiURL + `/user/utensile`, { headers: headers })
  }
}
