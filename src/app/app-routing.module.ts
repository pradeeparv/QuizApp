import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { QuestionpageComponent } from './questionpage/questionpage.component';

const routes: Routes = [{path:'',redirectTo:"home",pathMatch:"full"},{path:"home", component:HomepageComponent},{path:"question",component:QuestionpageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
