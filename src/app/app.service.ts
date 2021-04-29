import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getTimings() {
    return this.http.get('http://localhost:3001/app/surveyForm/getTimings');
  }

  publishData(data: any) {
    return this.http.post('http://localhost:3001/app/surveyForm/post', data);
  }
}
