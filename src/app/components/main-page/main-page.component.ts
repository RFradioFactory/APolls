import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ServerService } from '../../service/server.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  constructor(private auth: AuthService){}
  out(): void{
    this.auth.logout();
  }
}
