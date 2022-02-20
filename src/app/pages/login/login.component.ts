import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Global } from '../../global';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() hideBarEvent = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private global: Global
  ) { }

  ngOnInit(): void {
    this.showNavBar()
  }

  showNavBar = () => {
    this.hideBarEvent.emit(true);
  }

  login = () =>{
    this.router.navigate(['/']);
    localStorage.setItem('login', 'usuario');
    this.global.nav = true;
  }

}
