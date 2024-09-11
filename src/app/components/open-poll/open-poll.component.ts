import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerService } from '../../service/server.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
//let userId = '';

@Component({
  selector: 'app-open-poll',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './open-poll.component.html',
  styleUrl: './open-poll.component.scss'
})


export class OpenPollComponent {
  constructor(private ss: ServerService, private route: ActivatedRoute){}
  out(): void{
    this.ss.logout();
  }
  isUserEnt: boolean = true;
  isUserAdmin: boolean = false; 
  surId: string | null = null;
  poll: any;

  selectedChoices: { [questionId: string]: string } = {};
  selectChoice(questionId: string, choiceId: string) {
    this.selectedChoices[questionId] = choiceId;
  }
  
  submitPoll() {
    // Отправляем ответы на сервер
    let userId: string = '';
    this.ss.refreshToken().subscribe((response: any) =>userId = response.user_id);
    for (const questionId in this.selectedChoices) {
      if (this.selectedChoices.hasOwnProperty(questionId)) {
        const choiceId = this.selectedChoices[questionId];
        let answerId='';
        this.ss.addAnswers(userId, questionId).subscribe((response: any) => { //!!!!!!!!!
          answerId = response.id; 
          console.log(response);
          this.ss.addSelChoices(answerId, choiceId).subscribe((response: any)  => console.log(response));
        })
      }
    }
  }

  ngOnInit(): void {
    this.ss.refreshToken().subscribe();
    this.ss.isUserEnterprice().subscribe((response: any)=>this.isUserEnt = response);
    this.ss.isUserAdmin().subscribe((response: any)=>this.isUserAdmin = response);

    this.route.paramMap.subscribe(params => {
      this.surId = params.get('id');
      if (this.surId) {
        this.ss.getUniversal(`surveys/`).subscribe(
          (response: any) => this.poll = response.filter((item: any) => item.id == this.surId)[0]);
      }
    });

    
    
  }
} 
  