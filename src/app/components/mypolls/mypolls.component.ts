import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServerService } from '../../service/server.service';
import { tap, pipe } from 'rxjs';
import { UtilityService } from '../../service/utility.service';
import { AuthService } from '../../service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

let myEmail: string | null;
let myId: number | null;
let myEnter: Enterprises[];

interface Survey{
  id: number;
  title: string;
  enterprise: number;
  /*!!!!!!!!!!*/
}

interface Enterprises{
  id: number;
  name: string;
  email: string;
  /*!!!!!!!!!!*/
}

@Component({
  selector: 'app-mypolls',
  standalone: true,
  imports: [CommonModule,
    RouterModule
  ],
  templateUrl: './mypolls.component.html',
  styleUrl: './mypolls.component.scss'
})


export class MypollsComponent implements OnInit {
  surveys:Survey[] = [
    /*{id:1, title: 'тест', author:'Невструев РО'},
    {id:2, title: 'другой тест', author:'Невструев РО'},
    
    {id:4, title: '???', author:'Невструев РО'},*/
  ]
  
  
  constructor(private ss: ServerService, private utility: UtilityService, private auth: AuthService){}
  out(): void{
    this.auth.logout();
  }
  ngOnInit(): void {
    this.ss.login('1@yandex.ru','1234').subscribe(
      (response: any) => {
        console.log(response)
      }
    )
    this.ss.getUniversal('enterprises').subscribe(
      (response: Enterprises[]) => {
        myEmail = localStorage.getItem('email');
        console.log(myEmail);
        myEnter = response.filter(item => item.email === myEmail);
        
        myId = myEnter[0].id;
        console.log(myEmail ,myEnter, myId);
      }
    )
    
    this.ss.getUniversal('surveys').subscribe(
      (response: Survey[]) => {
        //console.log(response);
        this.surveys = response.filter(item => item.enterprise === myId);
        console.log(this.surveys)
      }
    );

  }
  
}
