import { Component, OnInit } from '@angular/core';
import { Global } from '../../global';
import { Router } from "@angular/router";

import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    public global: Global,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    var log = JSON.parse(localStorage.getItem('login') || '{}')
    if(!log){
      this.router.navigate(['/login']);
      this.global.nav = false;
    }
    else{
      this.global.nav = true;
      this.global.usuario = log
    }
  }

}
