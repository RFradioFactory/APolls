import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../service/server.service';
import { CommonEngine } from '@angular/ssr';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MypollsComponent, Survey, Enterprises  } from '../mypolls/mypolls.component'; 



@Component({
  selector: 'app-allpolls',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './allpolls.component.html',
  styleUrl: './allpolls.component.scss'
})
export class AllpollsComponent implements OnInit {
  surveys:Survey[] = [];
  isUserEnt: boolean = true;
  isUserAdmin: boolean = false; 
  constructor(private ss: ServerService){}
  out(): void{
    this.ss.logout();
  }

  ngOnInit(): void {
    this.ss.refreshToken().subscribe();
    this.ss.isUserEnterprice().subscribe((response: any)=>this.isUserEnt = response);
    this.ss.isUserAdmin().subscribe((response: any)=>this.isUserAdmin = response);
    
    this.ss.getUniversal('surveys/').subscribe(
      (response: any) => {
        console.log(response);
        this.surveys = response;
        console.log(this.surveys);
      }
    );
  }
}
