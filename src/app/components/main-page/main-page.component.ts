import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ServerService } from '../../service/server.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';




@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit{
  constructor(private auth: AuthService, private ss: ServerService){}
  out(): void{
    this.ss.logout();
  }
  isUserEnt: boolean = true;
  isUserAdmin: boolean = false;
  token: string | null = null;
  decodedToken: any = null;
  isExpired: boolean = false;

  ngOnInit(): void {
    this.ss.refreshToken().subscribe();
    // this.ss.getUniversal(`user-management/`).subscribe((response: any)=>console.log(response));
    // this.ss.getUniversal('users/').subscribe((response: any)=>console.log(response));

    this.ss.isUserEnterprice().subscribe((response: any)=>this.isUserEnt = response);
    this.ss.isUserAdmin().subscribe((response: any)=>this.isUserAdmin = response);
  
    this.token = this.ss.getAuthToken();

    if (this.token) {
      this.decodedToken = this.ss.decodeToken(this.token);
      this.isExpired = this.ss.isTokenExpired(this.token);
      console.log('Decoded Token:', this.decodedToken);
      console.log('Is Token Expired:', this.isExpired);
    } else {
      console.log('No token found');
    }
    
    
     
  }
}
