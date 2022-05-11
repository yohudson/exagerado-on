import { Component, OnInit } from '@angular/core';
import { Global } from '../../global';
import { Router } from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  constructor(
    private router: Router,
    public global: Global
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

  logout = () =>{
    localStorage.removeItem('login');
    this.global.nav = false;
    this.router.navigate(['/login']);
  }

  openMenu = () => {
    this.global.displayMenu = true;
  }

}
