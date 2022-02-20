import { Component } from '@angular/core';
import { Global } from './global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exagerado-on';

  constructor(
    public global: Global
  ) { }

  ngOnInit() {
    if (!localStorage.getItem('login')){
      console.log('none')
      this.global.nav = false;
    }
  }
}
