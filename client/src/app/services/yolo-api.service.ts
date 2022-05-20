import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {ModelInput} from '../models/ModelInput'

@Injectable({
  providedIn: 'root'
})
export class YoloApiService {
  
  API_URI = 'http://localhost:5000/yolo';

  constructor(private http: HttpClient) { }

  makeInference(modelInput: ModelInput) {
    return this.http.post(`${this.API_URI}/detect`, modelInput)
  }

}
