import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Obj } from '../models/Obj'

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  API_URI = 'http://localhost:3000/yolo';

  constructor(private http: HttpClient) { }

  getInferences() {
    return this.http.get(`${this.API_URI}/list`);
  }

  getInference(id: string) {
    return this.http.get(`${this.API_URI}/${id}`);
  }

  deleteInference(id: string) {
    return this.http.delete(`${this.API_URI}/${id}`);
  }

  saveInference(obj: Obj) {
    return this.http.post(`${this.API_URI}/save`, obj);
  }

  updateInference(id: string, updatedInference: Obj) {
    return this.http.put(`${this.API_URI}/${id}`, updatedInference);
  }
  
}
