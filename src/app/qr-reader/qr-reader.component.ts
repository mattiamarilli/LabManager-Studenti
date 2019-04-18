import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { QrService } from '../services/qr.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { StringifyOptions } from 'querystring';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class QrReaderComponent implements OnInit {
  
  output: string;
  picFile:string;
  constructor(private router: Router,private qrService: QrService) {

  }

  ngOnInit() {
      
  }

  onFileChange(event) {

    this.qrService.scanFile(this.picFile).subscribe(data => {
      this.output = data
       if(data != null)
          this.router.navigate(['/dashboard']);
    });
  }


}
