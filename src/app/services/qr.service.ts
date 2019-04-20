import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
declare const qrcode: any;

@Injectable({
  providedIn: 'root'
})
export class QrService {

    scannedForGroup:boolean = false;
    private currentGroupSubject: BehaviorSubject<string>;
    public currentGroup: Observable<string>;

    constructor() {
        this.currentGroupSubject = new BehaviorSubject<string>(JSON.parse('{}'));
        this.currentGroup = this.currentGroupSubject.asObservable();
    }

    

    currentGroupValue(): string {
        
        return localStorage.getItem('currentGroup');
    }


    scanFile(file: any): Observable<string> {
        
        return new Observable(observer => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e: any) => {
            const data = e.target.result;
            qrcode.callback = (res) => {
                observer.next(res);
                observer.complete();
            };
            if(this.scannedForGroup == false)
                {
                    localStorage.setItem('currentGroup', JSON.stringify(qrcode.decode(data)));
                    this.currentGroupSubject.next(qrcode.decode(data));
                    console.log(localStorage.getItem('currentGroup'))
                    this.scannedForGroup = true;
                }
            qrcode.decode(data);
            };
        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentGroup');
        this.currentGroupSubject.next(null);
        this.scannedForGroup = false;
    }
}
