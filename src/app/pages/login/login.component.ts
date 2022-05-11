import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Global } from '../../global';
import { Router } from "@angular/router";
import { ApiService } from '../../service/api.service';
import Swal from 'sweetalert2';

import { AuthService } from "../../shared/services/auth.service";

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
    public global: Global,
    public authService: AuthService
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
        this.global.usuario = result;
        console.log(this.global.usuario)
        if (result.senha === this.login.senha){
          if(this.global.usuario.perfil_id == 2){
            this.router.navigate(['/']);
          }
          if(this.global.usuario.perfil_id == 1){
            this.router.navigate(['/dashboard']);
          }
          localStorage.setItem('login', JSON.stringify(this.global.usuario));
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
