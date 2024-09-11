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
let myId: string | null;
let myEnter: Enterprises[];

export interface Survey{
  id: number;
  title: string;
  enterprise: string;
  questions: [];

  /*!!!!!!!!!!*/
}

export interface Enterprises{
  id: string;
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
  surveys:Survey[] = []
  isUserAdmin: boolean = false; 
  
  constructor(private ss: ServerService, private utility: UtilityService, private auth: AuthService){}
  out(): void{
    this.ss.logout();
  }

  // getName(id: number): any {
  //   this.ss.getEntToId(id);
  //   console.log(this.ss.getEntToId(id).name());
  // }


  ngOnInit(): void {
    this.ss.refreshToken().subscribe();
    this.ss.isUserAdmin().subscribe((response: any)=>this.isUserAdmin = response);

    this.ss.getUniversal('enterprises/').subscribe(
      (response: Enterprises[]) => {
        myEmail = localStorage.getItem('email');
        console.log(myEmail);
        console.log(response);
        myEnter = response.filter(item => item.email == myEmail);
        
        myId = myEnter[0].id;
        
        console.log(myEnter);
      }
    )
    
    
    this.ss.getUniversal('surveys/').subscribe(
      (response: Survey[]) => {
        //console.log(response);
        this.surveys = response.filter(item => item.enterprise == myId);
        //console.log(this.surveys)
      }
    );
    /*this.ss.getUniversal('admin-users/').subscribe(
      (response: any) => {
        console.log(response);
      }
    );*/
  }
}
