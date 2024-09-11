import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { Component } from '@angular/core';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CreatePollComponent } from './components/create-poll/create-poll.component';
import { HttpClient } from '@angular/common/http';
import { MypollsComponent } from './components/mypolls/mypolls.component';
import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from './service/auth.guard';
import { OpenPollComponent } from './components/open-poll/open-poll.component';
import { AllpollsComponent } from './components/allpolls/allpolls.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
    { path:"", component: LoginComponent },
    { path:"signup", component: SignupComponent},
    { path:"main", component: MainPageComponent, canActivate:[AuthGuard]},
    { path:"newpoll", component: CreatePollComponent, canActivate:[AuthGuard]},
    { path:"polls/mypolls", component: MypollsComponent, canActivate:[AuthGuard]},
    { path:"polls/allpolls", component: AllpollsComponent, canActivate:[AuthGuard]},
    { path:"poll/:id", component: OpenPollComponent, canActivate:[AuthGuard]},
    { path:"about", component: AboutComponent, canActivate:[AuthGuard]},
    { path:"admin", component: AdminComponent, canActivate:[AuthGuard]},
    { path:"**", redirectTo: "" }
];
