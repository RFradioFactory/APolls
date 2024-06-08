import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HTTP_INTERCEPTORS, HttpHandler } from '@angular/common/http';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CreatePollComponent } from './components/create-poll/create-poll.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SignupComponent,
    LoginComponent,
    MainPageComponent,
    CreatePollComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
