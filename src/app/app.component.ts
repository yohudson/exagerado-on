import { Component } from '@angular/core';
import { Global } from './global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exagerado-on';

  constructor(
    public global: Global,
    private router: Router,

  ) { }

  ngOnInit() {
    var log = localStorage.getItem('login')
    if (!log){
      this.global.nav = false;
      this.router.navigate(['/login']);
    }
    else{
      this.global.nav = true;
      this.router.navigate(['/']);
    }
  }
}
