import { Component, OnInit } from '@angular/core';
import { B64Image } from 'src/app/models/B64Image';

import { YoloApiService } from 'src/app/services/yolo-api.service';

@Component({
  selector: 'app-detect-obj',
  templateUrl: './detect-obj.component.html',
  styleUrls: ['./detect-obj.component.css']
})
export class DetectObjComponent implements OnInit {

  url: any;
  out: any;
  spinner: boolean = false;
  message: string = 'Please select an image';
  result: string = '';

  b64Image: B64Image = {
    base64_image: ''
  };

  constructor(private yoloAPI: YoloApiService) { }

  ngOnInit(): void {
  }

  handleUpload(event: any) {
    this.out = '';
    this.spinner = true;
    this.result = '';
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.url = reader.result;
        this.b64Image.base64_image = this.url;
        this.message = 'Processing...'
        this.yoloAPI.makeInference(this.b64Image)
          .subscribe(
            res => {
              this.out = res;
              this.spinner = false;
              this.message = '';
              this.result = this.out.img;
            },
            err => {
              this.out = err;
              this.spinner = false;
            }
          )
    };
}

}
