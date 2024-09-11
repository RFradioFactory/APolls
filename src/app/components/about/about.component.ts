import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MypollsComponent } from '../mypolls/mypolls.component';
import { ServerService } from '../../service/server.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule, MypollsComponent, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  constructor(private ss: ServerService){}
  isUserEnt: boolean = true;
  isUserAdmin: boolean = false; 
  out(): void{
    this.ss.logout();
  }
  ngOnInit(): void {
    this.ss.refreshToken().subscribe();
    this.ss.isUserEnterprice().subscribe((response: any)=>this.isUserEnt = response);
    this.ss.isUserAdmin().subscribe((response: any)=>this.isUserAdmin = response);
  }
}
