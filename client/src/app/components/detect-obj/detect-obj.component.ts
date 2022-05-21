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

  // JSON body to do POST (make YOLO inference)
  modelInput: ModelInput = {
    base64_image: ''
  };

  // Variable to store API response
  modelOutput: any;

  // Variables to store base64 image input and output
  urlInput: any ;
  urlOutput: any ;

  // Informative message
  message: string = 'Please select an image';

  // Spinner
  spinner: boolean = false;

  constructor(private yoloAPI: YoloApiService) { }

  ngOnInit(): void {
  }

  // Manage upload images
  handleUpload(event: any) {
    // Processing status
    this.message = 'Processing...';
    this.modelOutput = '';
    this.urlOutput = '';
    this.spinner = true;
    // Capture input image
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // When image load
    reader.onload = () => {
        // Obtain input image in base64
        this.urlInput = reader.result;
        this.modelInput.base64_image = this.urlInput;

        // Call YOLO model to make an inference
        this.yoloAPI.makeInference(this.modelInput)
          .subscribe(
            // If there is a valid response (correct inference)
            res => {
              // Draw image and table response
              this.message = '';
              this.modelOutput = res;
              this.urlOutput = this.modelOutput.img;
              this.spinner = false;
            },
            // If there is an error (incorrect inference)
            err => {
              // Notify error
              this.modelOutput = err;
              this.spinner = false;
            }
          )
    };
}

}
