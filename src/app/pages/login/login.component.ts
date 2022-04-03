import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Global } from '../../global';
import { Router } from "@angular/router";
import { ApiService } from '../../service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: any = {};

  @Output() hideBarEvent = new EventEmitter<boolean>();

  constructor(
    private service: ApiService,
    private router: Router,
    public global: Global
  ) { }

  ngOnInit(): void {
    this.showNavBar()
  }

  showNavBar = () => {
    this.hideBarEvent.emit(true);
  }

  realizarLogin = () =>{
    Swal.showLoading()
    this.service.Post(`login`,this.login).subscribe(
      result => {
        Swal.close();
        if (result.senha === this.login.senha){
          this.router.navigate(['/']);
          localStorage.setItem('login', 'usuario');
          this.global.nav = true;
        }
        else{
          Swal.fire('Erro', 'Não foi possível realizar o login', 'error');
        }
      },
      error => {
        Swal.close();
        if (error.mensagem) Swal.fire('Erro', error.mensagem, 'error');
        if (error) Swal.fire('Erro', 'Não foi possível realizar o login', 'error');
      }
    )
  }

}
