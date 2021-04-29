import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getTimings() {
    return this.http.get(
      'https://api.loopedincode.com/app/surveyForm/getTimings'
    );
  }

  publishData(data: any) {
    return this.http.post(
      'https://api.loopedincode.com/app/surveyForm/post',
      data
    );
  }
}
