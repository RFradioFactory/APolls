import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { Component } from '@angular/core';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CreatePollComponent } from './components/create-poll/create-poll.component';
import { HttpClient } from '@angular/common/http';
import { MypollsComponent } from './components/mypolls/mypolls.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path:"", component: LoginComponent },
    { path:"signup", component: SignupComponent},
    { path:"main", component: MainPageComponent},
    { path:"newpoll", component: CreatePollComponent},
    { path:"mypolls", component: MypollsComponent},
    { path:"about", component: AboutComponent},
    { path:"**", redirectTo: "" }
];
