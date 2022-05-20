// Detect objects component
import { Component, OnInit } from '@angular/core';
import { ModelInput } from 'src/app/models/ModelInput';

import { YoloApiService } from 'src/app/services/yolo-api.service';

@Component({
  selector: 'app-detect-obj',
  templateUrl: './detect-obj.component.html',
  styleUrls: ['./detect-obj.component.css']
})
export class DetectObjComponent implements OnInit {

  // Variables to store base64 image input and output
  url_input: any ;
  url_output: any ;

  // Informative message
  message: string = 'Please select an image';

  // Spinner
  spinner: boolean = false;

  // Variable to store API response
  response: any;

  // JSON body to do POST (make YOLO inference)
  modelInput: ModelInput = {
    base64_image: ''
  };

  constructor(private yoloAPI: YoloApiService) { }

  ngOnInit(): void {
  }

  // Manage upload images
  handleUpload(event: any) {
    // Processing status
    this.message = 'Processing...';
    this.response = '';
    this.url_output = '';
    this.spinner = true;
    // Capture input image
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // When image load
    reader.onload = () => {
        // Obtain input image in base64
        this.url_input = reader.result;
        this.modelInput.base64_image = this.url_input;

        // Call YOLO model to make an inference
        this.yoloAPI.makeInference(this.modelInput)
          .subscribe(
            // If there is a valid response (correct inference)
            res => {
              // Draw image and table response
              this.message = '';
              this.response = res;
              this.url_output = this.response.img;
              this.spinner = false;
            },
            // If there is an error (incorrect inference)
            err => {
              // Notify error
              this.response = err;
              this.spinner = false;
            }
          )
    };
}

}
