import { Component } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule, HttpHandler } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from '../main-page/main-page.component';
import { Router } from '@angular/router';

interface Answer {
  text: string;
}

interface Question {
  text: string;
  answers: Answer[];
}

@Component({
  selector: 'app-create-poll',
  standalone: true,
  imports: [FormsModule,
    NgFor,
    RouterModule, MainPageComponent
  ],
  templateUrl: './create-poll.component.html',
  styleUrl: './create-poll.component.scss'
})
export class CreatePollComponent {
  
  questions: Question[] = [];

  addQuestion(): void {
    this.questions.push({ text: '', answers: [] });
  }

  removeQuestion(index: number): void {
    this.questions.splice(index, 1);
  }

  addAnswer(questionIndex: number): void {
    this.questions[questionIndex].answers.push({ text: '' });
  }
  
  removeAnswer(questionIndex: number, answerIndex: number): void {
    this.questions[questionIndex].answers.splice(answerIndex, 1);
  }
  constructor(private main: MainPageComponent, private router: Router){}
  out(): void{
    this.main.out();
  }

  create(){
    this.router.navigate(['/mypolls'])
  }
}
