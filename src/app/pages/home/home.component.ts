import { Component, OnInit } from '@angular/core';
import { Global } from '../../global';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public router: Router,
    public global: Global
  ) { }

  ngOnInit(): void {
    if(!localStorage.getItem('login')){
      this.router.navigate(['/login']);
      this.global.nav = false;
    }
    else{
      this.global.nav = true;
    }

    var login = localStorage.getItem('login');
    console.log(login)
    console.log(this.global.nav)
  }

}
