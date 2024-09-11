import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServerService } from '../../service/server.service';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';

class User{
  constructor(
    public name: string,
    public email: string,
    public password: string
  )
  {}
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})



export class AdminComponent implements OnInit{
  newUser = new User("", "", "");
  constructor(private auth: AuthService, private ss: ServerService, private router: Router){}
  out(): void{
    this.ss.logout();
  }
  isUserEnt: boolean = true;
  isUserAdmin: boolean = false; 
  
  

  

  addEntUser(){
    let idNewEnt:number = 0;
    this.ss.addEnt(this.newUser.name, this.newUser.email).subscribe((response: any) => {
      idNewEnt = response.id;
      this.ss.addEntUser(this.newUser.email, this.newUser.password, true, idNewEnt).subscribe();
    
    console.log(this.newUser.name, this.newUser.email, this.newUser.password, idNewEnt);
    });
  }

  ngOnInit(): void {
    this.ss.refreshToken().subscribe();
    this.ss.isUserEnterprice().subscribe((response: any)=>this.isUserEnt = response);
    this.ss.isUserAdmin().subscribe((response: any)=>this.isUserAdmin = response);
    
  }
}

