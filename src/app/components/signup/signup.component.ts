import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule, HttpHandler } from '@angular/common/http';
class User{
  constructor(
    public firstName: string,
    public lastName: string,
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
  newUser = new User("", "", "", "")
  addUser(){

  }
}
