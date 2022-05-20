import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {B64Image} from '../models/B64Image'

@Injectable({
  providedIn: 'root'
})
export class YoloApiService {
  
  API_URI = 'http://localhost:5000/yolo';

  constructor(private http: HttpClient) { }

  makeInference(b64Image: B64Image) {
    return this.http.post(`${this.API_URI}/detect`, b64Image)
  }

}
