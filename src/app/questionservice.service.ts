import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionserviceService {

  constructor(private httpclient:HttpClient) { }

  getquestions(){
    return this.httpclient.get<any>("assets/questions.json");
  }
}
