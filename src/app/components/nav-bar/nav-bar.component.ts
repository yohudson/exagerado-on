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
