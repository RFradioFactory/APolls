import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MypollsComponent } from '../mypolls/mypolls.component';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule, MypollsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  
}
