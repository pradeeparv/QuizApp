import { Component,  ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(private router:Router){}

  @ViewChild('name')namekey!:ElementRef;

 
 startquiz(){
  localStorage.setItem('name', this.namekey.nativeElement.value);
    console.log('Username stored in local storage');
  

  
 }
}
