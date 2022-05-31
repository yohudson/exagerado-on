import { Component, OnInit } from '@angular/core';
import { Global } from '../../global';
import { Router } from "@angular/router";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(
    public global: Global,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  closeMenu = () => {
    this.global.displayMenu = false;
  }

  logout = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('user');
    this.global.nav = false;
    this.global.displayMenu = false;
    this.router.navigate(['/login']);
  }

  navigate = () => {
    this.global.displayMenu = false;    
  }

}
