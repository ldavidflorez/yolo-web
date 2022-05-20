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

  b64Image: B64Image = {
    base64_image: ''
  };

  constructor(private yoloAPI: YoloApiService) { }

  ngOnInit(): void {
  }

  handleUpload(event: any) {
    this.out = '';
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.url = reader.result;
        this.b64Image.base64_image = this.url;
        this.yoloAPI.makeInference(this.b64Image)
          .subscribe(
            res => {
              this.out = res;
            },
            err => {
              this.out = err;
            }
          )
    };
}

}
