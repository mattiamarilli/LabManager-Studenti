import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { QrService } from '../services/qr.service';


@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class QrReaderComponent implements OnInit {
 
  output: string;

  constructor(private qrService: QrService) {

  }

  ngOnInit() {
      
  }

  onFileChange(event) {
    const file = event.target.files[0];
    this.qrService.scanFile(file).subscribe(data => this.output = data);
  }


}
