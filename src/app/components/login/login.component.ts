import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ServerService } from '../../service/server.service';
import { Router } from '@angular/router';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule, HttpHandler } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';

class logUser{
  constructor(
    public email: string,
    public password: string
  ){}
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  logUser = new logUser("","")
  constructor(private ss: ServerService, private router: Router, private auth: AuthService) {}

  loginUser() {
    this.ss.login(this.logUser.email, this.logUser.password).subscribe(() => {
      this.router.navigate(['/main']); // Перенаправление после успешного входа
    });
    console.log('dsdsd')
  }
}
