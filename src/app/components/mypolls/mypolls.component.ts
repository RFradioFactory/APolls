import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServerService } from '../../service/server.service';
import { response } from 'express';
import { UtilityService } from '../../service/utility.service';



interface Survey{
  id: number;
  title: string;
  author: string;
  /*!!!!!!!!!!*/
}


@Component({
  selector: 'app-mypolls',
  standalone: true,
  imports: [CommonModule,
    RouterModule
  ],
  templateUrl: './mypolls.component.html',
  styleUrl: './mypolls.component.scss'
})


export class MypollsComponent implements OnInit {
  /*surveys:Survey[] = [
    {id:1, title: 'hbh', author:'bvbv'},
    {id:2, title: 'hbh', author:'bvbv'},
    
    {id:4, title: 'h55555555555555555bh', author:'bvb55555555555v'},
    {id:4, title: 'hbh', author:'bvbv'},
    {id:4, title: 'hbh', author:'bvbv'},
    {id:4, title: 'hbh', author:'bvbv'},
    {id:4, title: 'hbh', author:'bvbv'}
  ]*/
  fakePosts: any = [];
  fakePhotos: any = [];
  fakeapi: any = [];
  constructor(private ss: ServerService, private utility: UtilityService){}
  out(): void{
    this.ss.logout();
  }
  ngOnInit(): void {
    
    this.ss.getFakePhotos().subscribe(
      (response:any)=> {
        this.fakePhotos = response;
      }
    );
    this.ss.getFakePosts().subscribe(
      (response: any) => {
        this.fakePosts = response;
      }
    );
    this.ss.getqa().subscribe(
      (response: any) => {
        console.log('548417485');
        console.log(response);
        console.log('gdgdfgdgd');
      }
    );
   
  }
}
