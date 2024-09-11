import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ServerService } from '../../service/server.service';
import { Router } from '@angular/router';
class User{
  constructor(
    public email: string,
    public password: string
  )
  {}
}
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  newUser = new User("", "")
  constructor(private ss: ServerService, private router: Router){}
  addUser(){
    this.ss.addUser(this.newUser.email, this.newUser.password).subscribe(() => {
      this.router.navigate(['/login']); // Перенаправление после успешного входа
    });
  }
}
