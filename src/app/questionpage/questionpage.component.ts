import { Component, OnInit } from '@angular/core';
import { QuestionserviceService } from '../questionservice.service';
import { interval } from 'rxjs';


@Component({
  selector: 'app-questionpage',
  templateUrl: './questionpage.component.html',
  styleUrl: './questionpage.component.css'
})
export class QuestionpageComponent {

  constructor(private questionservice: QuestionserviceService) { }

  name: string = " ";
  questionlist: any = [];
  currentlist: number = 0;
  points: number = 0;
  counter = 60;
  progress:String=" ";
  isquizcompleted:boolean=false;
  ngOnInit() {
    console.log("name will be inserted")
    this.name = localStorage.getItem('name')!;
    console.log(this.name)

    this.getallquestions();
    this.startcounter();
  }
//questions are printed in console
  getallquestions() {
    this.questionservice.getquestions().subscribe((data) => {

      console.log(data)
      this.questionlist = data.questions;
    })
  }

  previousquestion() {
    this.currentlist--;
  }

  nextquestion() {
   
    if(this.currentlist<9){
      this.currentlist++;
    }
    
  }

  //answer correct the point is increased otherwise not
  correctanswer: number = 0;
  incorrectanswer: number = 0;

  answer(currentqno: number, option: any) 
  {
    if(currentqno===this.questionlist.length){
      
      this.isquizcompleted=true;
      this.currentlist==9;
      this.stopcounter();
    }

    if (option.correct) {

      this.points += 10;
      this.correctanswer++;
      
      setTimeout(()=>{
        this.currentlist++;
        this.resetcounter();
        this.gotoprogressbar();
      }, 1000);
    } 
    else {

      setTimeout(() => {
        this.currentlist++;
        this.incorrectanswer++;
        this.resetcounter();
        this.gotoprogressbar();
          this.points -= 10;
      }, 1000);
     
               
      }

    }
  

  intervals:any;
startcounter(){
   this.intervals=interval(1000).subscribe((data)=>{
    this.counter--;
    if(this.counter==0){
      this.currentlist++;
      this.points-=10;
      this.counter=60;
    }
   })

   setTimeout(() => {
      this.intervals.unsubscribe()
   }, 60000);
}


stopcounter(){
  this.intervals.unsubscribe();
  this.counter=0;
}


resetcounter(){
  this.stopcounter();
  this.counter=60;
  this.startcounter();
}

resetquestion(){
 
  this.resetcounter();
  this.getallquestions();
  this.currentlist=0;
  this.points=0;
  this.progress="0";  
}

gotoprogressbar(){
  this.progress=((this.currentlist/this.questionlist.length)*100).toString();
  return this.progress;
}
}
