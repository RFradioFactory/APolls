import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ServerService } from '../../service/server.service';
class User{
  constructor(
    public name: string,
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
  newUser = new User("", "", "")
  constructor(private ss: ServerService){}
  addUser(){
    this.ss.addUser(this.newUser.email, this.newUser.password, true, this.newUser.name).subscribe(
      (response: any) => {
        console.log(response)
      }
    );
  }
}
