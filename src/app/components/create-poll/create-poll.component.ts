import { Component, OnInit } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule, HttpHandler } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from '../main-page/main-page.component';
import { Router } from '@angular/router';
import { ServerService } from '../../service/server.service';
import { Enterprises, MypollsComponent } from '../mypolls/mypolls.component';
import { tap } from 'rxjs';


export interface Choice {
  choice_text: string;
}

export interface Question {
  question_text: string;
  choices: Choice[];
}

export interface Poll {
  enterprise: string;
  title: string;
  questions: Question[];
}

let myEmail: string | null;
let myEnter: Enterprises[];
let myId: string ;

@Component({
  selector: 'app-create-poll',
  standalone: true,
  imports: [FormsModule,
    NgFor,
    RouterModule, 
    MainPageComponent,
    CommonModule
  ],
  templateUrl: './create-poll.component.html',
  styleUrl: './create-poll.component.scss'
})
export class CreatePollComponent implements OnInit {
  
  isUserAdmin: boolean = false; 
  titleSurvey = '';
  questions: Question[] = [];

  poll: Poll = {
        enterprise: '',
        title: '',
        questions: this.questions
      };
  addQuestion(): void {
    this.poll.questions.push({ question_text: '', choices: [] });
  }

  removeQuestion(index: number): void {
    this.poll.questions.splice(index, 1);
  }

  addAnswer(questionIndex: number): void {
    this.poll.questions[questionIndex].choices.push({ choice_text: '' });
  }
  
  removeAnswer(questionIndex: number, answerIndex: number): void {
    this.poll.questions[questionIndex].choices.splice(answerIndex, 1);
  }
  
  constructor(private ss: ServerService, private router: Router){}
  
  out(): void{
    this.ss.logout();
  }
  
  create(){
  
    this.ss.getUniversal('enterprises').subscribe(
      (response: Enterprises[]) => {
        myEmail = localStorage.getItem('email');
        
        myEnter = response.filter(item => item.email === myEmail);
        myId = myEnter[0].id;

        this.poll.enterprise = myId;
        this.poll.title = this.titleSurvey;
      this.ss.addSurvey2(this.poll).subscribe(() => this.router.navigate(['/polls/mypolls']));
      }
    )
    
    
    
  }
  
  ngOnInit(): void {
    this.ss.refreshToken().subscribe();
    this.ss.isUserAdmin().subscribe((response: any)=>this.isUserAdmin = response);
  }
}
